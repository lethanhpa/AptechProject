import React, { useEffect, useState } from 'react'
import { Button, Space, Table, message, Popconfirm } from 'antd';
import { DeleteOutlined } from "@ant-design/icons";
import axios from "../../libraries/axiosClient.js";
import Moment from "moment";

const { Column } = Table;
const apiName = "/customers";

export default function ManageCustomers() {
    const [data, setData] = useState([]);
    const text = 'Are you sure you want to delete?';
    const description = 'Delete the it';
    const [refresh, setRefresh] = React.useState(0);
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
                        </Space>
                    )}
                />
            </Table>
        </>
    )
}
