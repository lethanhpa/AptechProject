import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import numeral from "numeral";
import { Menu, Layout, Row } from 'antd';
const { Content, Sider } = Layout;
import Styles from "../../styles/products.module.css"
import axiosClient from "../../libraries/axiosClient";

function Products(props) {
  const { products } = props;
  return (
    <>
      <Layout>
        <Sider width={200}>
          <Menu
            item='true'
            mode="inline"
            style={{ height: '100.01%' }}
          >
            <div>This is Menu</div>
          </Menu>
        </Sider>
        <Content style={{ display: "flex", width: "100%" }}>
          <Row justify="space-around">
            {products.length > 0 ?
              products.map((item) => {
                if (item.supplierId) {
                  return (
                    <div key={item.slug} className={Styles.product_item}>
                      <Link href={`/products/t/${item.slug}`}>
                        <div className={Styles.product_img}>
                          <img src={item.img} alt='' />
                        </div>
                        <div className={Styles.product_title}>
                          <span>{item.name}</span>
                        </div>
                        <div className={Styles.product_description}>
                          <span>{item.description}</span>
                        </div>
                        <div className={Styles.product_price}>
                          <span>{numeral(item.price).format("0,0")}$</span>
                        </div>
                        <div className={Styles.product_button}>
                          <button>BUY NOW</button>
                        </div>
                      </Link>
                    </div>
                  )
                }
              }) : <p>Không có dữ liệu</p>
            }
          </Row>
        </Content>
      </Layout>
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

// export async function getServerSideProps(context) {
//   const { supplierId } = context.query;

//   try {
//     const response = await axiosClient.get(`/products?supplier=${supplierId}`);

//     return {
//       props: {
//         products: response.data.data,
//         total: response.data.total
//       },
//     };
//   } catch (error) {
//     return {
//       notFound: true,
//     };
//   }
// }