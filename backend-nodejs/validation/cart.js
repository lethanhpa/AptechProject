const yup = require('yup');
const ObjectId = require('mongodb').ObjectId;


const validateSchema = (schema) => async (req, res, next) => {
    try {
        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        return next();
    } catch (err) {
        return res.status(400).json({ type: err.name, message: err.message });
    }
};


module.exports = {

    getDetailSchema: yup.object({
        params: yup.object({
            id: yup.string().test('validationID', 'ID sai định dạng', (value) => {
                return ObjectId.isValid(value);
            }),
        }),
    }),

    removeSchema: yup.object({
        body: yup.object({
            customerId: yup.string().test('validationID', 'ID sai định dạng', (value) => {
                return ObjectId.isValid(value);
            }),
            productId: yup.string().test('validationID', 'ID sai định dạng', (value) => {
                return ObjectId.isValid(value);
            }),
        }),
    }),

    createSchema: yup.object({
        body: yup.object({
            customerId: yup
                .string()
                .required()
                .test('validationCustomerID', 'ID sai định dạng', (value) => {
                    return ObjectId.isValid(value);
                }),

            productId: yup
                .string()
                .required()
                .test('validationProductID', 'ID sai định dạng', (value) => {
                    return ObjectId.isValid(value);
                }),

            quantity: yup.number().required().min(0),
        }),
    }),
};

module.exports = {
    validateSchema,
    asyncForEach: async (array, callback) => {
        for (let index = 0; index < array.length; index += 1) {
            await callback(array[index], index, array); // eslint-disable-line
        }
    }
};