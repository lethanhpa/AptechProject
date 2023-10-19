import React, { useEffect, useState } from 'react'
import { Button, Space, Table, message, Form, Popconfirm, Modal, Select } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import Moment from "moment";
import axios from "../../libraries/axiosClient.js";
import numeral from "numeral";

const { Column } = Table;

const apiName = "/orders";

export default function ManageOrder() {
    const [data, setData] = useState([]);
    const [updateForm] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [updateId, setUpdateId] = useState(0);
    const [refresh, setRefresh] = useState(0);
    const [employees, setEmployees] = useState([]);
    const [openOrderDetail, setOpenOrderDetail] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);


    useEffect(() => {
        axios
            .get(apiName)
            .then((response) => {
                const { data } = response;
                setData(data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [refresh]);

    useEffect(() => {
        axios
            .get("/employees")
            .then((response) => {
                const { data } = response;
                setEmployees(data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [refresh]);

    const onUpdateFinish = (values) => {
        axios
            .patch(apiName + "/" + updateId, values)
            .then((_response) => {
                setRefresh((f) => f + 1);
                updateForm.resetFields();
                message.success("Update successfully!", 1.5);
                setOpen(false);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const text = 'Are you sure you want to delete?';
    const description = 'Delete the it';

    return (
        <>
            <Table dataSource={data} rowKey="_id">
                <Column title="Shipping Address" dataIndex="shippingAddress" key="shippingAddress" />
                <Column title="Shipped Date" dataIndex="shippedDate" key="shippedDate" render={(text) => {
                    return <span>{Moment(text).format("DD/MM/YYYY")}</span>;
                }} />
                <Column title="Payment Type" dataIndex="paymentType" key="paymentType" />
                <Column title="Status" dataIndex="status" key="status" />
                <Column title="Phone Number" dataIndex="phoneNumberOrder" key="phoneNumberOrder" />
                <Column title="Email" dataIndex="emailOrder" key="emailOrder" />
                <Column title="Description" dataIndex="description" key="description" />
                <Column title="Customers" dataIndex="customer.fullName" key="customer.fullName" render={(_text, record) => {
                    return <span>{record.customer?.lastName} {record.customer?.firstName}</span>;
                }} />
                <Column title="Employees" dataIndex="employee.fullName" key="employee.fullName" render={(_text, record) => {
                    return <span>{record.employee?.lastName} {record.employee?.firstName}</span>;
                }} />
                <Column
                    title="Action"
                    key="action"
                    render={(record) => (
                        <Space>
                            <Button
                                type="primary"
                                ghost
                                icon={<EditOutlined />}
                                onClick={() => {
                                    setOpen(true);
                                    setUpdateId(record._id);
                                    updateForm.setFieldsValue(record);
                                }}
                            ></Button>

                            <Popconfirm
                                placement="topRight"
                                title={text}
                                description={description}
                                onConfirm={() => {
                                    axios.delete(apiName + "/" + record._id).then(() => {
                                        setRefresh((f) => f + 1);
                                        message.success("Delete successfully!", 1.5);
                                    });
                                }}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button
                                    danger
                                    icon={<DeleteOutlined />}
                                ></Button>
                            </Popconfirm>

                            <Button
                                onClick={() => {
                                    setOpenOrderDetail(true);
                                    setSelectedOrderId(record);
                                }}
                            ><EyeOutlined />View</Button>
                        </Space>
                    )}
                />
            </Table>
            <Modal
                open={open}
                title="Update"
                onCancel={() => {
                    setOpen(false);
                }}
                cancelText="Close"
                okText="Submit"
                onOk={() => {
                    updateForm.submit();
                }}
            >
                <Form
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

                    <Form.Item
                        label="Employees"
                        name="employeeId"
                        hasFeedback
                        required={true}
                        rules={[
                            {
                                required: true,
                                message: "Required to choose",
                            },
                        ]}
                    >
                        <Select
                            style={{ width: "80%" }}
                            options={employees.map((c) => {
                                return { value: c._id, label: c.lastName + " " + c.firstName };
                            })}
                        />
                    </Form.Item>

                    <Form.Item label="Status" name="status">
                        <Select
                            style={{ width: "80%" }}

                        >
                            <Select.Option value="WAITING">WAITING</Select.Option>
                            <Select.Option value="COMPLETED">COMPLETED</Select.Option>
                            <Select.Option value="CANCELED">CANCELED</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>

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
                <Table dataSource={selectedOrderId?.orderDetails} pagination={false} rowKey="_id">
                    <Table.Column title="Product Name" dataIndex="name" key="name"
                        render={(_text, record) => {
                            return <span>{record.name}</span>;
                        }} />
                    <Table.Column title="Product" dataIndex="img" key="img"
                        render={(_text, record) => {
                            return <img style={{ width: "100px" }} src={record.img} alt="img" />;
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
        </>
    )
}
