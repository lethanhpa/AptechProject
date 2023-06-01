import React from 'react';
import Styles from "../../styles/signup.module.css"
import { Button, message, Form, Input } from 'antd';
import axios from "../../libraries/axiosClient";
const apiName = "/customers";

const Index = () => {
    const [createForm] = Form.useForm();
    const [refresh, setRefresh] = React.useState(0);

    const onFinish = (values) => {
        axios
            .post(apiName, values)
            .then((_response) => {
                setRefresh((f) => f + 1);
                createForm.resetFields();
                message.success("Sign Up successfully!", 1.5);
            })
            .catch((err) => {
                console.error(err);
            }, [refresh]);
    };
    return (

        <>
            <div className={Styles.form}>
                <h4 className={Styles.form_title}>Sign Up</h4>
                <Form
                    className={Styles.form_item}
                    form={createForm}
                    name="create-form"
                    onFinish={onFinish}
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                >
                    <Form.Item label="First Name" name="firstName" hasFeedback>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Last Name" name="lastName" hasFeedback>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Email" name="email" rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]} hasFeedback>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]} hasFeedback>
                        <Input.Password />
                    </Form.Item>

                    <Form.Item label="Phone Number" name="phoneNumber" rules={[
                        {
                            required: true,
                            message: 'Please input your phone number!',
                        },
                    ]} hasFeedback>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Address" name="address" hasFeedback>
                        <Input placeholder='Address' />
                    </Form.Item>

                    <Form.Item label="Birthday" name="birthday" hasFeedback>
                        <Input />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button htmlType='submit' className={Styles.btn}>
                            Sign Up
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default Index;