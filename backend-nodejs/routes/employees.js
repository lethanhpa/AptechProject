// const yup = require('yup');
// const express = require("express");
// const router = express.Router();
// const { Employee } = require('../models');
// const ObjectId = require('mongodb').ObjectId;
// // const { write } = require('../helpers/FileHelper');
// // let data = require('../data/employees.json');

// const fileName = './data/employees.json';
// router.get('/', function (req, res, next) {
//   try {
//     Employee.find()
//       .then((result) => {
//         res.send(result);
//       })
//       .catch((err) => {
//         res.status(400).send({ message: err.message });
//       });
//   } catch (err) {
//     res.sendStatus(500);
//   }
// });

// router.get('/:id', async function (req, res, next) {
//   // Validate
//   const validationSchema = yup.object().shape({
//     params: yup.object({
//       id: yup.string().test('Validate ObjectID', '${path} is not valid ObjectID', (value) => {
//         return ObjectId.isValid(value);
//       }),
//     }),
//   });

//   validationSchema
//     .validate({ params: req.params }, { abortEarly: false })
//     .then(async () => {
//       const id = req.params.id;

//       let found = await Employee.findById(id);

//       if (found) {
//         return res.send({ ok: true, result: found });
//       }

//       return res.send({ ok: false, message: 'Object not found' });
//     })
//     .catch((err) => {
//       return res.status(400).json({ type: err.name, errors: err.errors, message: err.message, provider: 'yup' });
//     });
// });

// // Create new data
// router.post('/', function (req, res, next) {
//   // Validate
//   const validationSchema = yup.object({
//     body: yup.object({
//       firstName: yup.string().max(50).required(),
//       lastName: yup.string().max(50).required(),
//       phoneNumber: yup.string().max(50).required(),
//       email: yup.string().max(50).required(),
//       address: yup.string().max(500).required(),
//       birthday: yup.date().required(),
//     }),
//   });

//   validationSchema
//     .validate({ body: req.body }, { abortEarly: false })
//     .then(async () => {
//       const data = req.body;
//       let newItem = new Employee(data);
//       await newItem.save();
//       res.send({ ok: true, message: 'Created', result: newItem });
//     })
//     .catch((err) => {
//       return res.status(400).json({ type: err.name, errors: err.errors, message: err.message, provider: 'yup' });
//     });
// });

// // router.post("/", function (req, res, next) {
// //   // Validate
// //   const validationSchema = yup.object({
// //     body: yup.object({
// //       FirstName: yup.string().required(),
// //       LastName: yup.string().required(),
// //       PhoneNumber: yup.string().max(50).required(),
// //       address: yup.string().max(500),
// //       email: yup.string().max(100),
// //       Birthday: yup.string(),

// //     }),
// //   });

// //   validationSchema
// //     .validate({ body: req.body }, { abortEarly: false })
// //     .then(() => {
// //       const newItem = req.body;

// //       // Get max id
// //       let max = 0;
// //       data.forEach((item) => {
// //         if (max < item.id) {
// //           max = item.id;
// //         }
// //       });

// //       newItem.id = max + 1;

// //       data.push(newItem);

// //       // Write data to file
// //       write(fileName, data);

// //       res.send({ ok: true, message: "Created" });
// //     })
// //     .catch((err) => {
// //       return res
// //         .status(400)
// //         .json({ type: err.name, errors: err.errors, provider: "yup" });
// //     });
// // });
// router.delete('/:id', function (req, res, next) {
//   const validationSchema = yup.object().shape({
//     params: yup.object({
//       id: yup.string().test('Validate ObjectID', '${path} is not valid ObjectID', (value) => {
//         return ObjectId.isValid(value);
//       }),
//     }),
//   });

//   validationSchema
//     .validate({ params: req.params }, { abortEarly: false })
//     .then(async () => {
//       try {
//         const id = req.params.id;

//         let found = await Employee.findByIdAndDelete(id);

//         if (found) {
//           return res.send({ ok: true, result: found });
//         }

//         return res.status(410).send({ ok: false, message: 'Object not found' });
//       } catch (err) {
//         return res.status(500).json({ error: err });
//       }
//     })
//     .catch((err) => {
//       return res.status(400).json({ type: err.name, errors: err.errors, message: err.message, provider: 'yup' });
//     });
// });
// router.patch("/:id", function (req, res, next) {
//   const id = req.params.id;
//   const patchData = req.body;

//   let found = data.find((x) => x.id == id);

//   if (found) {
//     for (let propertyName in patchData) {
//       found[propertyName] = patchData[propertyName];
//     }
//   }

//   // write(fileName, data);

//   res.send({ ok: true, message: "Updated" });
// });

// module.exports = router;

const passport = require('passport');
const express = require('express');

const { CONNECTION_STRING } = require('../constants/dbSettings');
const { default: mongoose } = require('mongoose');
const { Employee } = require('../models');
const {
  validateSchema,
  loginSchema,
  categorySchema,
} = require('../validation/employee');
const encodeToken = require('../helpers/jwtHelper');

// MONGOOSE
mongoose.set('strictQuery', false);
mongoose.connect(CONNECTION_STRING);

const router = express.Router();

router.post(
  '/login',
  validateSchema(loginSchema),
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const employee = await Employee.findOne({ email });

      if (!employee) return res.status(404).send({ message: 'Not found' });

      const { _id, email: empEmail, firstName, lastName } = employee;

      const token = encodeToken(_id, empEmail, firstName, lastName);

      res.status(200).json({
        token,
        payload: employee,
      });
    } catch (err) {
      res.status(401).json({
        statusCode: 401,
        message: 'Unauthorized',
      });
    }
  },
);

router.get(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const employee = await Employee.findById(req.user._id);

      if (!employee) return res.status(404).send({ message: 'Not found' });

      res.status(200).json(employee);
    } catch (err) {
      res.sendStatus(500);
    }
  },
);

router.route('/profile').get(passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.user._id);

    if (!employee) return res.status(404).send({ message: 'Not found' });

    res.status(200).json(employee);
  } catch (err) {
    res.sendStatus(500);
  }
},);

// GET

router.get('/', function (req, res, next) {
  try {
    Employee.find()
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

// GET:/id
router.get('/:id', function (req, res, next) {
  try {
    const { id } = req.params;
    Employee.findById(id)
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

// POST
router.post('/', function (req, res, next) {
  try {
    const data = req.body;

    const newItem = new Employee(data);
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

// PATCH/:id
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

// DELETE
router.delete('/:id', function (req, res, next) {
  try {
    const { id } = req.params;
    Employee.findByIdAndDelete(id)
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

module.exports = router;
