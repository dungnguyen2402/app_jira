const GoogleStrategy = require("passport-google-oauth20").Strategy;

const passport = require("passport");

const GOOGLE_CLIENT_ID =
    "951929963974-jds00vs25c40viubpm9nnfbllugn936e.apps.googleusercontent.com",
  GOOGLE_CLIENT_SECRET = "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";

// module.exports = function (passport) {
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["email", "profile"],
    },

    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      const newUser = {
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
      };

      try {
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          console.log(user);
          done(null, profile);
        } else {
          user = await User.create(newUser);
          console.log("user new", user);
          done(null, profile);
        }
        done(null, profile);
      } catch (err) {
        console.log("err", err.message);
      }
    }
  )
);
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// // used to deserialize the user
// passport.deserializeUser((id, done) => {
//   User.findById(id, (err, user) => done(err, user));
// });
// // }
