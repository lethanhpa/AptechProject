const express = require('express');
// const yup = require('yup');
const { Cart } = require('../models/index');
const { default: mongoose } = require("mongoose");
const { Product, Customer } = require('../models')
// const ObjectId = require("mongodb").ObjectId;
const { CONNECTION_STRING } = require("../constants/dbSettings");
mongoose.connect(CONNECTION_STRING);
mongoose.set("strictQuery", false);

const router = express.Router();

// Thêm sản phẩm vào giỏ hàng
router.post('/', async (req, res) => {
    try {
        const { customerId, productId, quantity } = req.body;

        const getCustomer = Customer.findById(customerId);
        const getProduct = Product.findById(productId);

        const [customer, foundProduct] = await Promise.all([
            getCustomer,
            getProduct,
        ]);

        const errors = [];
        if (!customer || customer.$isDeleted)
            errors.push('Khách hàng không tồn tại');
        if (!foundProduct || foundProduct.isDelete)
            errors.push('Sản phảm không tồn tại');

        if (foundProduct && quantity > foundProduct.stock)
            errors.push('Sản phảm vượt quá số lượng cho phép');

        if (errors.length > 0) {
            return res.status(404).json({
                code: 404,
                message: 'Lỗi',
                errors,
            });
        }

        const cart = await Cart.findOne({ customerId })

        const result = {};

        if (cart) { // GIỏ hàng đã tồn tại
            newProductCart = cart.products.map((item) => {
                if (productId === item.productId) {
                    const nextQuantity = quantity + item.quantity;

                    if (nextQuantity > foundProduct.stock) {
                        return res.send({
                            code: 404,
                            message: `Số lượng sản phẩm ${productId._id} không khả dụng`,
                        });
                    } else {
                        item.quantity = nextQuantity;
                    }
                }

                return item;
            })

            result = await Cart.findOneAndUpdate(cart._id, {
                customerId,
                products: newProductCart,
            });
        } else { // Chưa có giỏ hàng
            const newItem = new Cart({
                customerId,
                products: [
                    {
                        productId,
                        quantity,
                    }
                ]
            });

            result = await newItem.save();
        }

        return res.send({
            code: 200,
            message: 'Thêm sản phẩm thành công',
            payload: result,
        });
    } catch (err) {
        console.log('««««« err »»»»»', err);
        return res.status(500).json({ code: 500, error: err });
    }
});

// Lấy danh sách sản phẩm trong giỏ hàng
router.get('/', async (req, res) => {
    try {
        const { id } = req.params;

        let found = await Cart.findOne({ customerId: id });

        if (found) {
            return res.send({ code: 200, payload: found });
        }

        return res.status(410).send({ code: 404, message: 'Không tìm thấy' });
    } catch (err) {
        res.status(404).json({
            message: 'Get detail fail!!',
            payload: err,
        });
    }
});

// Xóa sản phẩm khỏi giỏ hàng
router.delete('/:id', async (req, res) => {
    try {
        const { customerId, productId } = req.body;

        let cart = await Cart.findOne({ customerId });

        if (!cart) {
            return res.status(404).json({
                code: 404,
                message: 'Giỏ hàng không tồn tại',
            });
        }

        if (cart.products.length === 1 && cart.products[0].productId === productId) {
            await Cart.deleteOne({ _id: cart._id });
        } else {
            await Cart.findOneAndUpdate(cart._id, {
                customerId,
                products: cart.products.filter((item) => item.productId !== productId),
            });
        }

        return res.send({
            code: 200,
            message: 'Xóa thành công',
        });
    } catch (err) {
        return res.status(500).json({ code: 500, error: err });
    }
});

module.exports = router;
