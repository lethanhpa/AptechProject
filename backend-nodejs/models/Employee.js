const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const bcrypt = require('bcryptjs');

const employeeSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    validate: {
      validator: function (value) {
        const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailRegex.test(value);
      },
      message: `{VALUE} is not a valid email!`,
    },
    required: [true, 'email is required'],
  },
  phoneNumber: {
    type: String,
    validate: {
      validator: function (value) {
        const phoneRegex = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
        return phoneRegex.test(value);
      },
      message: `{VALUE} is not a valid phone!`,
    },
  },
  password: { type: String, require: true },
  address: { type: String, required: true },
  birthday: { type: Date },
  role: { type: String, required: true },
},
  {
    versionKey: false,
    timestamps: true
  }
);

employeeSchema.pre('save', async function (next) {
  try {

    const salt = await bcrypt.genSalt(10);

    const hashPass = await bcrypt.hash(this.password, salt);

    this.password = hashPass;
    next();
  } catch (err) {
    next(err);
  }
})

employeeSchema.methods.isValidPass = async function (pass) {
  try {
    return await bcrypt.compare(pass, this.password);
  } catch (err) {
    throw new Error(err);
  }
}

employeeSchema.virtual('fullName').get(function () {
  return this.firstName + ' ' + this.lastName;
});

employeeSchema.set('toObject', { virtuals: true });

employeeSchema.set('toJSON', { virtuals: true });
employeeSchema.plugin(mongooseLeanVirtuals);
const Employee = model('Employee', employeeSchema);
module.exports = Employee;