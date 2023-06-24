import React, { useState, useEffect } from 'react'
import Image from "next/image";
import { ShoppingCartOutlined, HomeOutlined, ShopOutlined, UserAddOutlined, UserOutlined } from "@ant-design/icons";
import Styles from "../styles/home.module.css";
import logo from "../images/logo.png";
import { useRouter } from 'next/router';
import axiosClient from "@/libraries/axiosClient";
import jwt_decode from "jwt-decode";


const Navigation = () => {
    const [isLogin, setIsLogin] = useState(false);

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
                                    <a href="/cart">
                                        Cart <ShoppingCartOutlined />
                                    </a>
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