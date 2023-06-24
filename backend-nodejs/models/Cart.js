const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const cartDetailSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, require: true, min: 0 },
});

cartDetailSchema.virtual('product', {
    ref: 'Product',
    localField: 'productId',
    foreignField: '_id',
    justOne: true,
});


cartDetailSchema.set('toObject', { virtuals: true });
cartDetailSchema.set('toJSON', { virtuals: true });


const cartSchema = new Schema(
    {
        customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },

        products: [cartDetailSchema],
    },
    {
        versionKey: false,
    },
);

cartSchema.virtual('customer', {
    ref: 'Customer',
    localField: 'customerId',
    foreignField: '_id',
    justOne: true,
});

cartSchema.set('toObject', { virtuals: true });
cartSchema.set('toJSON', { virtuals: true });

const Cart = model('Cart', cartSchema);
module.exports = Cart;