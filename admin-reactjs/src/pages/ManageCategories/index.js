import React, { useEffect, useState } from 'react'
import { Button, Space, Table, message, Form, Modal, Input, Popconfirm } from 'antd';
import { DeleteOutlined, EditOutlined, UnorderedListOutlined } from "@ant-design/icons";
import axios from "../../libraries/axiosClient.js";
const { Column } = Table;
const apiName = "/categories";

export default function ManageCategories() {
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = React.useState(0);
    const [showTable, setShowTable] = useState(true);
    const [createForm] = Form.useForm();
    const [updateForm] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [updateId, setUpdateId] = useState(0);
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

    const onFinish = (values) => {
        axios
            .post(apiName, values)
            .then((_response) => {
                setRefresh((f) => f + 1);
                createForm.resetFields();
                message.success("New added successfully!", 1.5);
                setShowTable(true);
            })
            .catch((err) => {
                console.error(err);
            });
    };

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
        <div style={{ padding: "24px" }}>
            {showTable === false ? (
                <>
                    <div style={{ textAlign: "left" }}>
                        <Button
                            type="primary"
                            ghost
                            onClick={() => {
                                setShowTable(true);
                            }}>
                            <UnorderedListOutlined />
                        </Button>
                    </div>
                    <h1 style={{ fontSize: "32px", textAlign: "center" }}>ADD LIST</h1>
                    {/* CREATE FORM */}
                    <Form
                        style={{ width: "80%" }}
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
                        <Form.Item label="Name" name="name" hasFeedback>
                            <Input />
                        </Form.Item>

                        <Form.Item label="Description" name="description" hasFeedback>
                            <Input />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit" style={{ width: "140px", height: "35px", fontSize: "18px" }}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </>
            ) : (
                <>
                    <div style={{ textAlign: "left" }}>
                        <Button
                            type="primary"
                            ghost
                            onClick={() => {
                                setShowTable(false);
                            }}>
                            <UnorderedListOutlined />
                        </Button>
                    </div>
                    <h1 style={{ fontSize: "32px", textAlign: "center" }}>LIST</h1>
                    <Table dataSource={data} rowKey="_id">
                        <Column title="Name" dataIndex="name" key="name" />
                        <Column title="Description" dataIndex="description" key="description" />
                        <Column

                            title="Action"
                            key="action"
                            render={(record) => (
                                <Space size="middle">
                                    <Button
                                        type="primary"
                                        ghost
                                        icon={<EditOutlined />}
                                        onClick={() => {
                                            setOpen(true);
                                            setUpdateId(record._id);
                                            updateForm.setFieldsValue(record);
                                        }}
                                    >Edit</Button>
                                    <Popconfirm
                                        placement="top"
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
                                        >Delete</Button>
                                    </Popconfirm>
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
                        okText="Update"
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
                            <Form.Item label="Name" name="name" hasFeedback>
                                <Input style={{ width: 300 }} />
                            </Form.Item>

                            <Form.Item label="Description" name="description" hasFeedback>
                                <Input style={{ width: 300 }} />
                            </Form.Item>
                        </Form>
                    </Modal>
                </>
            )}
        </div>
    )
}
