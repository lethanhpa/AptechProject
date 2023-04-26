import React, { useState } from 'react'
import {
    UserOutlined,
    HomeOutlined,
    FileDoneOutlined,
    DropboxOutlined,
    FileTextOutlined,
    IdcardOutlined
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useNavigate } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;
// function getItem(label, key, icon, children) {
//     return {
//         key,
//         icon,
//         children,
//         label,
//     };
// }
const itemss = [
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
        key: 'manageCategorys',
        icon: <FileTextOutlined />,
    },
    {
        label: 'Manager Supllier',
        key: 'manageSuplliers',
        icon: <IdcardOutlined />,
    },

];
// const items = [
//     getItem("Home", "Home", <HomeOutlined />),
//     getItem("Manager Customer", "manageCustomer", <UserOutlined />),
//     getItem("Manager Employee", "manageEmployee", <UserOutlined />),
// ];
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
                    items={itemss}
                    onClick={(e) => {
                        console.log(e);
                        setCurrent(e.key);
                        navigate(`/${e.key}`);
                    }}
                    selectedKeys={[current]}
                />
            </Sider>
            <Layout className="site-layout">
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                />
                <Content
                    style={{
                        margin: "0 16px",
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: "16px 0",
                        }}
                    >
                        <Breadcrumb.Item>Admin</Breadcrumb.Item>
                        <Breadcrumb.Item>{current}</Breadcrumb.Item>
                    </Breadcrumb>
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
