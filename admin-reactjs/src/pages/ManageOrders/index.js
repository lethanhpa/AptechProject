import React, { useEffect, useState } from 'react'
import { Button, Space, Table, message } from 'antd';
import { DeleteOutlined } from "@ant-design/icons";
import axios from "../../libraries/axiosClient.js";
const { Column } = Table;
const apiName = "/orders";

export default function ManageOrder() {
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = React.useState(0);
    useEffect(() => {
        axios
            .get(apiName)
            .then((response) => {
                const { data } = response;
                setData(data);
                console.log(data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [refresh]);
    return (
        <>
            <Table dataSource={data} rowKey="_id">
                <Column title="Shipping Address" dataIndex="shippingAddress" key="shippingAddress" />
                <Column title="Shipped Date" dataIndex="shippedDate" key="shippedDate" />
                <Column title="Payment Type" dataIndex="paymentType" key="paymentType" />
                <Column title="Status" dataIndex="status" key="status" />
                <Column title="Customers" dataIndex="customer.fullName" key="customer.fullName" render={(_text, record) => {
                    return <span>{record.customer.lastName} {record.customer.firstName}</span>;
                }} />
                <Column title="Employees" dataIndex="employee.fullName" key="employee.fullName" render={(_text, record) => {
                    return <span>{record.employee.lastName} {record.employee.firstName}</span>;
                }} />
                <Column title="Order Details" dataIndex="orderDetails" key="orderDetails" render={(_text, record) => {
                    return (
                        <span>
                            Quantity: {record.orderDetails[0].quantity}
                            <br />
                            Product: {record.orderDetails[0].productId}
                        </span>
                    );
                }} />
                <Column
                    title="Action"
                    key="action"
                    render={(record) => (
                        <Space size="middle">
                            <Button
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => {
                                    console.log(record._id);
                                    axios.delete(apiName + "/" + record._id).then(() => {
                                        setRefresh((f) => f + 1);
                                        message.success("Xóa danh mục thành công!", 1.5);
                                    });
                                }}
                            >Xóa</Button>
                        </Space>
                    )}
                />
            </Table>
        </>
    )
}
