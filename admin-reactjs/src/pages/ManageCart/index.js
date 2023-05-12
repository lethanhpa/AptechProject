import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import moment from "moment";
import axios from "../../libraries/axiosClient.js";
const { Column } = Table;
const apiName = "/cart";

export default function ManageCart() {
    const [data, setData] = useState([]);
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
    }, []);

    return (
        <>
            <Table dataSource={data} rowKey="_id">
                <Column title="Quantity" dataIndex="cartDetails" key="cartDetails" render={(cartDetails, _record) => {
                    return (
                        <span>{cartDetails.map((product) => product.quantity)}</span>
                    )
                }} />
                <Column title="Product" dataIndex="cartDetails" key="cartDetails" render={(cartDetails, _record) => {
                    return (
                        <span>{cartDetails.map((product) => product.productId)}</span>
                    )
                }} />
                <Column title="Created Date" dataIndex="createdAt" key="createdAt" render={(text, _record) => {
                    const createdDate = moment(text).format("DD/MM/YYYY");
                    return <span>{createdDate}</span>;
                }} />
                <Column title="Customers" dataIndex="customer.fullName" key="customer.fullName" render={(_text, record) => {
                    return <span>{record.customer.lastName} {record.customer.firstName}</span>;
                }} />
            </Table>
        </>
    )
}