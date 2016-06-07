'use strict';
var express = require('express');
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser');
var session = require('express-session');
var fallback = require('express-history-api-fallback');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var fs = require('fs');
var nconf = require('nconf');


var userProfileRoute = require('./routes/user-profile.route')();

nconf.file({ file: 'env-var-config.json' });

console.log(nconf.get('auth_facebook_appid'));
console.log(nconf.get('auth_facebook_appsecret'));
console.log(nconf.get('auth_facebook_callbackurl'));

var app = express();


//find static web files here
var root = __dirname + '/'
app.use(express.static(root));

//app.use(cookieParser());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.set('trust proxy', 1) // trust first proxy 
app.use(session({ secret: 'my_precious' }));
app.use(passport.initialize());
  app.use(passport.session());

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
// app.get('/auth/facebook/callback',
//   passport.authenticate('facebook', { successRedirect: '/success',
//                                       failureRedirect: '/failure' }));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));


app.use(userProfileRoute.rootRoutePath, userProfileRoute);


app.use(fallback('index.html', { root: root }));



passport.use(

  new FacebookStrategy({
    clientID: nconf.get('auth_facebook_appid'),
    clientSecret: nconf.get('auth_facebook_appsecret'),
    callbackURL: nconf.get('auth_facebook_callbackurl'),
    passReqToCallback: true
  },
    
  function(request, accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
      /**
       * Build attributes object containing
       * authentication data that will be stored in database
       */
      
      var attributes = {
        access_token  : accessToken,
        refresh_token : refreshToken
      };
      /**
       * Find or create user with the unique information provided as well
       * as attributes object so it can update or create user with
       * the authentication information we got
       */
      
     done(null, "123345");

    }); // end process.newTick()

  }) // end function(request...) & new google strategy

); // end passport.use()

passport.serializeUser(function(user, done) {
    console.log('serializeUser'); // I expect this to be logged
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    console.log('deserializeUser'); // I expect this to be logged
    done(null, user);
  });

var server = require('http').createServer(app);


module.exports = app;
const API_PORT = process.env.PORT || 3000;
server.listen(API_PORT, function () {
  console.log('API server listening on port ' + API_PORT);
});