import React, { useState } from "react";
import numeral from "numeral";
import PropTypes from "prop-types";
import { Button, message, Form } from 'antd'
import Styles from "../../../styles/productDetail.module.css"
import axiosClient from "../../../libraries/axiosClient";
const apiName = "/cart";

function ProductDetail(props) {
  const [refresh, setRefresh] = useState(0);
  const { product } = props;
  const onFinish = (values) => {
    axiosClient
      .post(apiName, values)
      .then((_response) => {
        setRefresh((f) => f + 1);
        message.success("Add to cart successfully!", 1.5);
      })
      .catch((err) => {
        console.error(err);
      }, [refresh]);
  };

  return (
    <>
      {product && (
        <Form onFinish={onFinish}>
          <div key={product.slug} className={Styles.productDetail}>
            <div className={Styles.productDetail_img}>
              <img src={product.img} alt="" />
            </div >
            <div className={Styles.productDetail_information}>
              <div className={Styles.productDetail_name}>{product.name}</div>
              <div className={Styles.productDetail_description}>{product.description}</div>
              <div className={Styles.productDetail_stock}>Stock: {product.stock}</div>
              {product.discount > 0 ? (
                <div>
                  <div className={Styles.productDetail_discount}>Sale off: {product.discount}%</div>
                  <div style={{ display: 'flex' }}>
                    <div className={Styles.productDetail_price}>{numeral(product.price).format("0,0")}$</div>
                    <div className={Styles.productDetail_total}>{numeral(product.total).format("0,0")}$</div>
                  </div>
                </div>
              ) : (<div className={Styles.productDetail_not_discount}>{numeral(product.price).format("0,0")}$</div>)}
              <div className={Styles.productDetail_add_cart}>
                <Button type="submit" htmlType="submit">Add To Cart</Button>
              </div>
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
