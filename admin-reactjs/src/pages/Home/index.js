import React, { useState, useEffect } from 'react';
import { Col, Row, Statistic } from 'antd';
import CountUp from 'react-countup';
import axios from '../../libraries/axiosClient';

const formatter = (value) => <CountUp end={value} separator="," />;

export default function Home() {
    const [userCount, setUserCount] = useState(0);
    const [orderCount, setOrderCount] = useState(0);
    const [employeeCount, setEmployeeCount] = useState(0);
    const [productCount, setProductCount] = useState(0);

    useEffect(() => {
        axios
            .get('/customers/count')
            .then((response) => {
                const { data } = response;
                setUserCount(data.count);
            })
            .catch((err) => {
                console.error(err);
            });

        axios
            .get('/orders/count')
            .then((response) => {
                const { data } = response;
                setOrderCount(data.count);
            })
            .catch((err) => {
                console.error(err);
            });

        axios
            .get('/employees/count')
            .then((response) => {
                const { data } = response;
                setEmployeeCount(data.count);
            })
            .catch((err) => {
                console.error(err);
            });

        axios
            .get('/products/count')
            .then((response) => {
                const { data } = response;
                setProductCount(data.count);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    return (
        <div>
            <Row gutter={16}>
                <Col span={12}>
                    <Statistic title="Users" value={userCount} formatter={formatter} />
                    <Statistic title="Orders" value={orderCount} formatter={formatter} />
                </Col>
                <Col span={12}>
                    <Statistic title="Employees" value={employeeCount} formatter={formatter} />
                    <Statistic title="Products" value={productCount} formatter={formatter} />
                </Col>
            </Row>
        </div>
    );
}
