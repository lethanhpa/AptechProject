import Image from "next/image";
import React from 'react';
import Styles from "../../styles/auth.module.css"
import { Button, Form, Input } from 'antd';
import axios from "../../libraries/axiosClient";
import logo from "../../images/logo.png"
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from "react-toastify";
const apiName = "/customers";

const Index = () => {
    const [createForm] = Form.useForm();
    const [refresh, setRefresh] = React.useState(0);

    const onFinish = (values) => {
        axios.post(apiName, values)
            .then((_response) => {
                setRefresh((f) => f + 1);
                createForm.resetFields();
                window.location.href = '/signin';
                toast.success('Sign Up successfully!');
            })
            .catch((err) => {
                console.error(err);
                toast.error('Sign Up failed!');
            }, [refresh]);
    };

    return (
        <>
            <div className={Styles.form}>
                <div className={Styles.logo}>
                    <Image className={Styles.logo} src={logo} alt="logo" />
                </div>
                <h4 className={Styles.form_title}>BECOME A YAME MEMBER</h4>
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
                    <p>
                        Create your YAME Member profile and get first access to the very best of YAME products, inspiration and community.
                    </p>

                    <span>First Name:</span>
                    <Form.Item name="firstName" hasFeedback>
                        <Input />
                    </Form.Item>

                    <span>Last Name:</span>
                    <Form.Item name="lastName" hasFeedback>
                        <Input />
                    </Form.Item>

                    <span>Email:</span>
                    <Form.Item name="email" rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]} hasFeedback>
                        <Input />
                    </Form.Item>

                    <span>Password:</span>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]} hasFeedback>
                        <Input.Password placeholder='Passwords must be at least 6 characters' />
                    </Form.Item>

                    <span>Phone Number:</span>
                    <Form.Item name="phoneNumber" rules={[
                        {
                            required: true,
                            message: 'Please input your phone number!',
                        },
                    ]} hasFeedback>
                        <Input />
                    </Form.Item>

                    <span>Address:</span>
                    <Form.Item name="address" hasFeedback>
                        <Input />
                    </Form.Item>

                    <span>Birthday:</span>
                    <Form.Item name="birthday" hasFeedback>
                        <Input placeholder='yyyy/MM/dd' />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 5,
                        }}
                    >
                        <Button type="submit" htmlType='submit' className={Styles.btn}>
                            Sign Up
                        </Button><ToastContainer />
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default Index;