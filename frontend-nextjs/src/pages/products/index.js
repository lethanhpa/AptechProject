import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import { Menu, Layout, Row } from 'antd';
const { Content, Sider } = Layout;
import axiosClient from "../../libraries/axiosClient";

function Products(props) {
  const { products } = props;
  return (
    <>
      <Layout>
        <Sider width={200}>
          <Menu
            mode="inline"
            style={{ height: '100.01%' }}
          >
            <div>This is Menu</div>
          </Menu>
        </Sider>
        <Content style={{ display: "flex", width: "100%" }}>
          <Row justify="space-around">
            {products.length > 0 ?
              products.map((item) => (
                <div key={item.slug} style={{ width: "30%" }}>
                  <Link href={`/products/t/${item.slug}`} style={{ textDecoration: "none" }}>
                    <div style={{ padding: "12px", marginBottom: "64px", fontSize: "18px" }}>
                      <img src={item.img} style={{ width: "350px" }} />
                      <br />
                      <strong>{`${item.name}`}</strong>
                      <br />
                      <span>{`${item.description}`}</span>
                      <br />
                      <span>Price: {`${item.price}`}$</span>
                      <br />
                      <span>Sale off: {`${item.discount}`}%</span>
                    </div>
                  </Link>
                </div>
              )) : <p>Không có dữ liệu</p>
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
