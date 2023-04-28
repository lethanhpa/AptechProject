const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
// Mongoose Datatypes:
// https://mongoosejs.com/docs/schematypes.html
const categorySchema = new Schema(
  {
    name: { type: String, required: [true, 'Category bắt buộc phải nhập'] },
    description: { type: String, required: true },
    slug: {
      type: String,
      slug: 'name',
      unique: true
    }
  },
  {
    versionKey: false,
    timestamps: true

  },
);
categorySchema.pre("create", function (next) {
  this.slug = this.name.split(" ").join("-");
  next();
});
const Category = model('Category', categorySchema);

module.exports = Category;
