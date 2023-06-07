const express = require('express');
const { default: mongoose } = require("mongoose");
const { CONNECTION_STRING } = require("../constants/dbSettings");
mongoose.connect(CONNECTION_STRING);
mongoose.set("strictQuery", false);

const router = express.Router();

const {
    validateSchema,
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

router.route('/:id')
    .get(validateSchema(getDetailSchema), getDetail)

module.exports = router;
