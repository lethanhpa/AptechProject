import React, { useState, useEffect, memo } from "react";
import Styles from "../../styles/cart.module.css";
import { DeleteOutlined } from "@ant-design/icons";
import axiosClient from "@/libraries/axiosClient";
import { Button, Result, Popconfirm, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import numeral from "numeral";
import jwt_decode from "jwt-decode";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from "react-toastify";

function Cart() {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  

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
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const decoded = jwt_decode(token);
        const customerId = decoded._id;
  
        console.log('customerId', customerId);
  
        const response = await axiosClient.get(`http://localhost:9000/cart/${customerId}`);
        const data = response.data;
  
        console.log('data', data);
  
        setCart(data.payload.results);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  },[router]);
  
 
  const handleRemoveCart = async (productId) => {
    try {
      const newCarts = [...cart];
      const cartIndex = newCarts.findIndex((cart) =>
        cart.products.some((product) => product.productId === productId)
      );
      const productIndex = newCarts[cartIndex].products.findIndex((product) =>
        product.productId === productId
      );

      newCarts[cartIndex].products.splice(productIndex, 1);

      setCart(newCarts);
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);
      const customerId = decoded._id;

      await axiosClient.delete(`/cart/${customerId}/${productId}`);
    } catch (error) {
      console.error(error);
    }
  };

  const text = 'Are you sure you want to delete?';
  const description = 'Delete the it';

  const handleAddOrder = async () => {
    router.push("/checkout")
  };

  return (
    <>
      <div className={Styles.cart}>
        <div className={Styles.cart_title}>
          <h1>Bag</h1>
        </div>
        <div className={Styles.cart_left_wrap}>
          <div className={Styles.cart_left_list}>
            <div className={Styles.cart_left_item}>
              {cart.length > 0 && (
                cart.map((item) => (
                  item.products.length > 0 ? (
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
                            </Link>
                            <div className={Styles.card_icon}>
                              <Popconfirm
                                placement="top"
                                title={text}
                                description={description}
                                onConfirm={() => {
                                  handleRemoveCart(product.product._id)
                                  toast.success("Delete successfully!");
                                }}
                                okText="Yes"
                                cancelText="No"
                              >
                                <button className={Styles.icon}>
                                  <DeleteOutlined />
                                </button>
                              </Popconfirm><ToastContainer />
                            </div>
                          </div>
                        </div>
                        <div className={Styles.cart_product_price}>
                          <span>Price: ${numeral(((product.product.price * (100 - product.product.discount)) / 100) * product.quantity).format("0,0")}</span>
                        </div>
                      </div>
                    ))) : (
                    <Result
                      title="There are no products in your cart yet"
                      extra={
                        <Button
                          type="submit"
                          style={{ backgroundColor: "#1677ff", color: "#fff" }}
                          key="console"
                        >
                          <Link href="/products">Return Shop!</Link>
                        </Button>
                      }
                    />
                  )
                ))
              )}
            </div>
          </div>
          <div className={Styles.cart_right_wrap}>
            <div className={Styles.cart_title}>Summary</div>
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
              <div className={Styles.card_right_button}>
                <button onClick={handleAddOrder}>Member Checkout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(Cart);
