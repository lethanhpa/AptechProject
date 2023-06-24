const { Cart, Customer, Product, Order } = require('../models/index');

module.exports = {
    getDetail: async (req, res, next) => {
        try {
            const { id } = req.params;

            let found = await Cart.findOne({ customerId: id })

            let results = await Cart.find({ customerId: id })
                .populate("products.product")
                .populate("customer")
                .lean({ virtual: true });

            if (found) {
                let total = 0;
                results.forEach((item) => {
                    item.products.forEach((product) => {
                        total += product.quantity;
                    });
                });
                return res.send({ code: 200, payload: { found, results, total } });

            }

            return res.status(410).send({ code: 404, message: 'Không tìm thấy' });
        } catch (err) {
            res.status(404).json({
                message: 'Get detail fail!!',
                payload: err,
            });
        }
    },

    create: async function (req, res, next) {
        try {
            const { customerId, productId, quantity } = req.body;

            const getCustomer = Customer.findById(customerId);
            const getProduct = Product.findById(productId);

            const [customer, foundProduct] = await Promise.all([
                getCustomer,
                getProduct,
            ]);

            const errors = [];
            if (!customer || customer.isDelete)
                errors.push('Khách hàng không tồn tại');
            if (!foundProduct || foundProduct.isDelete)
                errors.push('Sản phẩm không tồn tại');

            if (foundProduct && quantity > foundProduct.stock)
                errors.push('Sản phảm vượt quá số lượng cho phép');

            if (errors.length > 0) {
                return res.status(404).json({
                    code: 404,
                    message: 'Lỗi',
                    errors,
                });
            }

            const cart = await Cart.findOne({ customerId }).lean()

            let result = {};

            if (cart) { // GIỏ hàng đã tồn tại
                let newProductCart = cart.products;
                const checkProductExits = newProductCart.find(product => product.productId.toString() === productId.toString());

                if (!checkProductExits) {
                    newProductCart.push({
                        productId,
                        quantity,
                    })
                } else {
                    const nextQuantity = quantity + checkProductExits.quantity;

                    if (nextQuantity > foundProduct.stock) {
                        return res.send({
                            code: 404,
                            message: `Số lượng sản phẩm ${product._id} không khả dụng`,
                        });
                    }

                    newProductCart = newProductCart.map((item) => {
                        const product = { ...item };
                        if (productId.toString() === product.productId.toString()) {
                            product.quantity = nextQuantity;
                        }

                        return product;
                    })

                }

                result = await Cart.findByIdAndUpdate(cart._id, {
                    customerId,
                    products: newProductCart,
                }, { new: true });

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
            return res.status(500).json({ code: 500, error: err });
        }
    },

    remove: async function (req, res, next) {
        try {
            const { customerId, productId } = req.params;

            let cart = await Cart.findOneAndUpdate(
                { customerId },
                { $pull: { products: { productId } } }
            );

            if (!cart) {
                return res.status(404).json({
                    code: 404,
                    message: "Giỏ hàng không tồn tại",
                });
            }

            return res.send({
                code: 200,
                message: "Xóa thành công",
            });
        } catch (err) {
            return res.status(500).json({ code: 500, error: err });
        }
    },

    removeAllProducts: async function (req, res, next) {
        try {
            const { customerId } = req.params;

            let cart = await Cart.findOneAndUpdate(
                { customerId },
                { $set: { products: [] } }
            );

            if (!cart) {
                return res.status(404).json({
                    code: 404,
                    message: "Giỏ hàng không tồn tại",
                });
            }

            return res.send({
                code: 200,
                message: "Xóa tất cả sản phẩm thành công",
            });
        } catch (err) {
            return res.status(500).json({ code: 500, error: err });
        }
    },

};