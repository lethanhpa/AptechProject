const yup = require("yup");
const express = require("express");
const router = express.Router();
const passport = require('passport');
const { Supplier } = require("../models");

const { CONNECTION_STRING } = require('../constants/dbSettings');
const { default: mongoose } = require('mongoose');

mongoose.set('strictQuery', false);
mongoose.connect(CONNECTION_STRING);

router.get(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const supplier = await Supplier.findById(req.user._id);

      if (!supplier) return res.status(404).send({ message: 'Not found' });

      res.status(200).json(supplier);
    } catch (err) {
      res.sendStatus(500);
    }
  },
);

router.route('/profile').get(passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  try {
    const supplier = await Supplier.findById(req.user._id);

    if (!supplier) return res.status(404).send({ message: 'Not found' });

    res.status(200).json(supplier);
  } catch (err) {
    res.sendStatus(500);
  }
},);

const fileName = "./data/suppliers.json";
router.get('/', function (req, res, next) {
  try {
    Supplier.find()
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

      let found = await Supplier.findById(id);

      if (found) {
        return res.send({ ok: true, result: found });
      }

      return res.send({ ok: false, message: 'Object not found' });
    })
    .catch((err) => {
      return res.status(400).json({ type: err.name, errors: err.errors, message: err.message, provider: 'yup' });
    });
});
router.post('/', async function (req, res, next) {
  // Validate
  const validationSchema = yup.object({
    body: yup.object({
      name: yup.string().max(50).required(),
      email: yup.string().email().max(50).required(),
      phoneNumber: yup.string().max(50).required(),
      address: yup.string().max(500).required(),
    }),
  });

  validationSchema
    .validate({ body: req.body }, { abortEarly: false })
    .then(async () => {
      try {
        const data = req.body;
        const newItem = new Supplier(data);
        let result = await newItem.save();

        return res.send({ ok: true, message: 'Created', result });
      } catch (err) {
        return res.status(500).json({ error: err });
      }
    })
    .catch((err) => {
      return res.status(400).json({ type: err.name, errors: err.errors, provider: 'yup' });
    });
});

router.delete('/:id', function (req, res, next) {
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
      try {
        const id = req.params.id;

        let found = await Supplier.findByIdAndDelete(id);

        if (found) {
          return res.send({ ok: true, result: found });
        }

        return res.status(410).send({ ok: false, message: 'Object not found' });
      } catch (err) {
        return res.status(500).json({ error: err });
      }
    })
    .catch((err) => {
      return res.status(400).json({ type: err.name, errors: err.errors, message: err.message, provider: 'yup' });
    });
});

router.patch("/:id", function (req, res, next) {
  const id = req.params.id;
  const patchData = req.body;
  let found = data.find((x) => x.id == id);
  if (found) {
    for (let propertyName in patchData) {
      found[propertyName] = patchData[propertyName];
    }
  }
  write(fileName, data);
  res.send({ ok: true, massage: "Update" });
});

module.exports = router;
