const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const methodOverride = require('method-override')
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const {ensureAuthenticated} = require('./helpers/auth');

const app = express();

//Map global promise
mongoose.Promise = global.Promise

//Connect to mongoose
mongoose.connect('mongodb://localhost/quick-dev', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected quickly'))
    .catch(err => console.log(err));

//Load Customer Model
require('./models/Customer');
require('./models/User');
require('./models/Vehicle');
const Customer = mongoose.model('customers');
const User = mongoose.model('users');
const Vehicle = mongoose.model('vehicles');

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: ['dfgrshdfxfdshergfdsvccgdfcxfbv']
  })
);


//Passport Config
require('./config/passport')(passport);

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Method Override Middleware
app.use(methodOverride('_method'))

//Express Session Middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Flash Middleware
app.use(flash());

//Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

//Requests
//app.get
//app.post
//app.delete
//app.put

//How middleware works
app.use((req, res, next) => {
    console.log(Date.now());
    next();
});

app.get('/api/customers', (req, res) => {
  const customers = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
    {id: 2, firstName: 'Brad', lastName: 'Traversy'},
    {id: 3, firstName: 'Mary', lastName: 'Swanson'},
  ];
  res.json(customers);
});

//All Customers Page
app.get('/all-customers', async (req, res) => {
  const rcs = await Customer.find({user: req.user.userid});
  const realCustomers = Array.from(rcs);
  res.json(realCustomers);
});

//Customer Vehicles Page 
app.get('/customer-vehicles', async (req, res) => {
  console.log(req.body);
  const vs = await Vehicle.find({});
  console.log(`yooooo ${vs}`);
  const customerVehicles = Array.from(vs);
  res.json(customerVehicles);
});

app.post('/customers', (req, res) => {
  console.log(req.body);
});

app.post('/new-customer', (req, res) => {
  console.log(req.body);
  var uniqid = Date.now();
  var user = req.user.userid

  Customer.findOne({email: req.body.email})
    .then(customer => {
      if(customer) {
        req.flash('error_msg', 'This email is already registered.');
        res.redirect('/');
      } else {
        var uniqid = Date.now();
        const newCustomer = new Customer ({
            customerid: uniqid,
            user: user,
            name: req.body.cname,
            email: req.body.email,
            phoneNumber1: req.body.pnumber,
            phoneNumber2: req.body.pnumber2,
          });
        newCustomer.save();
      }
    })
});

app.post('/new-vehicle', (req, res) => {
  var uniqid = Date.now();

  const newVehicle = new Vehicle ({
      vehicleid: uniqid,
      ownerid: req.body.props.selectedCustomer.customerid,
      phoneNumber1: req.body.values.pnumber,
      phoneNumber2: req.body.values.pnumber2,
      vehicleYear: req.body.values.vyear,
      vehicleMake: req.body.values.vmake,
      vehicleModel: req.body.values.vmodel,
      vehicleLicenseNumber: req.body.values.lpnumber,
      vehicleVinNumber: req.body.values.vnumber,
      vehicleMileage: req.body.values.mileage,
      vehicleTagNumber: req.body.values.tnumber
  });
  newVehicle.save();
});

//Login from POST
app.post('/login', (req, res, next) => {
    console.log(req.body);
    passport.authenticate('local', {
      successRedirect: '/home',
      failureRedirect: '/error',
      failureFlash: true
    })(req, res, next);
  });

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
            password: req.body.password,
            userid: uniqid
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
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => `Server running on port ${PORT}`);