const yup = require('yup');
const express = require('express');
const router = express.Router();
const { Product } = require('../models');
const passport = require('passport');
const ObjectId = require('mongodb').ObjectId;

const { CONNECTION_STRING } = require('../constants/dbSettings');
const { default: mongoose } = require('mongoose');

mongoose.set('strictQuery', false);
mongoose.connect(CONNECTION_STRING);


router.get(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const product = await Product.findById(req.user._id);

      if (!product) return res.status(404).send({ message: 'Not found' });

      res.status(200).json(product);
    } catch (err) {
      res.sendStatus(500);
    }
  },
);

router.route('/profile').get(passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  try {
    const product = await Product.findById(req.user._id);

    if (!product) return res.status(404).send({ message: 'Not found' });

    res.status(200).json(product);
  } catch (err) {
    res.sendStatus(500);
  }
},);

router.get('/', async (req, res, next) => {
  try {
    let results = await Product.find().populate('category').populate('supplier').lean({ virtuals: true });

    res.json(results);
  } catch (error) {
    res.status(500).json({ ok: false, error });
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

      let found = await Product.findById(id);

      if (found) {
        return res.send({ ok: true, result: found });
      }

      return res.send({ ok: false, message: 'Object not found' });
    })
    .catch((err) => {
      return res.status(400).json({ type: err.name, errors: err.errors, message: err.message, provider: 'yup' });
    });
});

router.post('/', function (req, res, next) {
  // Validate
  const validationSchema = yup.object({
    body: yup.object({
      name: yup.string().required(),
      price: yup.number().positive().required(),
      stock: yup.number().positive().required(),
      discount: yup.number().positive().max(50).required(),
      description: yup.string().required(),
      categoryId: yup
        .string()
        .required()
        .test('Validate ObjectID', '${path} is not valid ObjectID', (value) => {
          return ObjectId.isValid(value);
        }),
      supplierId: yup
        .string()
        .required()
        .test('Validate ObjectID', '${path} is not valid ObjectID', (value) => {
          return ObjectId.isValid(value);
        }),
    }),
  });

  validationSchema
    .validate({ body: req.body }, { abortEarly: false })
    .then(async () => {
      const data = req.body;
      let newItem = new Product(data);
      await newItem.save();
      res.send({ ok: true, message: 'Created', result: newItem });
    })
    .catch((err) => {
      return res.status(400).json({ type: err.name, errors: err.errors, message: err.message, provider: 'yup' });
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

        let found = await Product.findByIdAndDelete(id);

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

router.patch('/:id', function (req, res, next) {
  const id = req.params.id;
  const patchData = req.body;

  let found = data.find((x) => x.id == id);

  if (found) {
    for (let propertyName in patchData) {
      found[propertyName] = patchData[propertyName];
    }
  }

  // Write data to file
  write(fileName, data);

  res.send({ ok: true, message: 'Updated' });
});

// ------------------------------------------------------------------------------------------------
// Search
router.get('/search', function (req, res, next) {
  res.send('This is search router of products');
});

// ------------------------------------------------------------------------------------------------
// details
router.get('/details', function (req, res, next) {
  res.send('This is details router of products');
});

module.exports = router;
