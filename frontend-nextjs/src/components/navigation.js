import React, { useState, useEffect } from 'react'
import Image from "next/image";
import Link from "next/link";
import { ShoppingCartOutlined, HomeOutlined, ShopOutlined, UserAddOutlined, UserOutlined } from "@ant-design/icons";
import { Button } from "antd"
import Styles from "../styles/home.module.css";
import logo from "../images/logo.png";
import { useRouter } from 'next/router';

const Navigation = () => {
    const [isLogin, setIsLogin] = useState(false);

    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            setIsLogin(true);
        }

    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('token');

        setIsLogin(false);

        router.push('/');
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
                                    <Link href="/profile">
                                        Profile <UserOutlined />
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link href="/signup">
                                        Sign Up <UserAddOutlined />
                                    </Link>
                                </li>

                                <li >
                                    <Link href="/signin">
                                        Sign In <UserOutlined />
                                    </Link>
                                </li>
                            </>
                        )}
                        {isLogin && (
                            <Button type='error' className={Styles.btn_logout} onClick={handleLogout}>
                                Logout
                            </Button>
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
