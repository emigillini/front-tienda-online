import passport from "passport";
import local from "passport-local";
import { createHash, isValidPassword } from "../utils.js";
import { UserManagerBD } from "../DAO/UserManagerBD.js";

const userman1 = new UserManagerBD();

const LocalStrategy = local.Strategy;
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

  passport.serializeUser((user, done) => {
    done(null, user._id)
});

passport.deserializeUser(async (id, done) => {
    let user = await userman1.getById(id);
    done(null, user);
})
};
