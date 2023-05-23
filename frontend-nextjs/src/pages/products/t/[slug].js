import React from "react";
import PropTypes from "prop-types";

import axiosClient from "../../../libraries/axiosClient";

function ProductDetail(props) {
  const { product } = props;

  return (
    <>
      {product && (
        <main>
          <p>
            <strong>Name:</strong> {product.name}
          </p>
          <p>
            <strong>Price:</strong> {product.price}
          </p>
          <p>
            <strong>Stock:</strong> {product.stock}
          </p>
          <p>
            <strong>Discount:</strong> {product.discount}%
          </p>
          <p>
            <strong>Total:</strong> {product.total}
          </p>
          <div>
            <img src={product.img} style={{ width: "20%" }} />
          </div>
          <p>
            <strong>Supplier name:</strong> {product.supplier.name}
          </p>
          <p>
            <strong>Supplier email:</strong> {product.supplier.email}
          </p>
          <p>
            <strong>Supplier address:</strong> {product.supplier.address}
          </p>
        </main>
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
