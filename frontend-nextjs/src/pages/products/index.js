import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import PropTypes from "prop-types";
import { MailOutlined, SettingOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Menu, Layout, Row } from 'antd';
const { Content, Sider } = Layout;
import axiosClient from "../../libraries/axiosClient";
import Navigation from "@/components/navigation";
import Footer from "../../components/footer";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem('Name', 'sub1', <MailOutlined />, [
    getItem('Option 1', '1'),
    getItem('Option 2', '2'),
    getItem('Option 3', '3'),
    getItem('Option 4', '4'),
  ]),
  getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
  ]),
  getItem('Navigation Three', 'sub4', <SettingOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11'),
    getItem('Option 12', '12'),
  ]),
];

const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

function Products(props) {
  const { products } = props;
  const [openKeys, setOpenKeys] = useState(['sub1']);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  return (
    <>
      <Head>
        <title>Product</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <Layout>
        <Sider width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            onOpenChange={onOpenChange}
            style={{ height: '100%' }}
            items={items}
          />
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
      <Footer />
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
