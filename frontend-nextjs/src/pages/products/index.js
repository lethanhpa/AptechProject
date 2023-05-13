import React from "react";
import Head from "next/head";
import Link from "next/link";
import PropTypes from "prop-types";
import axiosClient from "../../libraries/axiosClient";

function Products(props) {
  const { products } = props;

  return (
    <>
      <Head>
        <title>Product</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ display: "flex" }}>
        {products.length > 0 ?
          products.map((item, idx) => (
            <div key={item._id} className="mb-2">
              <Link href={`/products/${item._id}`}>
                <div style={{ padding: "12px" }}>
                  <img src={item.img} style={{ width: "400px" }} />
                  <br />
                  <strong>{`${item.name}`}</strong>
                  <br />
                  <span>{`${item.description}`}</span>
                  <br />
                  <span>{`${item.price}`}$</span>
                </div>
              </Link>
            </div>
          )) : <p>Không có dữ liệu</p>
        }
      </div>
    </>
  );
}


Products.propTypes = {
  products: PropTypes.instanceOf(Array),
  total: PropTypes.number,
};

Products.defaultProps = {
  products: [],
  total: 0,
};

export default Products;

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
