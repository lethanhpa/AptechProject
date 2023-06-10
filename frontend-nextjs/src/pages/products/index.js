import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import numeral from "numeral";
import { Menu, Layout, Row } from 'antd';
import { ControlOutlined, DownCircleOutlined } from '@ant-design/icons';
const { Content, Sider } = Layout;
import Styles from "../../styles/products.module.css"
import axiosClient from "../../libraries/axiosClient";

function Products(props) {
  const { products } = props;
  const { total } = props;
  const [display, setDisplay] = React.useState(false);

  const handleOnclick = () => {
    setDisplay((display) => !display);
  };

  const listType = [
    {
      id: 1,
      name: 'Lifestyle',
    },
    {
      id: 2,
      name: 'Jordan',
    },
    {
      id: 3,
      name: 'Running',
    },
    {
      id: 4,
      name: 'Basketball',
    },
    {
      id: 5,
      name: 'Golf',
    },
    {
      id: 6,
      name: 'Tennis',
    },
    {
      id: 7,
      name: 'Athletics',
    },
  ];
  return (
    <>
      <Layout>
        <Content>
          <div className={Styles.shop_wrapper}>
            <div className={Styles.shop_slider}>
              <img src="https://partner-images.bluecore.com/nike_singapore/Left.jpg" alt="" />
              <img src="https://partner-images.bluecore.com/nike_singapore/CENTER.jpg" alt="" />
              <img src="https://partner-images.bluecore.com/nike_singapore/RIGHT.jpg" alt="" />
            </div>
            <div className={Styles.header_content}>
              <h2 className={Styles.header_title}>Shop Shoes({total})</h2>
              <div className="header-nav">
                <button onClick={handleOnclick} className={Styles.header_nav_button}>
                  <span>Hide Filters</span>
                  <ControlOutlined />
                </button>
              </div>
            </div>
          </div>

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
      </Layout >
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