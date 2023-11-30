const passport = require('passport');
const express = require("express");
const bcrypt = require("bcryptjs");



const { CONNECTION_STRING } = require('../constants/dbSettings');
const { default: mongoose } = require('mongoose');
const { Customer } = require("../models");
const {
  validateSchema,
  loginSchema
} = require('../validation/customer');
const encodeToken = require('../helpers/jwtHelper');

mongoose.set('strictQuery', false);
mongoose.connect(CONNECTION_STRING);

const router = express.Router();

router.post(
  "/login",
  validateSchema(loginSchema),
  // passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const { email } = req.body;

      const customer = await Customer.findOne({ email });

      if (!customer) return res.status(404).send({ message: "Not found" });

      const { _id, email: cusEmail, firstName, lastName } = customer;

      const token = encodeToken(_id, cusEmail, firstName, lastName);

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

router.get('/count', async (req, res, next) => {
  try {
    const customerCount = await Customer.countDocuments();
    res.status(200).json({ count: customerCount });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
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

    const newItem = new Customer(data);
    newItem
      .save()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send({ message: err.message });
      });
  } catch (err) {
    res.sendStatus(500);
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

// POST để khóa tài khoản khách hàng
router.post('/:id/lock', async (req, res) => {
  try {
    const { id } = req.params;

    // Tìm khách hàng theo ID
    const customer = await Customer.findById(id);

    if (!customer) {
      return res.status(404).json({ message: 'Không tìm thấy khách hàng' });
    }

    // Đặt trạng thái isLocked của khách hàng thành true
    customer.isLocked = true;

    // Lưu thay đổi
    await customer.save();

    res.status(200).json({ message: 'Tài khoản đã bị khóa thành công' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Đã xảy ra lỗi khi khóa tài khoản' });
  }
});

// POST để mở khóa tài khoản khách hàng
router.post('/:id/unlock', async (req, res) => {
  try {
    const { id } = req.params;

    // Tìm khách hàng theo ID
    const customer = await Customer.findById(id);

    if (!customer) {
      return res.status(404).json({ message: 'Không tìm thấy khách hàng' });
    }

    // Đặt trạng thái isLocked của khách hàng thành false
    customer.isLocked = false;

    // Lưu thay đổi
    await customer.save();

    res.status(200).json({ message: 'Tài khoản đã được mở khóa thành công' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Đã xảy ra lỗi khi mở khóa tài khoản' });
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
