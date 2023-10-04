import React from 'react'
import { Col, Row, Statistic } from 'antd';
import CountUp from 'react-countup'
const formatter = (value) => <CountUp end={value} separator="," />;
export default function Home() {
    return (
        <div>
            <Row gutter={16}>
                <Col span={12}>
                    <Statistic title="Users" value={100} formatter={formatter} />
                    <Statistic style={{ marginTop: "30px" }} title="Orders" value={2000} precision={2} formatter={formatter} />
                </Col>
                <Col span={12}>
                    <Statistic title="Employees" value={10} precision={2} formatter={formatter} />
                    <Statistic style={{ marginTop: "30px" }} title="Products" value={500} precision={2} formatter={formatter} />
                </Col>
            </Row>
        </div>
    )
}
