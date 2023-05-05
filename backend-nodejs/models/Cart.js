const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const cartDetailSchema = new Schema(
    {
        productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true, min: 0 },
        createdDate: { type: Date, default: Date.now },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

// Virtual with Populate
cartDetailSchema.virtual("product", {
    ref: "Product",
    localField: "productId",
    foreignField: "_id",
    justOne: true,
});

// Virtuals in console.log()
cartDetailSchema.set("toObject", { virtuals: true });
// Virtuals in JSON
cartDetailSchema.set("toJSON", { virtuals: true });

const cartSchema = new Schema(
    {
        customerId: {
            type: Schema.Types.ObjectId,
            ref: "Customer",
            required: true,
        },
        cartDetails: [cartDetailSchema],
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

cartSchema.virtual("customer", {
    ref: "Customer",
    localField: "customerId",
    foreignField: "_id",
    justOne: true,
});

// Virtuals in console.log()
cartSchema.set("toObject", { virtuals: true });
// Virtuals in JSON
cartSchema.set("toJSON", { virtuals: true });

const Cart = model("Cart", cartSchema);
module.exports = Cart;