import React, { useState, useEffect } from 'react'
import {
    UserOutlined,
    HomeOutlined,
    FileDoneOutlined,
    DropboxOutlined,
    FileTextOutlined,
    IdcardOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Button } from "antd";
import { useNavigate } from 'react-router-dom';
import Login from "../../pages/Auth/Login"
import { Header } from 'antd/es/layout/layout';
import logo from "../../components/DefaultLayout/image/logo.png"
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



export default function DefaultLayout({ children }, props) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [current, setCurrent] = useState('/');
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            setIsLogin(true);
        }
    }, []);
    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLogin(false);
        navigate(`/`);
    };

    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <>
            {isLogin ? (
                <Layout
                    setIsLogin={setIsLogin}
                    style={{
                        minHeight: "100vh",
                    }}
                >
                    <Sider>
                        <div style={{ color: "#129ECB", margin: "24px", fontSize: "32px", fontWeight: "700" }}><img style={{ width: "80px" }} src={logo} alt='' />YAME</div>
                        <Menu
                            theme="dark"
                            defaultSelectedKeys={["/"]}
                            mode="inline"
                            items={items}
                            onClick={(e) => {
                                setCurrent(e.key);
                                navigate(`/${e.key}`);
                            }}
                            selectedKeys={[current]}
                        />
                    </Sider>
                    <Layout className="site-layout">
                        <Header style={{ textAlign: "end" }}>
                            <Button style={{ width: "100px", backgroundColor: "red", border: "none", color: "white" }} onClick={handleLogout}>Logout</Button>
                        </Header>
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
                                height: "48px"
                            }}
                        >
                            Admin
                        </Footer>
                    </Layout>
                </Layout>
            ) : (
                <Login setIsLogin={setIsLogin} />
            )}
        </>
    )
}
