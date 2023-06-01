import React, { useState } from 'react';
import Styles from "../../styles/cart.module.css"
import { DeleteOutlined } from "@ant-design/icons"
import axiosClient from "@/libraries/axiosClient";

function Cart(props) {
    const { products } = props;
    return (
        <>
            <div className={Styles.cart}>
                <div className={Styles.cart_title}><h1>Bag</h1></div>
                <div className={Styles.cart_left_wrap}>
                    {products.map((item) => (
                        <div className={Styles.cart_left_list}>
                            <div className={Styles.cart_left_item}>
                                <div className={Styles.cart_item_wrap}>
                                    <div className={Styles.card_wrap_info}>
                                        <div className={Styles.cart_product_img}>
                                            <img src={item.img} />
                                        </div>
                                        <div className={Styles.cart_product_info}>
                                            <div className={Styles.cart_product_name}>{`${item.name}`}</div>
                                            <div className={Styles.card_product_type}>{`${item.description}`}</div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0 15px' }}>
                                                <div className={Styles.sizeQty}>
                                                    <span>Size</span>
                                                    <select className={Styles.select} id="size">
                                                        <option value="42">42</option>
                                                        <option value="41">41</option>
                                                        <option value="40">40</option>
                                                        <option value="39">39</option>
                                                    </select>
                                                </div>
                                                <div className={Styles.sizeQty}>
                                                    <span>Quantity</span>
                                                    <select className={Styles.select} id="Quantity">
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className={Styles.card_icon}>
                                                <button className={Styles.icon}><DeleteOutlined /></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={Styles.cart_product_price}>
                                        <span>Price: {`${item.total}`}$</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                    }
                    <div className={Styles.cart_right_wrap}>
                        <div className={Styles.cart_title}>Summary</div>
                        <div className={Styles.card_right_content}>
                            <div className={Styles.card_right_top}>
                                <div className={Styles.card_right_text}>
                                    <span>Subtotal</span>
                                    Price:
                                </div>
                                <div className={Styles.card_right_text}>
                                    <span>Estimated Delivery & Handling</span>
                                    <p>Free</p>
                                </div>
                            </div>
                            <div className={Styles.card_right_bottom}>
                                <div className={Styles.card_right_text}>
                                    <span>Total</span>
                                    <p>12,327,000₫</p>
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
        const response = await axiosClient.get("/products");

        return {
            props: {
                products: response.data.data,
                total: response.data.total
            },

        };
    } catch (error) {
        return {
            notFound: true,
        };
    }
}
