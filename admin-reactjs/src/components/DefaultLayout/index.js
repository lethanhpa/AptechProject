import React, { useState, useEffect } from "react";
import {
    UserOutlined,
    FileDoneOutlined,
    DropboxOutlined,
    FileTextOutlined,
    IdcardOutlined,
    HomeOutlined
} from "@ant-design/icons";
import { Layout, Menu, theme, Button } from "antd";
import { useNavigate } from "react-router-dom";
import Login from "../../pages/Auth/Login";
import { Header } from "antd/es/layout/layout";
import logo from "../../components/DefaultLayout/image/logo.png";
const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const items = [
    {
        label: "Home",
        key: "",
        icon: <HomeOutlined />,
    },
    {
        label: "Manager Employees",
        key: "manageEmployees",
        icon: <UserOutlined />,
    },
    {
        label: "Manager Customers",
        key: "manageCustomers",
        icon: <UserOutlined />,
    },
    {
        label: "Manager Products",
        key: "manageProducts",
        icon: <DropboxOutlined />,
    },
    {
        label: "Manager Categories",
        key: "manageCategories",
        icon: <FileTextOutlined />,
    },
    {
        label: "Manager Supplier",
        key: "manageSuppliers",
        icon: <IdcardOutlined />,
    },
    {
        label: "Manager Order",
        icon: <FileDoneOutlined />,
        key: "manageOrders",
    },
];

const itemsEmployee = [
    {
        label: "Manager Customers",
        key: "manageCustomers",
        icon: <UserOutlined />,
    },
    {
        label: "Manager Products",
        key: "manageProducts",
        icon: <DropboxOutlined />,
    },
    {
        label: "Manager Categories",
        key: "manageCategories",
        icon: <FileTextOutlined />,
    },
    {
        label: "Manager Order",
        icon: <FileDoneOutlined />,
        key: "manageOrders",
    },
];

export default function DefaultLayout({ children }) {
    const payload = localStorage.getItem("payload");
    let role = '';
    if (payload) {
        role = JSON.parse(payload).role;
    }
    const [current, setCurrent] = useState("/");
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);
    const [initialRedirect, setInitialRedirect] = useState(false);

    const handleMenuClick = (e) => {
        setCurrent(e.key);
        navigate(`/${e.key}`);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            setIsLogin(true);
            if (role === "Admin") {
                setInitialRedirect(true);
            } else {
                setInitialRedirect(false);
            }
        }
    }, [role]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLogin(false);
        setInitialRedirect(false);
        navigate(`/`);
    };

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    useEffect(() => {
        if (isLogin) {
            if (initialRedirect) {
                return;
            }
            if (role === "Admin") {
                navigate("/");
                setInitialRedirect(true);
            } else {
                navigate("/manageProducts");
                setInitialRedirect(true);
            }
        }
    }, [isLogin, role, navigate, initialRedirect]);
    return (
        <>
            {isLogin ? (
                <Layout
                    style={{
                        minHeight: "100vh",
                    }}
                >
                    <Sider>
                        <div
                            style={{
                                color: "#129ECB",
                                margin: "24px",
                                fontSize: "32px",
                                fontWeight: "700",
                            }}
                        >
                            <img style={{ width: "80px" }} src={logo} alt="" />
                            YAME
                        </div>
                        <Menu
                            style={{ marginTop: "20px" }}
                            onClick={handleMenuClick}
                            theme="dark"
                            mode="inline"
                            defaultSelectedKeys={["home"]}
                            selectedKeys={[current]}
                        >
                            {role === "Admin" ? (
                                items.map((item) => {
                                    if (item.children) {
                                        return (
                                            <SubMenu key={item.key} icon={item.icon} title={item.label}>
                                                {item.children.map((child) => (
                                                    <Menu.Item key={child.key}>{child.label}</Menu.Item>
                                                ))}
                                            </SubMenu>
                                        );
                                    }
                                    return (
                                        <Menu.Item key={item.key} icon={item.icon}>
                                            {item.label}
                                        </Menu.Item>
                                    );
                                })
                            ) : (
                                itemsEmployee.map((item) => {
                                    if (item.children) {
                                        return (
                                            <SubMenu key={item.key} icon={item.icon} title={item.label}>
                                                {item.children.map((child) => (
                                                    <Menu.Item key={child.key}>{child.label}</Menu.Item>
                                                ))}
                                            </SubMenu>
                                        );
                                    }
                                    return (
                                        <Menu.Item key={item.key} icon={item.icon}>
                                            {item.label}
                                        </Menu.Item>
                                    );
                                })
                            )}
                        </Menu>
                    </Sider>
                    <Layout className="site-layout">
                        <Header
                            style={{
                                color: "white",
                                fontSize: "28px",
                                fontWeight: "700",
                                fontFamily: "cursive",
                            }}
                        >
                            YOU ARE MY EVERYTHING
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
                                backgroundColor: "#000028",
                                color: "#cecece",
                                textAlign: "center",
                                height: "70px",
                            }}
                        >
                            <div style={{ textAlign: "right" }}>
                                <Button
                                    style={{
                                        width: "100px",
                                        backgroundColor: "red",
                                        border: "none",
                                        color: "white",
                                    }}
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Button>
                            </div>
                        </Footer>
                    </Layout>
                </Layout>
            ) : (
                <Login setIsLogin={setIsLogin} />
            )}
        </>
    );
}
