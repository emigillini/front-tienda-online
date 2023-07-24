  import { Router } from "express";
  import { authMiddleware } from "../midleware/midleware.js";
  import { UserManagerBD } from "../UserManagerBD.js";
  import { createHash } from "../../utils.js";

import passport from "passport";

  const sessionRouter = Router();
  const userManager1= new UserManagerBD()


  sessionRouter.get('/register', (req, res) => {
    res.render('register', {})
  })
  sessionRouter.post('/register', passport.authenticate("register", {
    failureRedirect: 'register-error'
  }), async (req, res) => {
    
    res.render('login', {});
  });

  sessionRouter.get('/register-error', (req, res) => {
    res.render('register-error', {})
  })

  

  sessionRouter.get('/login', (req, res) => {
    res.render('login', {})
  })

  sessionRouter.post('/login', passport.authenticate("login", {
    failureRedirect: 'login-error'
  }), async (req, res) => {
    if(!req.user)return ;
    
    req.session.user = {
      email: req.user.email,

    };
    
    res.render('bienvenida-datos', { user: req.session.user });
  });

  sessionRouter.get('/login-error', (req, res) => {
    res.render('login-error', {})
  })

  sessionRouter.get('/current', authMiddleware, async (req, res) => {
    let user = req.session.user;
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
  });

  sessionRouter.get('/github', passport.authenticate('github', { scope: ['user:email']}), async (req, res) => {});

  sessionRouter.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login'}), async (req, res) => {
    req.session.user = req.user;
    res.redirect('/index');
});


  export default sessionRouter;
