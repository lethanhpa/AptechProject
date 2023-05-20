import React, { useState } from 'react'
import {
    UserOutlined,
    HomeOutlined,
    FileDoneOutlined,
    DropboxOutlined,
    FileTextOutlined,
    IdcardOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from 'react-router-dom';

const { Content, Footer, Sider } = Layout;

const items = [
    {
        label: 'Home',
        key: '',
        icon: <HomeOutlined />,
    },
    {
        label: 'Manager Customers',
        key: 'manageCustomers',
        icon: <UserOutlined />,
    },
    {
        label: 'Manager Employees',
        key: 'manageEmployees',
        icon: <UserOutlined />,
    },
    {
        label: 'Manager Order',
        key: 'manageOrders',
        icon: <FileDoneOutlined />,
    },
    {
        label: 'Manager Products',
        key: 'manageProducts',
        icon: <DropboxOutlined />,
    },
    {
        label: 'Manager Categories',
        key: 'manageCategories',
        icon: <FileTextOutlined />,
    },
    {
        label: 'Manager Supplier',
        key: 'manageSuppliers',
        icon: <IdcardOutlined />,
    },

];

export default function DefaultLayout({ children }) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [collapsed, setCollapsed] = useState(false);
    const [current, setCurrent] = useState('/');

    const navigate = useNavigate();
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout
            style={{
                minHeight: "100vh",
            }}
        >
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}

            >
                <div
                    style={{
                        height: 32,
                        margin: 16,
                        background: "rgba(255, 255, 255, 0.2)",
                    }}
                />
                <Menu
                    theme="dark"
                    defaultSelectedKeys={["/"]}
                    mode="inline"
                    items={items}
                    onClick={(e) => {
                        console.log(e);
                        setCurrent(e.key);
                        navigate(`/${e.key}`);
                    }}
                    selectedKeys={[current]}
                />
            </Sider>
            <Layout className="site-layout">
                <Content
                    style={{
                        margin: "0 16px",
                    }}
                >
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                        }}
                    >
                        {children}
                    </div>
                </Content>
                <Footer
                    style={{
                        backgroundColor: '#000028',
                        color: '#cecece',
                        textAlign: "center",
                    }}
                >
                    Admin
                </Footer>
            </Layout>
        </Layout>
    )
}
