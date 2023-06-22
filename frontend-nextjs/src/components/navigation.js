import React, { useState, useEffect } from 'react'
import Image from "next/image";
import { Badge } from "antd"
import { ShoppingCartOutlined, HomeOutlined, ShopOutlined, UserAddOutlined, UserOutlined } from "@ant-design/icons";
import Styles from "../styles/home.module.css";
import logo from "../images/logo.png";
import { useRouter } from 'next/router';
import axiosClient from "@/libraries/axiosClient";
import jwt_decode from "jwt-decode";


const Navigation = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [total, setTotal] = useState(0);

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

                const response = await axiosClient.get(`/cart/${customerId}`);

                const total = response.data.payload;

                setTotal(total);

            } catch (error) {
                console.log(error);
            }
        };
        fetchCart();
    }, [router]);

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
                            <a href="/">
                                Home <HomeOutlined />
                            </a>
                        </li>

                        <li>
                            <a href="/products">
                                Shop <ShopOutlined />
                            </a>
                        </li>
                        {isLogin ? (
                            <>
                                <li>
                                    {/* <Badge count={total}> */}
                                    <a href="/cart">
                                        Cart <ShoppingCartOutlined />
                                    </a>
                                    {/* </Badge> */}
                                </li>
                                <li>
                                    <a href="/profile">
                                        Profile <UserOutlined />
                                    </a>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <a href="/signup">
                                        Sign Up <UserAddOutlined />
                                    </a>
                                </li>

                                <li>
                                    <a href="/signin">
                                        Sign In <UserOutlined />
                                    </a>
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