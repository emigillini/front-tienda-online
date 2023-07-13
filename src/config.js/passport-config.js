  import passport from "passport";
  import local from "passport-local";
  import { createHash, isValidPassword } from "../utils.js";
  import { UserManagerBD } from "../DAO/UserManagerBD.js";
  import GithubStrategy from 'passport-github2';
  import jwt from "passport-jwt";

  const userman1 = new UserManagerBD();

  const LocalStrategy = local.Strategy;
  const jwtStrategy = jwt.Strategy;
  const ExtractJWT = jwt.ExtractJwt

  const cookieExtractor = req => {
  let token= null
  if(req&&req.cookies){
    token= req.cookies[ 'auth']
  }
  return token
}

  export const initializePassport = () => {
    passport.use(
      "register",
      new LocalStrategy(  
        { passReqToCallback: true, usernameField: "email" },
        async (req, username, password, done) => {
          try {
            const user = req.body;
            let userFound = await userman1.getByEmail( username);
            if (userFound) {
              console.log("Ya existe usuario");
              return done(null, false);
            }
            user.password = createHash(password);
            let result = await userman1.createUser(user);
            console.log(result);
            return done(null, result);
          } catch (error) {
            console.error("Error: " + error);
            return done(error);
          }
        }
      )
    );

    passport.use(
      "login",
      new LocalStrategy({ usernameField: "email" }, async (username, password, done) => {
        try {
          const user = await userman1.getByEmail(username);
          if (!user) {
            console.log("No existe usuario");
            return done(null, false);
          }
          if (!isValidPassword(user, password)) {
            return done(null, false);
          }
          return done(null, user);
        } catch (error) {
          console.error("Error: " + error);
          return done(error);
        }
      })
    );
    passport.use(
      "jwt",
      new jwtStrategy ({jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
      secretOrKey:"paraEntregaTrabajo"
    }, async (jwt_payload , done) => {
        try {
          return done (null, jwt_payload)
          
        } catch (error) {
          console.error("Error: " + error);
          return done(error);
        }
      })
    );

    passport.use('github', new GithubStrategy({
      clientID: "Iv1.6feaa2bc46883067" ,
      clientSecret:"ed9cf008bd382819dc251189d080c9e0444d63d9" ,
      callbackURL: "http://localhost:8080/session/githubcallback",
      scope: ['user:email']
    },async (accesToken, refreshToken, profile, done) => {
        try {
          console.log(profile)
          let userEmail = profile.emails[0].value;
          let user = await userman1.getByEmail(userEmail);
        
          if (!user) {
            let newUser = {
              first_name: profile._json.login,
              last_name: profile._json.public_repos,
              email: userEmail,
              password: "",
              age: 20
          }
          let result = await userman1.createUser(newUser);
          return done(null, result)
          }
        else{  return done(null, user);}
        } catch (error) {
          console.error("Error: " + error);
          return done(error);
        }
      }
    )
  );

    passport.serializeUser((user, done) => {
      done(null, user._id)
  });

  passport.deserializeUser(async (id, done) => {
      let user = await userman1.getById(id);
      done(null, user);
  })
  };
