import React, { useEffect, useState } from 'react'
import { Button, Space, Table, message } from 'antd';
import { DeleteOutlined } from "@ant-design/icons";
import axios from "../../libraries/axiosClient.js";
const { Column } = Table;
const apiName = "/products";

export default function ManageProducts() {
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
        <div>
            <Table dataSource={data}>
                <Column title="Name" dataIndex="name" key="name" />
                <Column title="Price" dataIndex="price" key="price" />
                <Column title="Discount" dataIndex="discount" key="discount" />
                <Column title="Stock" dataIndex="stock" key="stock" />
                <Column title="Description" dataIndex="description" key="description" />
                <Column title="Category" dataIndex="category.name" key="category.name" render={(text, record, index) => {
                    return <span>{record.category.name}</span>;
                }} />
                <Column title="Supplier" dataIndex="supplier.name" key="supplier.name" render={(text, record, index) => {
                    return <span>{record.supplier.name}</span>;
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
