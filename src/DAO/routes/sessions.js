  import CustomRouter from "./router.js";
  import { authMiddleware, authrole} from "../midleware/midleware.js";
  import { UserManagerBD } from "../UserManagerBD.js";
  import { createHash } from "../../utils.js";
  import passport from "passport";

  
  const userManager1= new UserManagerBD()

  export default class SessionRouter extends CustomRouter{
    init(){

      this.get('/register', (req, res) => {
        res.render('register', {})
      })
      this.post('/register', passport.authenticate("register", {
        failureRedirect: 'register-error'
      }), async (req, res) => {
        
        res.render('login', {});
      });
    
      this.get('/register-error', (req, res) => {
        res.render('register-error', {})
      })
    
      
    
      this.get('/login', (req, res) => {
        res.render('login', {})
      })
    
      this.post('/login', passport.authenticate("login", {
        failureRedirect: 'login-error'
      }), async (req, res) => {
        if(!req.user)return ;
        
        req.session.user = {
          email: req.user.email,
          role:req.user.role
        };
        
        res.render('bienvenida-datos', { user: req.session.user });
      });
    
      this.get("/admin", authMiddleware, authrole, (req, res) => {
        
          res.send("Welcome to the admin page!");
      });
      
      this.get('/login-error', (req, res) => {
        res.render('login-error', {})
      })
    
      this.get('/current', authMiddleware, async (req, res) => {
        let user = req.session.user;
        res.render('bienvenida-datos', { user })
      })
      
     
    
      this.get('/logout', (req, res) => {
        req.session.destroy(error => {
            res.render('login')
        })
      })
    
      this.get('/restore-password', (req, res) => {
        res.render('restore-password', {});
      });
    
      this.post('/restore-password', async (req, res) => {
        let user = req.body;
        let userFound = await  userManager1.getByEmail(user.email)
        if(!userFound){
            return res.render('register', {})
        }
        let newPassword= createHash(user.password);
        await userManager1.updatePassword(user.email, newPassword)
        res.render('login', {})
      });
    
      this.get('/github', passport.authenticate('github', { scope: ['user:email']}), async (req, res) => {});
    
      this.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login'}), async (req, res) => {
        req.session.user = req.user;
        res.redirect('/index');
    });
    
    
    

    }}

