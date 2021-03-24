const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const moment = require('moment');
const mongoose = require('mongoose');

// const casesRouter = require('./routes/cases-router');
// const authRouter = require('./routes/auth-router');
// const userRouter = require('./routes/user-router');

const app = express();
require('dotenv').config();

app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: true,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

const mongoURI = process.env.MONGODBURI;

const db = mongoose.connection;

mongoose.connect(mongoURI, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, ()=>{
    console.log("database connection checked");
});

db.on('error', (err)=> { console.log('ERROR: ', err)});
db.on('connected', ()=> { console.log("mongo connected")});
db.on('disconnected', ()=> { console.log("mongo disconnected")});


app.set('views', 'views');
app.set('view engine', 'ejs');
app.use(express.static('public'));

moment().format('L');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.render('index', {
    appName: 'cases',
  });
});

// app.use('/cases', casesRouter);
// app.use('/auth', authRouter);
// app.use('/user', userRouter);


app.use('*', (req, res) => {
  res.status(404).send({
    error: 'Not Found',
  });
});

app.use((err, req, res, next) => {
  res.status(500).send({ err, message: err.message });
});
