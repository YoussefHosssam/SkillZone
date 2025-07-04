const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const User = require(`${__dirname}/../models/user/userModel.js`);
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/api/v1/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = new User({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails?.[0]?.value || "",
          });
        }
        await user.save({ validateBeforeSave: false });

        return done(null, user); // ✅ Must be called with the user
      } catch (err) {
        console.error("Google Strategy Error:", err);
        return done(err, null); // ❌ If error occurs, redirect to failure
      }
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user.id); // 🔥 use only the ID
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id); // ✅ Fetch from DB
  done(null, user);
});
module.exports = passport;
