const yup = require("yup");
const express = require("express");
const router = express.Router();
const {
  validateSchema,
  getProductsSchema
} = require("../validation/product");
const { Product } = require("../models/index");
const ObjectId = require("mongodb").ObjectId;
const { CONNECTION_STRING } = require("../constants/dbSettings");
const { default: mongoose } = require("mongoose");

mongoose.set("strictQuery", false);
mongoose.connect(CONNECTION_STRING);

router.get('/', validateSchema(getProductsSchema), async (req, res) => {
  try {
    const {
      category,
      supplier,
      skip,
      limit,
      productName,
      stockStart,
      stockEnd,
      priceStart,
      priceEnd,
      discountStart,
      discountEnd,
    } = req.query;
    const conditionFind = {};

    if (category) conditionFind.categoryId = category;
    if (supplier) conditionFind.supplierId = supplier;

    if (productName) {
      conditionFind.name = new RegExp(`${productName}`)
    }

    if (stockStart && stockEnd) {
      conditionFind.stock = { $gte: Number(stockStart), $lte: Number(stockEnd) };
    } else if (stockStart) {
      conditionFind.stock = { $gte: Number(stockStart) };
    } else if (stockEnd) {
      conditionFind.stock = { $lte: Number(stockEnd) };
    }

    if (priceStart && priceEnd) {
      conditionFind.price = { $gte: Number(priceStart), $lte: Number(priceEnd) };
    } else if (priceStart) {
      conditionFind.price = { $gte: Number(priceStart) };
    } else if (priceEnd) {
      conditionFind.price = { $lte: Number(priceEnd) };
    }

    if (discountStart && discountEnd) {
      conditionFind.discount = { $gte: Number(discountStart), $lte: Number(discountEnd) };
    } else if (discountStart) {
      conditionFind.discount = { $gte: Number(discountStart) };
    } else if (discountEnd) {
      conditionFind.discount = { $lte: Number(discountEnd) };
    }

    let results = await Product
      .find(conditionFind)
      .populate('category')
      .populate('supplier')
      .skip(skip)
      .limit(limit)
      .lean({ virtuals: true });
    const countAllProduct = await Product.count();
    res.json({ total: countAllProduct, data: results });
  } catch (error) {
    console.log('««««« error »»»»»', error);
    res.status(500).json({ ok: false, error });
  }
});

router.get("/", async (_req, res) => {
  try {
    let results = await Product.find()
      .populate("category")
      .populate("supplier")
      .lean({ virtual: true });
    res.json(results);
  } catch (error) {
    res.status(500).json({ ok: false, error });
  }
});

router.get('/:id', async function (req, res) {
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

      let found = await Product
        .findById(id)
        .populate('category')
        .populate('supplier');
      console.log('««««« found »»»»»', found);
      if (found) {
        return res.send({ ok: true, result: found });
      }

      return res.send({ ok: false, message: 'Object not found' });
    })
    .catch((err) => {
      return res.status(400).json({ type: err.name, errors: err.errors, message: err.message, provider: 'yup' });
    });
});

router.get('/t/:slug', async function (req, res) {
  // Validate
  const validationSchema = yup.object().shape({
    params: yup.object({
      slug: yup.string().required('Slug is required'),
    }),
  });

  try {
    await validationSchema.validate({ params: req.params }, { abortEarly: false });

    const slug = req.params.slug;

    let found = await Product.findOne({ slug })
      .populate('category')
      .populate('supplier');

    if (found) {
      return res.send({ ok: true, result: found });
    }

    return res.send({ ok: false, message: 'Object not found' });
  } catch (err) {
    return res.status(400).json({
      type: err.name,
      errors: err.errors,
      message: err.message,
      provider: 'yup',
    });
  }
});


router.post("/", function (req, res) {
  // Validate
  const validationSchema = yup.object({
    body: yup.object({
      name: yup.string().required(),
      price: yup.number().positive().required(),
      discount: yup.number().positive().max(50).required(),
      img: yup.string(),
      categoryId: yup
        .string()
        .required()
        .test("Validate ObjectID", "${path} is not valid ObjectID", (value) => {
          return ObjectId.isValid(value);
        }),
      supplierId: yup
        .string()
        .required()
        .test("Validate ObjectID", "${path} is not valid ObjectID", (value) => {
          return ObjectId.isValid(value);
        }),
      description: yup.string(),
    }),
  });

  validationSchema
    .validate({ body: req.body }, { abortEarly: false })
    .then(async () => {
      const data = req.body;
      let newItem = new Product(data);
      await newItem.save();
      res.send({ ok: true, message: "Created", result: newItem });
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

router.delete("/:id", function (req, res) {
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

        let found = await Product.findByIdAndDelete(id);

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

router.patch("/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const data = req.body;
    await Product.findByIdAndUpdate(id, data);
    res.send({ ok: true, message: "Updated" });
  } catch (error) {
    res.status(500).send({ ok: false, error });
  }

});

module.exports = router;
