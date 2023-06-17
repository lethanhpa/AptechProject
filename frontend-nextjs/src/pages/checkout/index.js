import React, { useState, useEffect, memo } from "react";
import Styles from "../../styles/checkout.module.css";
import axiosClient from "@/libraries/axiosClient";
import { Button, Result, Popconfirm, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import numeral from "numeral";
import jwt_decode from "jwt-decode";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from "react-toastify";

function Checkout() {
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const calculateTotalPrice = () => {
            let total = 0;
            cart.forEach((item) => {
                item.products.forEach((product) => {
                    total += (product.product.price * (100 - product.product.discount) / 100) * product.quantity;
                });
            });

            setTotalPrice(total);
        };

        calculateTotalPrice();
    }, [cart]);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const token = localStorage.getItem("token");

                const decoded = jwt_decode(token);

                const customerId = decoded._id;

                const response = await axiosClient.get(`/cart/${customerId}`);
                console.log('««««« response »»»»»', response);

                const data = response.data;

                setCart(data.payload.results);

            } catch (error) {
                console.log(error);
            }
        };
        fetchCart();
    }, []);

    const handleAddOrder = async () => {
        const token = localStorage.getItem("token");
        const decoded = jwt_decode(token);
        const customerId = decoded._id;
        console.log("customerId", customerId);

        const orderDetails = cart[0].products.map((p) => {
            return {
                productId: p.product._id,
                quantity: p.quantity,
                price: p.product.price - (p.product.price * p.product.discount / 100),
                discount: p.product.discount,
            };
        });

        const shippedDate = new Date("2023-07-07T00:00:00.000Z");

        const order = {
            createdDate: new Date(),
            shippedDate: shippedDate,
            paymentType: "CASH",
            shippingAddress: "38 Yên Bái - Đà Nẵng",
            status: "WAITING",
            description: "Hàng dễ vỡ xin nhẹ tay ",
            customerId: customerId,
            employeeId: "645e2007f8943dba6e56cd15",
            orderDetails: orderDetails,
        };

        console.log("order", order);
        try {
            const response = await axiosClient.post("/orders", order);
            console.log("response", response);

            if (response) {
                await axiosClient.delete(`/cart/${customerId}`);
                message.success("Đặt hàng thành công!");

                router.push("/orders")
            } else {
                message.success("Đặt hàng thất bại!", 1.5);
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <>
            <div className={Styles.container}>
                <div className={Styles.cart_wrap}>
                    <div className={Styles.enter_}>
                        <p>How would you like to get your order?</p>
                        <input placeholder="Enter your address"></input>
                        <select className={Styles.payments}>
                            <option>CASH</option>
                            <option>CREDIT CARD</option>
                        </select>
                    </div>
                    <div className={Styles.card_right_button}>
                        <button onClick={handleAddOrder}>Buy Now</button>
                    </div>
                </div>
                <div className={Styles.cart_left_wrap}>

                    <div className={Styles.cart_right_wrap}>
                        <div className={Styles.cart_title}>Order Summary</div>
                        <div className={Styles.card_right_content}>
                            <div className={Styles.card_right_top}>
                                <div className={Styles.card_right_text}>
                                    <span>Subtotal</span>
                                    Price: ${numeral(totalPrice).format("0,0")}
                                </div>
                                <div className={Styles.card_right_text}>
                                    <span>Estimated Delivery & Handling</span>
                                    <p>Free</p>
                                </div>
                            </div>
                            <div className={Styles.card_right_bottom}>
                                <div className={Styles.card_right_text}>
                                    <span>Total:</span>
                                    <p>${numeral(totalPrice).format("0,0")}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={Styles.cart_left_list}>
                        <div className={Styles.cart_left_item}>
                            {
                                cart.map((item) => (
                                    item.products.map((product) => (
                                        <div key={product._id} className={Styles.cart_item_wrap}>
                                            <div className={Styles.card_wrap_info}>
                                                <div className={Styles.cart_product_img}>
                                                    <Link href={`/products/t/${product.product?.slug}`}>
                                                        <img src={product.product?.img} />
                                                    </Link>
                                                </div>
                                                <div className={Styles.cart_product_info}>
                                                    <Link href={`/products/t/${product.product?.slug}`}>
                                                        <div
                                                            className={Styles.cart_product_name}
                                                        >{product.product?.name}</div>
                                                        <div
                                                            className={Styles.card_product_type}
                                                        >In stock: {product.product?.stock}</div>
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                alignItems: "center",
                                                                gap: "0 15px",
                                                            }}
                                                        >
                                                            <div className={Styles.sizeQty}>
                                                                <span>
                                                                    Quantity: {product.quantity}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className={Styles.cart_product_price}>
                                                            <span>Price: ${numeral(((product.product.price * (100 - product.product.discount)) / 100) * product.quantity).format("0,0")}</span>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Checkout;