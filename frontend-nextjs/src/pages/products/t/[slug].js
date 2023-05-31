import React from "react";
import numeral from "numeral";
import PropTypes from "prop-types";
import Styles from "../../../styles/productDetail.module.css"
import axiosClient from "../../../libraries/axiosClient";

function ProductDetail(props) {
  const { product } = props;

  return (
    <>
      {product && (
        <div key={product.slug} className={Styles.productDetail}>
          <div className={Styles.productDetail_img}>
            <img src={product.img} alt="" />
          </div >
          <div className={Styles.productDetail_information}>
            <div className={Styles.productDetail_name}>{product.name}</div>
            <div className={Styles.productDetail_description}>{product.description}</div>
            <div className={Styles.productDetail_discount}>Sale off: {product.discount}%</div>
            <div style={{ display: 'flex' }}>
              <div className={Styles.productDetail_price}>{numeral(product.price).format("0,0")}$</div>
              <div className={Styles.productDetail_total}>{numeral(product.total).format("0,0")}$</div>
            </div>
            <div className={Styles.productDetail_add_cart}>
              <button>Add To Cart</button>
            </div>
          </div>
        </div >
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
