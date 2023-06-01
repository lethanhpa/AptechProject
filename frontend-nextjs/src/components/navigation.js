import Image from "next/image";
import Link from "next/link";
import { ShoppingCartOutlined, HomeOutlined, ShopOutlined, UserAddOutlined, UserOutlined } from "@ant-design/icons";
import Styles from "../styles/home.module.css";
import logo from "../images/logo.png";

const Navigation = () => {
    return (
        <>
            <nav className={Styles.navbar}>
                <div className={Styles.navbar_container}>
                    <input type="checkbox" name id="checkbox" />
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
                        <li>
                            <Link href="/cart">
                                Cart <ShoppingCartOutlined />
                            </Link>
                        </li>
                        <li>
                            <Link href="/signup">
                                SIGN UP <UserAddOutlined />
                            </Link>
                        </li>
                        <li>
                            <Link href="/signin">
                                SIGN IN <UserOutlined />
                            </Link>
                        </li>
                    </ul>
                    <div className={Styles.logo}>
                        <Image src={logo} alt="logo" width={58} height={58} />
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navigation;
