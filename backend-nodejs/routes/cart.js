const express = require('express');
const router = express.Router();
const { Cart } = require('../models/index');

router.get('/', async (_req, res, next) => {
    try {
        let results = await Cart.find().populate('customer').populate('employee').lean({ virtuals: true });

        res.json(results);
    } catch (error) {
        res.status(500).json({ ok: false, error });
    }
});

router.get("/:id", async function (req, res, next) {
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

    validationSchema
        .validate({ params: req.params }, { abortEarly: false })
        .then(async () => {
            const id = req.params.id;

            let found = await Cart.findById(id);

            if (found) {
                return res.send({ ok: true, result: found });
            }

            return res.send({ ok: false, message: "Object not found" });
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
router.post("/", function (req, res, next) {
    // Validate
    const validationSchema = yup.object({
        body: yup.object({
            productId: yup
                .string()
                .required()
                .test("Validate ObjectID", "${path} is not valid ObjectID", (value) => {
                    return ObjectId.isValid(value);
                }),
            cartDetails: yup.array().required(),
        }),
    });

    validationSchema
        .validate({ body: req.body }, { abortEarly: false })
        .then(async () => {
            const data = req.body;
            let newItem = new Cart(data);
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

                let found = await Cart.findByIdAndDelete(id);

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

module.exports = router;
