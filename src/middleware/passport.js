const passport = require("passport");
const userModel = require("../models/user.model");
const FacebookTokenStrategy = require("passport-facebook-token");
const GooglePlusTokenStrategy = require("passport-google-plus-token");
passport.use(
  new FacebookTokenStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    },
    async (accessToken, refreshToken, profile, done)  => {
      try {
        const user = await userModel.CheckLoginFB(profile.id);
        if (user) return done(null, user);
        const newUser = await userModel.createNew({
          facebook: {
            uid: profile.id,
            token: accessToken,
            email: profile.emails[0].value,
          },
          fullname: profile.displayName,
          avatar: profile.photos[0].value,
        });
        return done(null, newUser);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

passport.use(
  new GooglePlusTokenStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      passReqToCallback: true,
    },
    async  (req, accessToken, refreshToken, profile, done) =>  {
      try {
        const user = await userModel.CheckLoginGoogle(profile.id);
        if (user) return done(null, user);
        const newUser = await userModel.createNew({
          google: {
            uid: profile.id,
            token: accessToken,
            email: profile.emails[0].value,
          },
          fullname: profile.displayName,
          avatar: profile.photos[0].value,
        });
        return done(null, newUser);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);
