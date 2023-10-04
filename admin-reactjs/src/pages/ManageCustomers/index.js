import React, { useEffect, useState } from 'react'
import { Button, Space, Table, message, Popconfirm } from 'antd';
import { DeleteOutlined, LockOutlined, UnlockOutlined } from "@ant-design/icons";
import axios from "../../libraries/axiosClient.js";
import Moment from "moment";

const { Column } = Table;
const apiName = "/customers";

export default function ManageCustomers() {
    const [data, setData] = useState([]);
    const text = 'Are you sure you want to delete?';
    const description = 'Delete the it';
    const [refresh, setRefresh] = React.useState(0);

    const lockCustomer = (customerId) => {
        // Gọi API để khóa tài khoản ở đây, ví dụ:
        axios.post(apiName + `/${customerId}/lock`)
            .then(() => {
                setRefresh((f) => f + 1);
                message.success("Lock successfully!", 1.5);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const unlockCustomer = (customerId) => {
        // Gọi API để mở khóa tài khoản ở đây, ví dụ:
        axios.post(apiName + `/${customerId}/unlock`)
            .then(() => {
                setRefresh((f) => f + 1);
                message.success("Unlock successfully!", 1.5);
            })
            .catch((err) => {
                console.error(err);
            });
    };

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
    return (
        <>
            <Table dataSource={data} rowKey="_id">
                <Column title="First Name" dataIndex="firstName" key="firstName" />
                <Column title="Last Name" dataIndex="lastName" key="lastName" />
                <Column title="Email" dataIndex="email" key="email" />
                <Column title="Birthday" dataIndex="birthday" key="birthday" render={(text) => {
                    return <span>{Moment(text).format("DD/MM/YYYY")}</span>;
                }} />
                <Column title="Phone Number" dataIndex="phoneNumber" key="phoneNumber" />
                <Column title="Address" dataIndex="address" key="address" />
                <Column
                    title="Status"
                    dataIndex="isLocked"
                    key="isLocked"
                    render={(isLocked) => {
                        const statusText = isLocked ? 'Lock' : 'UnLock';
                        const statusColor = isLocked ? 'red' : 'green';

                        return <span style={{ color: statusColor }}>{statusText}</span>;
                    }}
                />
                <Column
                    title="Action"
                    key="action"
                    render={(record) => (
                        <Space size="middle">
                            <Popconfirm
                                placement="topRight"
                                title={text}
                                description={description}
                                onConfirm={() => {
                                    axios.delete(apiName + "/" + record.id).then(() => {
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
                            <Button
                                danger
                                icon={<LockOutlined />}
                                onClick={() => lockCustomer(record.id)} // Gọi hàm khóa tài khoản
                            >Lock</Button>
                            <Button
                                type="primary"
                                ghost
                                icon={<UnlockOutlined />}
                                onClick={() => unlockCustomer(record.id)} // Gọi hàm mở khóa tài khoản
                            >Unlock</Button>
                        </Space>
                    )}
                />
            </Table>
        </>
    )
}
