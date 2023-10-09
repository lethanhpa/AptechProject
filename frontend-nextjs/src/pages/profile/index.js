import Moment from "moment";
import React, { useState, useEffect } from "react";
import axiosClient from "@/libraries/axiosClient";
import jwt_decode from "jwt-decode";
import Styles from "../../styles/profile.module.css"
import { Input, Form, Button, Modal, message, Table, Space, Spin } from "antd"
import { EyeOutlined } from "@ant-design/icons"
import { useRouter } from 'next/router';
import numeral from "numeral";

const apiName = '/customers'

const ProfilePage = () => {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [updateId, setUpdateId] = useState(0);
    const router = useRouter();
    const [updateForm] = Form.useForm();
    const [dataOrders, setDataOrders] = useState([]);
    const [openOrderDetail, setOpenOrderDetail] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);


    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const token = localStorage.getItem("token");
                const decoded = jwt_decode(token);
                const customerId = decoded._id;

                const response = await axiosClient.get(`/customers/${customerId}`);
                const data = response.data;

                setCustomers(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCustomers();
    }, []);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem("token");
                const decoded = jwt_decode(token);
                const customerId = decoded._id;

                const response = await axiosClient.get(`/orders/${customerId}`)

                const data = response.data;
                setDataOrders(data);
            } catch (err) {
                console.error(err);
            };
        };
        fetchOrders();
    }, []);

    const onUpdateFinish = (values) => {
        axiosClient
            .patch(apiName + "/" + updateId, values)
            .then((_response) => {
                updateForm.resetFields();
                message.success("Update successfully!", 1.5);
                setOpen(false);
            })
            .catch((err) => {
                console.error(err);
            }), [router]
    };

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            setIsLogin(true);
        }

    }, [router]);


    return (
        <>
            {isLogin ? (
                <div className={Styles.container}>
                    {customers && (
                        <>
                            <div className={Styles.content} key={customers._id}>
                                <div className={Styles.content_profile}>
                                    <h1>Your Profile</h1>
                                    <Form
                                        className={Styles.form_item}
                                        form={updateForm}
                                        name="update-form"
                                        onFinish={onUpdateFinish}
                                        labelCol={{
                                            span: 8,
                                        }}
                                        wrapperCol={{
                                            span: 22,
                                        }}
                                    >

                                        <span>First Name:</span>
                                        <Form.Item >
                                            <Input value={customers.firstName} />
                                        </Form.Item>

                                        <span>Last Name:</span>
                                        <Form.Item hasFeedback>
                                            <Input value={customers.lastName} />
                                        </Form.Item>

                                        <span>Email:</span>
                                        <Form.Item rules={[
                                            {
                                                required: true,
                                                message: 'Please input your email!',
                                            },
                                        ]} hasFeedback>
                                            <Input value={customers.email} />
                                        </Form.Item>

                                        <span>Phone Number:</span>
                                        <Form.Item rules={[
                                            {
                                                required: true,
                                                message: 'Please input your phone number!',
                                            },
                                        ]} hasFeedback>
                                            <Input value={customers.phoneNumber} />
                                        </Form.Item>

                                        <span>Address:</span>
                                        <Form.Item hasFeedback>
                                            <Input value={customers.address} />
                                        </Form.Item>

                                        <span>Birthday:</span>
                                        <Form.Item hasFeedback>
                                            <Input value={Moment(customers.birthday).format("DD/MM/YYYY")} />
                                        </Form.Item>

                                        <Form.Item
                                            wrapperCol={{
                                                offset: 8
                                            }}
                                        >
                                            <Button
                                                className={Styles.btn_edit}
                                                onClick={() => {
                                                    setOpen(true);
                                                    setUpdateId(customers._id);
                                                    updateForm.setFieldsValue(customers)
                                                }}>
                                                Edit Profile
                                            </Button>
                                        </Form.Item>
                                    </Form>

                                </div>
                            </div>

                            <Modal
                                open={open}
                                title="Update Profile"
                                onCancel={() => {
                                    setOpen(false);
                                }}
                                cancelText="Close"
                                okText="Update"
                                onOk={() => {
                                    updateForm.submit();
                                }}
                            >
                                <Form
                                    className={Styles.form_update}
                                    form={updateForm}
                                    name="update-form"
                                    onFinish={onUpdateFinish}
                                    labelCol={{
                                        span: 8,
                                    }}
                                    wrapperCol={{
                                        span: 16,
                                    }}
                                >
                                    <span>First Name:</span>
                                    <Form.Item name="firstName" hasFeedback>
                                        <Input style={{ width: 450 }} />
                                    </Form.Item>

                                    <span>Last Name:</span>
                                    <Form.Item name="lastName" hasFeedback>
                                        <Input style={{ width: 450 }} />
                                    </Form.Item>

                                    <span>Email:</span>
                                    <Form.Item name="email" hasFeedback>
                                        <Input style={{ width: 450 }} />
                                    </Form.Item>

                                    <span>Phone Number:</span>
                                    <Form.Item name="phoneNumber" hasFeedback>
                                        <Input style={{ width: 450 }} />
                                    </Form.Item>

                                    <span>Address:</span>
                                    <Form.Item name="address" hasFeedback>
                                        <Input style={{ width: 450 }} />
                                    </Form.Item>

                                    <span>Birthday:</span>
                                    <Form.Item name="birthday" hasFeedback>
                                        <Input style={{ width: 450 }} />
                                    </Form.Item>
                                </Form>
                            </Modal>
                        </>
                    )}

                    <div className={Styles.content_order}>
                        <h1>Your Order</h1>
                        <Table dataSource={dataOrders.results} pagination={false} rowKey="_id">
                            <Table.Column title="Created Date" dataIndex="createdDate" key="createdDate" render={(text) => {
                                return <span>{Moment(text).format("DD/MM/YYYY")}</span>;
                            }} />
                            <Table.Column title="Shipped Date" dataIndex="shippedDate" key="shippedDate" render={(text) => {
                                return <span>{Moment(text).format("DD/MM/YYYY")}</span>;
                            }} />
                            <Table.Column title="Payment Type" dataIndex="paymentType" key="paymentType" />
                            <Table.Column title="Status" dataIndex="status" key="status" />
                            <Table.Column
                                title="Action"
                                key="action"
                                render={(record) => (
                                    <Space size="middle">
                                        <Button
                                            onClick={() => {
                                                setOpenOrderDetail(true);
                                                setSelectedOrderId(record);
                                            }}
                                        ><EyeOutlined /></Button>
                                    </Space>
                                )}
                            />
                        </Table>

                        <Modal
                            width={1000}
                            orderDetails={selectedOrderId}
                            open={openOrderDetail}
                            title="Order Detail"
                            onCancel={() => {
                                setOpenOrderDetail(false);
                            }}
                            footer={[
                                <Button
                                    key="close"
                                    onClick={() => {
                                        setOpenOrderDetail(false);
                                    }}
                                >
                                    Close
                                </Button>,
                            ]}
                        >
                            <Table className={Styles.orderDetails} dataSource={selectedOrderId?.orderDetails} pagination={false} rowKey="_id">
                                <Table.Column title="Product Name" dataIndex="name" key="name"
                                    render={(_text, record) => {
                                        return <span>{record.product?.name}</span>;
                                    }} />
                                <Table.Column title="Product" dataIndex="img" key="img"
                                    render={(_text, record) => {
                                        return <img className={Styles.product_img} src={record.product?.img} alt="img" />;
                                    }} />
                                <Table.Column title="Quantity" dataIndex="quantity" key="quantity"
                                    render={(_text, record) => {
                                        return <span>{record.quantity}</span>;
                                    }} />
                                <Table.Column title="Price" dataIndex="price" key="price"
                                    render={(_text, record) => {
                                        return <span>${numeral(record.price).format("0,0")}</span>;
                                    }} />
                                <Table.Column title="Discount" dataIndex="discount" key="discount"
                                    render={(_text, record) => {
                                        return <span>{record.discount}%</span>;
                                    }} />
                                <Table.Column title="Total" key="total" render={(_text, record) => {
                                    const total = record.quantity * record.price * (1 - record.discount / 100);
                                    return <span>${numeral(total).format("0,0")}</span>;
                                }} />
                            </Table>
                        </Modal>
                    </div>
                </div>
            ) : <Spin tip="Loading" size="large">
                <div className="content" />
            </Spin>}
        </>
    );
};

export default ProfilePage;