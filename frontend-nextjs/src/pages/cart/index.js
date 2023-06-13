import React, { useState, useEffect, memo } from "react";
import Styles from "../../styles/cart.module.css";
import { DeleteOutlined } from "@ant-design/icons";
import axiosClient from "@/libraries/axiosClient";
import { Button, Result } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";


function Cart() {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const router = useRouter();

  useEffect(() => {
    // Tính tổng giá tiền khi cart thay đổi
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

        // setCart(data.payload.results);

      } catch (error) {
        console.log(error);
      }
    };
    fetchCart();
  }, []);


  return (
    <>
      <div className={Styles.cart}>
        <div className={Styles.cart_title}>
          <h1>Bag</h1>
        </div>
        <div className={Styles.cart_left_wrap}>
          <div className={Styles.cart_left_list}>
            <div className={Styles.cart_left_item}>
              {cart.length > 0 ? (
                cart.map((item) => (
                  item.products.map((product) => (
                    <div key={product._id} className={Styles.cart_item_wrap}>
                      <div className={Styles.card_wrap_info}>
                        <div className={Styles.cart_product_img}>
                          <img src={product.product?.img} />
                        </div>
                        <div className={Styles.cart_product_info}>
                          <div
                            className={Styles.cart_product_name}
                          >{product.product?.name}</div>
                          <div
                            className={Styles.card_product_type}
                          >{product.product?.description}</div>
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
                          <div className={Styles.card_icon}>
                            <button className={Styles.icon}>
                              <DeleteOutlined />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className={Styles.cart_product_price}>
                        <span>Price: {((product.product.price * (100 - product.product.discount)) / 100) * product.quantity}$</span>
                      </div>
                    </div>
                  ))
                ))
              ) : (
                <Result
                  status="warning"
                  title="There are no products in your cart yet"
                  extra={
                    <Button
                      type="submit"
                      style={{ backgroundColor: "#FF9900", color: "#fff" }}
                      key="console"
                    >
                      <Link href="/products">Go Shop</Link>
                    </Button>
                  }
                />
              )}
            </div>
          </div>
          <div className={Styles.cart_right_wrap}>
            <div className={Styles.cart_title}>Summary</div>
            <div className={Styles.card_right_content}>
              <div className={Styles.card_right_top}>
                <div className={Styles.card_right_text}>
                  <span>Subtotal</span>
                  Price: {totalPrice}$
                </div>
                <div className={Styles.card_right_text}>
                  <span>Estimated Delivery & Handling</span>
                  <p>Free</p>
                </div>
              </div>
              <div className={Styles.card_right_bottom}>
                <div className={Styles.card_right_text}>
                  <span>Total:</span>
                  <p>{totalPrice}$</p>
                </div>
              </div>
              <div className={Styles.card_right_button}>
                <button>Buy Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(Cart);
// export async function getStaticProps() {
//   try {
//     // const customerId = router?.query?.customerId;
//     const response = await axiosClient.get("/cart/647f88f4373ea20d1d07ceee");
//     const cart = response.data;

//     return {
//       props: {
//         cart,
//       },
//     };
//   } catch (error) {
//     return {
//       notFound: true,
//     };
//   }
// }
