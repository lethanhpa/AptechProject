import React, { useState } from "react";
import numeral from "numeral";
import PropTypes from "prop-types";
import { Button, Form, Input, InputNumber } from 'antd'
import Styles from "../../../styles/productDetail.module.css"
import axiosClient from "../../../libraries/axiosClient";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from "react-toastify";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";


function ProductDetail(props) {
  const { product } = props;
  const router = useRouter();

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.warning('Please Log in !');
      router.push('/signin');
      return;
    }
    try {
      const decoded = jwt_decode(token);
      const customerId = decoded._id;
      console.log('customerId',customerId)

      await axiosClient.post(`/cart`, {
        customerId: customerId,
        productId: product._id,
        quantity: quantity,
      });
      axiosClient.get(`http://localhost:9000/cart/${customerId}`);
      toast.success("Add to cart successfully!!!");

    } catch (error) {
      console.error(error);
      toast.warning("Add to cart fail !!!")
    }
  };

  return (
    <>
      {product && (
        <Form>
          <div key={product.slug} className={Styles.productDetail}>
            <div className={Styles.productDetail_img}>
              <img src={product.img} alt="" />
            </div >
            <div className={Styles.productDetail_information}>
              <div className={Styles.productDetail_name}>{product.name}</div>
              <div className={Styles.productDetail_category}>{product.category?.name}</div>
              <div className={Styles.productDetail_stock}>In stock: {product.stock}</div>
              {product.discount > 0 ? (
                <div>
                  <div className={Styles.productDetail_discount}>Sale off: {product.discount}%</div>
                  <div style={{ display: 'flex' }}>
                    <div className={Styles.productDetail_price}>${numeral(product.price).format("0,0")}</div>
                    <div className={Styles.productDetail_total}>${numeral(product.total).format("0,0")}</div>
                  </div>
                </div>
              ) : (<div className={Styles.productDetail_not_discount}>${numeral(product.price).format("0,0")}</div>)}
              <div className={Styles.quantity}>
                <span>Quantity:</span>
                <div className={Styles.quantity_btn}>
                  <Input
                    className={Styles.quantity_input}
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                  />
                </div>
              </div>
              <div className={Styles.productDetail_description}>{product.description}</div>
              <div className={Styles.productDetail_add_cart}>
                <Button onClick={handleAddToCart} type="submit" htmlType="submit">Add To Cart</Button>
              </div>
              <ToastContainer />
            </div>
          </div >
        </Form>
      )}
    </>
  );
}

ProductDetail.propTypes = {
  product: PropTypes.instanceOf(Object),
};

ProductDetail.defaultProps = {
  product: {},
};

export default ProductDetail;

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps(req) {
  try {
    const { params } = req;
    const response = await axiosClient.get(`/products/t/${params.slug}`);

    return {
      props: {
        product: response.data.result,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
