import React from "react";
import Styles from "../styles/home.module.css"
import logo from "../images/logo.png";
import Image from "next/image";

const AppFooter = () => {
    return (
        <footer className={Styles.footer}>
            <div className={`${Styles.container}  ${Styles.footer_container}`}>
                <div className={Styles.content_1}>
                    <Image className={Styles.logoFooter} src={logo} alt="logo" width={58} height={58} />
                    <p>We would like to introduce to you the leading shoe brand - YAME.<br />YAME brings you shoes that are not only sophisticated in design but<br />also extremely comfortable and suitable for all your activities</p>
                </div>
                <div className={Styles.content_2}>
                    <h4>FASHION</h4>
                    <a href="#supplier">Supplier</a>
                    <a href="#new">New Fashion Of The Month</a>
                    <a href="#sale">Hot Sales</a>
                    <a href="#limited">Limited</a>
                </div>
                <div className={Styles.content_3}>
                    <h4>SHOPPING</h4>
                    <p>Contact Us</p>
                    <p>Delivery</p>
                    <p>Return and Exchange</p>
                </div>
                <div className={Styles.content_4}>
                    <h4>NEW TREND</h4>
                    <p>Be the first to know about new<br />arrivals, look books, sales &amp; promos!</p>
                    <hr />
                </div>
            </div>
        </footer>
    );
};

export default AppFooter;