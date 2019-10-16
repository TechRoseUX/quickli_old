const express = require('express');
const cookieSession = require('cookie-session');
const methodOverride = require('method-override')
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const {ensureAuthenticated} = require('./helpers/auth');
const Nexmo = require('nexmo');
const socketio = require('socket.io');

const app = express();

//DB Config
const db = require('./config/keys');

//Map global promise
mongoose.Promise = global.Promise

//Connect to mongoose
mongoose.connect(db.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log(db.mongoURI))
    .catch(err => console.log(err));

//Load Customer Model
require('./models/Customer');
require('./models/User');
require('./models/Vehicle');
require('./models/Service');
require('./models/ToMessage');

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

require('./routes/authRoutes')(app);
require('./routes/customerInfoRoutes')(app);
require('./routes/serviceRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  //Express will serve up production assets
  //Like our main.js file, or main.css file
  app.use(express.static('client/build'));

  //Express will serve up the index.html file
  //if it doesn't recognize the route

  const path = require('path');
  app.get('/*', (req, res) => {
      const index = path.join(__dirname, 'build', 'index.html');
      res.sendFile(index);
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);