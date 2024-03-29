const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//Load User Model
const User = mongoose.model('users');
const Vehicle = mongoose.model('vehicles');

module.exports = function(passport) {
    passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
        //Match user
        User.findOne({
            email: email
        }).then(user => {
            if(!user) {
                console.log('No user found')
                return done(null, false, {message: 'No user found'});
            }
            //Match password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);
                } else {
                    console.log('Password incorrect');
                    return done(null, false, {message: 'Password incorrect'});
                }
            })
        })
        console.log(email);
        console.log(password);
    }));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });
}