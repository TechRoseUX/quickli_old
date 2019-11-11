const passport = require('passport');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = mongoose.model('users');

module.exports = (app) => {
    //User Register Route
app.post('/register', (req, res) => {
    User.findOne({email: req.body.email})
      .then(user => {
        if(user) {
          req.flash('error_msg', 'This email is already registered.');
          res.redirect('/');
        } else {
          var uniqid = Date.now();
          const newUser = new User ({
              email: req.body.email,
              date: uniqid,
              password: req.body.password,
              userid: uniqid,
              companyName: req.body.companyName,
              image: req.body.companyImage
            });
  
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser.save()
                .then(user => {
                  res.redirect('/register/success');
                })
                .catch(err => {
                  console.log(err);
                  return;
                });
            });
          });
        }
      })
  });
  
  //Logout User
  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/somewhere');
  });
  
  app.get('/current_user', (req, res) => {
    console.log(req.user);
    res.send(req.user);
  });

  //Login from POST
app.post('/login', (req, res, next) => {
      console.log(req.body);
      passport.authenticate('local', {
        successRedirect: '/all-customers',
        failureRedirect: '/error',
        failureFlash: true
      })(req, res, next);
    });
}