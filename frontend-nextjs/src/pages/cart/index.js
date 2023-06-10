import React, { useState, useEffect } from 'react';
import Styles from "../../styles/cart.module.css"
import { DeleteOutlined } from "@ant-design/icons"
import axiosClient from "@/libraries/axiosClient";
import { Button, Result } from 'antd';
import Login from "../signin/index"
import Link from "next/link";

function Cart(props) {
    const [isLogin, setIsLogin] = useState(true);
    const { cart } = props;
    const calculateTotalPrice = () => {
        let totalPrice = 0;
        for (const item of cart) {
            totalPrice += item.product?.total;
        }
        return totalPrice;
    };
    return (
        <>
            <div className={Styles.cart}>
                <div className={Styles.cart_title}><h1>Bag</h1></div>
                <div className={Styles.cart_left_wrap}>
                    <div className={Styles.cart_left_list}>
                        <div className={Styles.cart_left_item}>
                            {cart.length > 0 ?
                                cart.map((item) => (
                                    <div key={item} className={Styles.cart_item_wrap}>
                                        <div className={Styles.card_wrap_info}>
                                            <div className={Styles.cart_product_img}>
                                                <img src={item.product?.img} />
                                            </div>
                                            <div className={Styles.cart_product_info}>
                                                <div className={Styles.cart_product_name}>{`${item.product?.name}`}</div>
                                                <div className={Styles.card_product_type}>{`${item.product?.description}`}</div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0 15px' }}>
                                                    <div className={Styles.sizeQty}>
                                                        <span>Quantity: {`${item.quantity}`}</span>
                                                    </div>
                                                </div>
                                                <div className={Styles.card_icon}>
                                                    <button className={Styles.icon}><DeleteOutlined /></button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={Styles.cart_product_price}>
                                            <span>Price: {`${item.product?.total}`}$</span>
                                        </div>
                                    </div>
                                )) : (<Result
                                    status="warning"
                                    title="There are no products in your cart yet"
                                    extra={
                                        <Button type='submit' style={{ backgroundColor: "#FF9900", color: "#fff" }} key="console">
                                            <Link href='/products'>Go Shop</Link>
                                        </Button>
                                    }
                                />)}
                        </div>
                    </div>
                    <div className={Styles.cart_right_wrap}>
                        <div className={Styles.cart_title}>Summary</div>
                        <div className={Styles.card_right_content}>
                            <div className={Styles.card_right_top}>
                                <div className={Styles.card_right_text}>
                                    <span>Subtotal</span>
                                    Price: {calculateTotalPrice()}$
                                </div>
                                <div className={Styles.card_right_text}>
                                    <span>Estimated Delivery & Handling</span>
                                    <p>Free</p>
                                </div>
                            </div>
                            <div className={Styles.card_right_bottom}>
                                <div className={Styles.card_right_text}>
                                    <span>Total</span>
                                    <p>{calculateTotalPrice()}$</p>
                                </div>
                            </div>
                            <div className={Styles.card_right_button}>
                                <button>Buy Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

        </>
    );
};

export default Cart;


export async function getStaticProps() {
    try {
        const response = await axiosClient.get("/cart");

        return {
            props: {
                cart: response.data
            },
        };
    } catch (error) {
        return {
            notFound: true,
        };
    }
}
