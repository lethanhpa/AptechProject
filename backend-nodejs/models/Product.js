const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const productSchema = Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0, default: 0 },
    discount: { type: Number, min: 0, max: 75, default: 0 },
    stock: { type: Number, min: 0, default: 0 },
    description: { type: String, required: true },
    img: { type: String },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: false },
    supplierId: { type: Schema.Types.ObjectId, ref: 'Supplier', required: false },
    slug: {
      type: String,
      slug: 'name',
      unique: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);
productSchema.pre("create", function (next) {
  this.slug = this.name.split(" ").join("-");
  next();
});

productSchema.virtual('total').get(function () {
  return (this.price * (100 - this.discount)) / 100;
});

productSchema.virtual('category', {
  ref: 'Category',
  localField: 'categoryId',
  foreignField: '_id',
  justOne: true,
});

productSchema.virtual('supplier', {
  ref: 'Supplier',
  localField: 'supplierId',
  foreignField: '_id',
  justOne: true,
});

productSchema.set('toObject', { virtuals: true });

productSchema.set('toJSON', { virtuals: true });

productSchema.plugin(mongooseLeanVirtuals);

const Product = model('Product', productSchema);
module.exports = Product;
