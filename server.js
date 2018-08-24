// eslint-disable-line
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') }); // load environment config
// eslint-disable-next-line
const PORT = process.env.PORT || 8080; // set port
const express = require('express');
// const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const passport = require('passport');
// require controllers
const skin = require('./controllers/skin');

const app = express();
// middleware used in all routes
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application.json' }));
app.use(cookieParser());
app.use(logger('tiny'));

// static files directories
app.use(express.static(path.join(__dirname,`client/build`)));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});


// passport strategies
const localLoginStrategy = require('./passport/local-login');

passport.use('local-login', localLoginStrategy);
app.use(passport.initialize());

// ROUTES
app.use('/signup', require('./controllers/user/signup'));
app.use('/login', require('./controllers/user/login'));
app.use('/user', require('./controllers/user/info'));

// skins
app.use('/skin', skin);
// static files route

app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`app listening on port ${PORT}!\n`);
});
