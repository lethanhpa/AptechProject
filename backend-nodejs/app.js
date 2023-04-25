const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
require('dotenv').config();

// MONGOOSE
const { default: mongoose } = require('mongoose');
const { CONNECTION_STRING } = require('./constants/dbSettings');

const { passportConfigEmployee, passportConfigCustomer, passportConfigLocal } = require('./middlewares/passport');

// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const categoriesRouter = require('./routes/categories');
const customersRouter = require('./routes/customers');
const employeesRouter = require('./routes/employees');
const suppliersRouter = require('./routes/suppliers');
const ordersRouter = require('./routes/orders');
const questionsRouter = require('./routes/questions');

const uploadRouter = require('./routes/upload');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Add CORS here
app.use(
  cors({
    origin: '*',
  }),
);

// MONGOOSE
mongoose.set('strictQuery', false);
mongoose.connect(CONNECTION_STRING,
  { useNewUrlParser: true, useUnifiedTopology: true },
);
mongoose.connection.on('error', (err) => {
  if (err) {
    console.error(err);

    mongoose.connect(CONNECTION_STRING,
      { useNewUrlParser: true, useUnifiedTopology: true },
    );
  }
});

passport.use(passportConfigEmployee);
passport.use(passportConfigCustomer);
passport.use(passportConfigLocal);

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/customers', customersRouter);
app.use('/employees', employeesRouter);
app.use('/suppliers', suppliersRouter);
app.use('/orders', ordersRouter);
app.use('/questions', questionsRouter);

app.use('/upload', uploadRouter);

app.get('/chat', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
