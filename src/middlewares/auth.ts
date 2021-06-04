import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { UserModel as User } from "../model/user";
import { login, register } from '../controller/user';

const strategyOptions = {
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true,
};

passport.use("login", new LocalStrategy(strategyOptions, login));

passport.use("register", new LocalStrategy(strategyOptions, register));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
