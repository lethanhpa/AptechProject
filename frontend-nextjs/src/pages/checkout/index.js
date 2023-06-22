import React, { useState, useEffect } from "react";
import Styles from "../../styles/checkout.module.css";
import axiosClient from "@/libraries/axiosClient";
import { Button, Result, Input, Select } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import numeral from "numeral";
import jwt_decode from "jwt-decode";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from "react-toastify";

function Checkout() {
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [shippingAddress, setShippingAddress] = useState("");
    const [paymentType, setPaymentType] = useState("CASH");
    const [description, setDescription] = useState("");
    const [customers, setCustomers] = useState([]);

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

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const token = localStorage.getItem("token");
                const decoded = jwt_decode(token);
                const customerId = decoded._id;
                console.log('customerId', customerId);

                const response = await axiosClient.get(`/customers/${customerId}`);
                console.log('««««« response »»»»»', response);
                const data = response.data;

                setCustomers(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchCustomers();
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

        const createdDate = new Date();
        const shippedDate = new Date(createdDate);
        shippedDate.setDate(createdDate.getDate() + 1);

        const order = {
            createdDate: new Date(),
            shippedDate: shippedDate,
            paymentType: paymentType,
            shippingAddress: shippingAddress,
            status: "WAITING",
            description: description,
            customerId: customerId,
            employeeId: null,
            orderDetails: orderDetails,
        };

        console.log("order", order);
        try {
            const response = await axiosClient.post("/orders", order);
            console.log("response", response);
            await axiosClient.delete(`/cart/${customerId}`);
            toast.success("Order Success!", 1.5);
            router.push("/thanks")
        } catch (error) {
            console.error(error);
            toast.error("Order failed!");
        }
    };

    const handleChange = (e) => {
        setPaymentType(e.value);
    };
    return (
        <>
            <div className={Styles.container}>
                <div className={Styles.div_left}>
                    <div className={Styles.content_div_left}>
                        <h4>How would you like to get your order?</h4>

                        <div className={Styles.info_div_left}>
                            {customers && (
                                <div key={customers._id}>
                                    <p>{customers.lastName} {customers.firstName}</p>
                                    <p>{customers.email}</p>
                                    <p>{customers.phoneNumber}</p>
                                </div>
                            )}
                        </div>

                        <h4>Please enter your shipping address</h4>
                        <div className={Styles.info_div_left}>
                            <p className={Styles.label_div_left}>Shipping address:</p>
                            <Input
                                required={true}
                                className={Styles.enter_div_left}
                                placeholder="Enter your address"
                                value={shippingAddress}
                                onChange={(e) => setShippingAddress(e.target.value)}
                            />

                            <p className={Styles.label_div_left}>Your notes about the order to us:</p>
                            <Input
                                className={Styles.enter_div_left}
                                required
                                placeholder="Enter description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)} />


                            <p className={Styles.label_div_left}>Payment type:</p>
                            <Select
                                className={Styles.select_div_left}
                                labelInValue
                                defaultValue={{
                                    value: 'CASH',
                                    label: 'CASH',
                                }}
                                value={paymentType}
                                onChange={handleChange}
                                options={[
                                    {
                                        value: 'CASH',
                                        label: 'CASH',
                                    },
                                ]}
                            />
                        </div>
                    </div>
                </div>
                <div className={Styles.div_right}>
                    <div className={Styles.checkout_div_right}>
                        <div className={Styles.checkout_title}>Order Summary</div>
                        <div className={Styles.checkout_right_content}>
                            <div className={Styles.checkout_right_top}>
                                <div className={Styles.checkout_right_text}>
                                    <span>Subtotal</span>
                                    Price: ${numeral(totalPrice).format("0,0")}
                                </div>
                                <div className={Styles.checkout_right_text}>
                                    <span>Estimated Delivery & Handling</span>
                                    <p>Free</p>
                                </div>
                            </div>
                            <div className={Styles.checkout_right_bottom}>
                                <div className={Styles.checkout_right_text}>
                                    <span>Total:</span>
                                    <p>${numeral(totalPrice).format("0,0")}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={Styles.checkout_left_list}>
                        <div className={Styles.checkout_left_item}>
                            {cart.length > 0 && (
                                cart.map((item) => (
                                    item.products.length > 0 ? (
                                        item.products.map((product) => (
                                            <div key={product._id} className={Styles.checkout_item_wrap}>
                                                <div className={Styles.checkout_wrap_info}>
                                                    <div className={Styles.checkout_product_img}>
                                                        <Link href={`/products/t/${product.product?.slug}`}>
                                                            <img src={product.product?.img} />
                                                        </Link>
                                                    </div>
                                                    <div className={Styles.checkout_product_info}>
                                                        <Link href={`/products/t/${product.product?.slug}`}>
                                                            <div
                                                                className={Styles.checkout_product_name}
                                                            >{product.product?.name}</div>
                                                            <div
                                                                className={Styles.checkout_product_type}
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
                                                            <div className={Styles.checkout_product_price}>
                                                                <span>Price: ${numeral(((product.product.price * (100 - product.product.discount)) / 100) * product.quantity).format("0,0")}</span>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))) : (
                                        <Result
                                            title="There are no products in your cart yet"
                                            extra={
                                                <Button
                                                    type="submit"
                                                    style={{ backgroundColor: "#1C86EE", color: "#fff" }}
                                                    key="console"
                                                >
                                                    <Link href="/products">Keep Shopping</Link>
                                                </Button>
                                            }
                                        />
                                    )
                                ))
                            )}
                        </div>
                        <div className={Styles.checkout_right_button}>
                            <button onClick={handleAddOrder}>Buy Now</button>
                        </div><ToastContainer />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Checkout;