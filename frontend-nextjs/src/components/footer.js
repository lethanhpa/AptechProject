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
                    <p>The customer is at the heart of our<br />unique business model, which includes<br />design.</p>
                    <img src="https://i.postimg.cc/Nj9dgJ98/cards.png" alt="cards" />
                </div>
                <div className={Styles.content_2}>
                    <h4>SHOPPING</h4>
                    <a href="#sellers">Clothing Store</a>
                    <a href="#sellers">Trending Shoes</a>
                    <a href="#sellers">Accessories</a>
                    <a href="#sellers">Sale</a>
                </div>
                <div className={Styles.content_3}>
                    <h4>SHOPPING</h4>
                    <a href="./contact.html">Contact Us</a>
                    <a href="https://payment-method-sb.netlify.app/" target="_blank">Payment Method</a>
                    <a href="https://delivery-status-sb.netlify.app/" target="_blank">Delivery</a>
                    <a href="https://codepen.io/sandeshbodake/full/Jexxrv" target="_blank">Return and Exchange</a>
                </div>
                <div className={Styles.content_4}>
                    <h4>NEWLETTER</h4>
                    <p>Be the first to know about new<br />arrivals, look books, sales &amp; promos!</p>
                    <div className={Styles.f_mail}>
                        <input type="email" placeholder="Your Email" />
                        <i className={`${Styles.bx}  ${Styles.bx_envelope}`} />
                    </div>
                    <hr />
                </div>
            </div>
        </footer>
    );
};

export default AppFooter;