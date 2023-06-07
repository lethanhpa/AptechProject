import React, { useState, useEffect } from 'react'
import Image from "next/image";
import Link from "next/link";
import { ShoppingCartOutlined, HomeOutlined, ShopOutlined, UserAddOutlined, UserOutlined } from "@ant-design/icons";
import { Button } from "antd"
import Styles from "../styles/home.module.css";
// import { useNavigate } from 'react-router-dom';
import logo from "../images/logo.png";

const Navigation = () => {
    const [isLogin, setIsLogin] = useState(false);
    useEffect(() => {
        const storedLoginState = localStorage.getItem('isLogin');

        if (storedLoginState === 'true') {
            setIsLogin(true);
        }
    }, []);
    // const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('isLogin');
        setIsLogin(false);
        // navigate(`/`);
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
                        <div>
                            <Link href="/">
                                Home <HomeOutlined />
                            </Link>
                        </div>

                        <div>
                            <Link href="/products">
                                Shop <ShopOutlined />
                            </Link>
                        </div>

                        <div>
                            <Link href="/cart">
                                Cart <ShoppingCartOutlined />
                            </Link>
                        </div>
                        {isLogin ? (
                            <div setIsLogin={setIsLogin}>
                                <Link href="/profile">
                                    Profile <UserOutlined />
                                </Link>
                            </div>
                        ) : (
                            <>
                                <div>
                                    <Link href="/signup">
                                        Sign Up <UserAddOutlined />
                                    </Link>
                                </div>

                                <div>
                                    <Link href="/signin">
                                        Sign In <UserOutlined />
                                    </Link>
                                </div>
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
