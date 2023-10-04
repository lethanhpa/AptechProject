import React, { useState, useEffect } from 'react'
import Image from "next/image";
import { ShoppingCartOutlined, HomeOutlined, ShopOutlined, UserAddOutlined, UserOutlined, LoginOutlined } from "@ant-design/icons";
import Styles from "../styles/home.module.css";
import { Button, Popconfirm } from 'antd';
import logo from "../images/logo.png";
import { useRouter } from 'next/router';
import axiosClient from "@/libraries/axiosClient";
import jwt_decode from "jwt-decode";
import Link from 'next/link';

const Navigation = () => {
    const [isLogin, setIsLogin] = useState(false);
    const text = 'Do you want to log out?';
    const description = 'Log out now!!!';
    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            setIsLogin(true);
        }

    }, [router]);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const token = localStorage.getItem("token");

                const decoded = jwt_decode(token);

                const customerId = decoded._id;

                await axiosClient.get(`/cart/${customerId}`);

            } catch (error) {
                console.error(error);
            }
        };
        fetchCart();
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLogin(false);
        router.push('/products');
    };

    return (
        <>
            <nav className={Styles.navbar}>
                <div className={Styles.navbar_container}>
                    <input type="checkbox" id="checkbox" />
                    <div className={Styles.hamburger_lines}>
                        <span className={`${Styles.line} ${Styles.line1}`} />
                        <span className={`${Styles.line} ${Styles.line2}`} />
                        <span className={`${Styles.line} ${Styles.line3}`} />
                    </div>
                    <ul className={Styles.menu_items}>
                        <li>
                            <Link href="/">
                                Home <HomeOutlined />
                            </Link>
                        </li>

                        <li>
                            <Link href="/products">
                                Shop <ShopOutlined />
                            </Link>
                        </li>
                        {isLogin ? (
                            <>
                                <li>
                                    <Link href="/cart">
                                        Cart <ShoppingCartOutlined />
                                    </Link>
                                </li>
                                <li>
                                    <Link href='/profile'>
                                        Profile <UserOutlined />
                                    </Link>
                                </li>
                                <Popconfirm
                                    placement="topRight"
                                    title={text}
                                    description={description}
                                    onConfirm={handleLogout}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button
                                        type="error"
                                        className={Styles.btn_logout}
                                    >
                                        <a>Logout <LoginOutlined /></a>
                                    </Button>
                                </Popconfirm>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link href="/signup">
                                        Sign Up <UserAddOutlined />
                                    </Link>
                                </li>

                                <li>
                                    <Link href="/signin">
                                        Sign In <UserOutlined />
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                    <div className={Styles.logo}>
                        <Image src={logo} alt="logo" width={58} height={58} />
                    </div>
                </div>
            </nav >
        </>
    );
};

export default Navigation;