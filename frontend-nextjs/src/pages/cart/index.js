import React, { useState } from 'react';
import Styles from "../../styles/cart.module.css"
import { DeleteOutlined } from "@ant-design/icons"
import axiosClient from "@/libraries/axiosClient";

function Cart(props) {
    const { cart } = props;
    return (
        <>{cart.length > 0 ?
            cart.map((item) => (
                <div key={item} className={Styles.cart}>
                    <div className={Styles.cart_title}><h1>Bag</h1></div>
                    <div className={Styles.cart_left_wrap}>
                        <div className={Styles.cart_left_list}>
                            <div className={Styles.cart_left_item}>
                                <div className={Styles.cart_item_wrap}>
                                    <div className={Styles.card_wrap_info}>
                                        <div className={Styles.cart_product_img}>
                                            <img src={item.product?.img} />
                                        </div>
                                        <div className={Styles.cart_product_info}>
                                            <div className={Styles.cart_product_name}>{`${item.product.name}`}</div>
                                            <div className={Styles.card_product_type}>{`${item.product.description}`}</div>
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
                                        <span>Price: {`${item.product.total}`}$</span>
                                    </div>
                                </div>
                            </div>
                        </div>
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
            )) : <p>Không có dữ liệu</p>
        }
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
