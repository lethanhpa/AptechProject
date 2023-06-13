const express = require('express');
const router = express.Router();

const { validateSchema } = require('../helpers/utils');
const {
    getDetailSchema,
    removeSchema,
    createSchema,
} = require('../validation/cart');
const {
    getDetail,
    create,
    remove,
} = require('./controller');

router.route('/')
    .post(validateSchema(createSchema), create)
    .delete(validateSchema(removeSchema), remove)

router.route('/')
    .get(validateSchema(getDetailSchema), getDetail)

router.route('/:id')
    .get(validateSchema(getDetailSchema), getDetail)

router.route('/:customerId/:productId')
    .delete(validateSchema(removeSchema), remove)

module.exports = router;