const yup = require("yup");
const express = require("express");
const router = express.Router();
const { Order, Product } = require("../models");

const ObjectId = require("mongodb").ObjectId;

const { CONNECTION_STRING } = require('../constants/dbSettings');
const { default: mongoose } = require('mongoose');

mongoose.set('strictQuery', false);
mongoose.connect(CONNECTION_STRING);

// Methods: POST / PATCH / GET / DELETE / PUT


router.get('/count', async (req, res, next) => {
  try {
    const orderCount = await Order.countDocuments();
    res.status(200).json({ count: orderCount });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Get all
router.get('/', async (req, res, next) => {
  try {
    let results = await Order.find().populate('customer').populate('employee').lean({ virtuals: true });

    res.json(results);
  } catch (error) {
    res.status(500).json({ ok: false, error });
  }
});


router.get("/:id", async function (req, res, next) {
  try {
    // Validate
    const validationSchema = yup.object().shape({
      params: yup.object({
        id: yup
          .string()
          .test("Validate ObjectID", "${path} is not valid ObjectID", (value) => {
            return ObjectId.isValid(value);
          }),
      }),
    });

    await validationSchema.validate({ params: req.params }, { abortEarly: false });

    const { id } = req.params;

    const orders = await Order.find({ customerId: id })
      .populate("orderDetails.product")
      .populate("customer")
      .lean({ virtual: true });

    if (orders.length > 0) {
      return res.send({ ok: true, results: orders });
    }

    return res.send({ ok: false, message: "No orders found for the customer" });
  } catch (error) {
    return res.status(400).json({
      type: error.name,
      errors: error.errors,
      message: error.message,
      provider: "yup",
    });
  }
});


router.post("/", async function (req, res, next) {
  try {
    const data = req.body;

    const newItem = new Order(data);
    const savedItem = await newItem.save();

    await updateProductStock(savedItem);

    res.send(savedItem);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

async function updateProductStock(order) {
  for (const orderDetail of order.orderDetails) {
    const productId = orderDetail.productId;
    const quantity = orderDetail.quantity;

    await Product.updateOne({ _id: productId }, { $inc: { stock: -quantity } });
  }
}


router.delete("/:id", function (req, res, next) {
  const validationSchema = yup.object().shape({
    params: yup.object({
      id: yup
        .string()
        .test("Validate ObjectID", "${path} is not valid ObjectID", (value) => {
          return ObjectId.isValid(value);
        }),
    }),
  });

  validationSchema
    .validate({ params: req.params }, { abortEarly: false })
    .then(async () => {
      try {
        const id = req.params.id;

        let found = await Order.findByIdAndDelete(id);

        if (found) {
          return res.send({ ok: true, result: found });
        }

        return res.status(410).send({ ok: false, message: "Object not found" });
      } catch (err) {
        return res.status(500).json({ error: err });
      }
    })
    .catch((err) => {
      return res.status(400).json({
        type: err.name,
        errors: err.errors,
        message: err.message,
        provider: "yup",
      });
    });
});


router.patch("/:id", async function (req, res, next) {
  try {
    const id = req.params.id;
    const data = req.body;
    await Order.findByIdAndUpdate(id, data);

    res.send({ ok: true, message: "Updated" });
  } catch (error) {
    res.status(500).send({ ok: false, error });
  }
});

module.exports = router;
