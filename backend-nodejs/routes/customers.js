const passport = require('passport');
const express = require("express");

const router = express.Router();
const { Customer } = require("../models");
const { CONNECTION_STRING } = require('../constants/dbSettings');
const { default: mongoose } = require('mongoose');

const {
  validateSchema,
  loginSchema
} = require('../validation/customer');
const encodeToken = require('../helpers/jwtHelper');

mongoose.set('strictQuery', false);
mongoose.connect(CONNECTION_STRING);

router.post(
  "/login",
  validateSchema(loginSchema),
  /* passport.authenticate("local", { session: false }) */
  async (req, res, next) => {
    try {
      const { email /* , password */ } = req.body;

      const customer = await Customer.findOne({ email /* , password */ });

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
  async (req, res, next) => {
    try {
      const customer = await Customer.findById(req.user._id);

      if (!customer) return res.status(404).send({ message: 'Not found' });

      res.status(200).json(customer);
    } catch (err) {
      res.sendStatus(500);
    }
  },
);

router.route('/profile').get(passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.user._id);

    if (!customer) return res.status(404).send({ message: 'Not found' });

    res.status(200).json(customer);
  } catch (err) {
    res.sendStatus(500);
  }
},);

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
router.get('/:id', async function (req, res, next) {
  // Validate
  const validationSchema = yup.object().shape({
    params: yup.object({
      id: yup.string().test('Validate ObjectID', '${path} is not valid ObjectID', (value) => {
        return ObjectId.isValid(value);
      }),
    }),
  });

  validationSchema
    .validate({ params: req.params }, { abortEarly: false })
    .then(async () => {
      const id = req.params.id;

      let found = await Customer.findById(id);

      if (found) {
        return res.send({ ok: true, result: found });
      }

      return res.send({ ok: false, message: 'Object not found' });
    })
    .catch((err) => {
      return res.status(400).json({ type: err.name, errors: err.errors, message: err.message, provider: 'yup' });
    });
});

//POST
router.post('/', async (req, res, next) => {
  try {
    const data = req.body;
    const email = data.email;
    const emailUnique = await Customer.findOne({ email });
    if (emailUnique) {
      return res.status(404).send({ message: 'Email already exists' });
    }
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

//PATCH
router.patch('/:id', function (req, res, next) {
  try {
    const { id } = req.params;
    console.log('««««« req.body »»»»»', req.body);
    const data = req.body;

    Employee.findByIdAndUpdate(id, data, {
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
