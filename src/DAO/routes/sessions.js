  import { Router } from "express";
  import { authMiddleware , auth} from "../midleware/midleware.js";
  import { UserManagerBD } from "../UserManagerBD.js";
  import { createHash , isValidPassword} from "../../utils.js";

  const sessionRouter = Router();
  const userManager1= new UserManagerBD()


  sessionRouter.get('/register', (req, res) => {
    res.render('register', {})
  })

  sessionRouter.post('/register', async (req, res) => {
    let user = req.body;
    let userFound = await  userManager1.getByEmail(user.email)
    if(userFound){
        return res.render('register-error', {})
    }
    user.password = createHash(user.password);
    let result = await userManager1.createUser(user)
    console.log(result)
    res.render('login', {})
  })

  sessionRouter.get('/login', (req, res) => {
    res.render('login', {})
  })

  sessionRouter.post('/login', async (req, res) => {
    let user = req.body;
    let result = await userManager1.getByEmail(user.email);
    if (!result) {
      return res.render('login-error', {});
    }
    let passwordMatch = isValidPassword(result, user.password);
  if (!passwordMatch) {
    return res.render('login-error', {});
  }
    
    let role = "usuario";
    if (user.email === "adminCoder@coder.com" && user.password === "adminCod3r123") {
      role = "admin";
      
    }
    
    req.session.user = {
      email: user.email,
      role: role
    };
    
    res.render('bienvenida-datos', { user: req.session.user });
  });

  sessionRouter.get('/profile', authMiddleware, async (req, res) => {
    let user = await userManager1.getByEmail(req.session.user.email);
    res.render('bienvenida-datos', { user })
  })
  sessionRouter.get('/logout', (req, res) => {
    req.session.destroy(error => {
        res.render('login')
    })
  })

  sessionRouter.get('/restore-password', (req, res) => {
    res.render('restore-password', {});
  });

  sessionRouter.post('/restore-password', async (req, res) => {
    let user = req.body;
    let userFound = await  userManager1.getByEmail(user.email)
    if(!userFound){
        return res.render('register', {})
    }
    let newPassword= createHash(user.password);
    await userManager1.updatePassword(user.email, newPassword)
    res.render('login', {})
  })


  export default sessionRouter;
