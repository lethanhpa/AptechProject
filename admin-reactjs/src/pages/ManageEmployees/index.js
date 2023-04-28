import React, { useEffect, useState } from 'react'
import { Button, Space, Table, message } from 'antd';
import { DeleteOutlined } from "@ant-design/icons";
import axios from "../../libraries/axiosClient.js";
const { Column } = Table;
const apiName = "/employees";

export default function ManageEmployees() {
    const [data, setData] = useState([]);
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
        <div>
            <Table dataSource={data} rowKey="_id">
                <Column title="First Name" dataIndex="firstName" key="firstName" />
                <Column title="Last Name" dataIndex="lastName" key="lastName" />
                <Column title="Email" dataIndex="email" key="email" />
                <Column title="Birthday" dataIndex="birthday" key="birthday" />
                <Column title="Phone Number" dataIndex="phoneNumber" key="phoneNumber" />
                <Column title="Address" dataIndex="address" key="address" />
                <Column
                    title="Action"
                    key="action"
                    render={(record) => (
                        <Space size="middle">
                            <Button
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => {
                                    console.log(record.id);
                                    axios.delete(apiName + "/" + record.id).then((response) => {
                                        setRefresh((f) => f + 1);
                                        message.success("Xóa danh mục thành công!", 1.5);
                                    });
                                }}
                            >Xóa</Button>
                        </Space>
                    )}
                />
            </Table>
        </div>
    )
}
