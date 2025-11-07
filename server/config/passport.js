const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');

// Serialize user for the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    console.error('❌ Deserialization error:', error);
    done(error, null);
  }
});

// Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user already exists
      let user = await User.findOne({ 
        provider: 'google', 
        providerId: profile.id 
      });

      if (user) {
        return done(null, user);
      }

      // Create new user
      user = await User.create({
        provider: 'google',
        providerId: profile.id,
        displayName: profile.displayName,
        email: profile.emails?.[0]?.value,
        profilePhoto: profile.photos?.[0]?.value
      });

      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }
));

// Facebook OAuth Strategy
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'displayName', 'email', 'photos']
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ 
        provider: 'facebook', 
        providerId: profile.id 
      });

      if (user) {
        return done(null, user);
      }

      user = await User.create({
        provider: 'facebook',
        providerId: profile.id,
        displayName: profile.displayName,
        email: profile.emails?.[0]?.value,
        profilePhoto: profile.photos?.[0]?.value
      });

      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }
));

// GitHub OAuth Strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
    scope: ['user:email']
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ 
        provider: 'github', 
        providerId: profile.id 
      });

      if (user) {
        return done(null, user);
      }

      user = await User.create({
        provider: 'github',
        providerId: profile.id,
        displayName: profile.displayName || profile.username,
        email: profile.emails?.[0]?.value,
        profilePhoto: profile.photos?.[0]?.value
      });

      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }
));

module.exports = passport;
