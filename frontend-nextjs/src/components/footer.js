import React from "react";
import { Layout, Typography } from 'antd';
const { Footer } = Layout;
const { Text } = Typography;

const AppFooter = () => {
    return (
        <Footer style={{ height: "200px", backgroundColor: "black", color: "white", fontSize: "15px", padding: "24px 0 0 64px", lineHeight: "2", fontFamily: "calibri", display: "flex" }}>
            <div>
                <div>FIND A STORE</div>
                <div>BECOME A MEMBER</div>
                <div>SIGN UP FOR EMAIL</div>
                <div>Send Us Feedback</div>
            </div>
            <div style={{ marginLeft: "130px" }}>
                <div>GET HEP</div>
                <div style={{ color: "grey", fontSize: "13px" }}>
                    <div>Order Status</div>
                    <div>Delivery</div>
                    <div>Returns</div>
                    <div>Contact Us</div>
                </div>
            </div>
            <div style={{ marginLeft: "150px" }}>
                <div>ABOUT</div>
                <div style={{ color: "grey", fontSize: "13px" }}>
                    <div>Sustainability</div>
                    <div>News</div>
                    <div>Careers</div>
                    <div>Investors</div>
                </div>
            </div>

        </Footer>
    );
};

export default AppFooter;