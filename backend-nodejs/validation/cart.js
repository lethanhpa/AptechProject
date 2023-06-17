const yup = require('yup');
const ObjectId = require('mongodb').ObjectId;

module.exports = {

    getDetailSchema: yup.object({
        params: yup.object({
            id: yup.string().test('validationID', 'ID sai định dạng', (value) => {
                return ObjectId.isValid(value);
            }),
        }),
    }),

    removeSchema: yup.object({
        params: yup.object({
            customerId: yup.string().test('validationID', 'ID sai định dạng', (value) => {
                return ObjectId.isValid(value);
            }),
            productId: yup.string().test('validationID', 'ID sai định dạng', (value) => {
                return ObjectId.isValid(value);
            }),
        }),
    }),

    removeAllSchema: yup.object({
        params: yup.object({
            customerId: yup.string().test('validationID', 'ID sai định dạng', (value) => {
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