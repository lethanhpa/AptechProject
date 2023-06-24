const passport = require('passport');
const express = require("express");
const yup = require('yup');

const router = express.Router();
const { Customer } = require("../models");
const { CONNECTION_STRING } = require('../constants/dbSettings');
const { default: mongoose } = require('mongoose');

const {
  validateSchema,
  loginSchema,
  getCustomersSchema
} = require('../validation/customer');
const encodeToken = require('../helpers/jwtHelper');

mongoose.set('strictQuery', false);
mongoose.connect(CONNECTION_STRING);

router.post(
  "/login",
  validateSchema(loginSchema),
  async (req, res, next) => {
    try {
      const { email } = req.body;

      const customer = await Customer.findOne({ email });

      if (!customer) return res.status(404).send({ message: "Not found" });

      const { _id, email: empEmail, firstName, lastName } = customer;

      const token = encodeToken(_id, empEmail, firstName, lastName);

      res.status(200).json({
        token,
        payload: customer,
      });
    } catch (err) {
      res.status(401).json({
        statusCode: 401,
        message: "Unauthorized",
      });
    }
  }
);

router.get(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const customer = await Customer.findById(req.user._id);

      if (!customer) return res.status(404).send({ message: 'Not found' });

      res.status(200).json(customer);
    } catch (err) {
      res.sendStatus(500);
    }
  },
);

//GET all
router.get('/', function (req, res, next) {
  try {
    Customer.find()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } catch (err) {
    res.sendStatus(500);
  }
});


//GET id
router.get('/:id', function (req, res) {
  try {
    const { id } = req.params;
    Customer.findById(id)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } catch (err) {
    res.sendStatus(500);
  }
});

//POST
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const email = data.email;

    const existingCustomer = await Customer.findOne({ email });
    const emailExists = await Customer.exists({ email });
    if (emailExists) {
      return res.status(400).send({ message: 'Email đã tồn tại trong cơ sở dữ liệu.' });
    }

    const newCustomer = new Customer(data);
    await newCustomer.save();

    res.status(200).send({ message: 'Đăng ký thành công' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Đã xảy ra lỗi.' });
  }
});


//DELETE
router.delete('/:id', function (req, res, next) {
  try {
    const { id } = req.params;
    Customer.findByIdAndDelete(id)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } catch (err) {
    res.sendStatus(500);
  }
});

//PATCH
router.patch('/:id', function (req, res, next) {
  try {
    const { id } = req.params;
    const data = req.body;

    Customer.findByIdAndUpdate(id, data, {
      new: true,
    })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
