const express = require('express');
const yup = require('yup');
const { Cart } = require('../models/index');
const { default: mongoose } = require("mongoose");
const ObjectId = require("mongodb").ObjectId;
const { CONNECTION_STRING } = require("../constants/dbSettings");
mongoose.connect(CONNECTION_STRING);
mongoose.set("strictQuery", false);

const router = express.Router();

// Thêm sản phẩm vào giỏ hàng
router.post('/', async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        // Kiểm tra đầu vào hợp lệ sử dụng Yup
        const schema = yup.object().shape({
            productId: yup
                .string()
                .required()
                .test("Validate ObjectID", "${path} is not valid ObjectID", (value) => {
                    return ObjectId.isValid(value);
                }),
            quantity: yup.number().min(0).integer().positive().required(),
        });

        await schema.validate({ productId, quantity });

        // Tạo đối tượng Cart
        const cart = new Cart({
            product: productId,
            quantity,
        });

        // Lưu vào cơ sở dữ liệu
        const savedCart = await cart.save();

        res.json(savedCart);
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error.message)
    }
});

// Lấy danh sách sản phẩm trong giỏ hàng
router.get('/', async (req, res) => {
    try {
        const carts = await Cart.find().populate('product').populate('customer');
        res.json(carts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Xóa sản phẩm khỏi giỏ hàng
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Cart.findByIdAndDelete(id);
        res.json({ message: 'Xóa sản phẩm khỏi giỏ hàng thành công.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Cập nhật số lượng sản phẩm trong giỏ hàng
router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;

        // Kiểm tra đầu vào hợp lệ sử dụng Yup
        const schema = yup.object().shape({
            quantity: yup.number().integer().positive().required(),
        });

        await schema.validate({ quantity });

        await Cart.findByIdAndUpdate(id, { quantity });

        res.json({ message: 'Cập nhật số lượng sản phẩm thành công.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
