import React, { useState, useEffect } from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import numeral from "numeral";
import { Button, InputNumber, Space, Select, Input, Layout, Row, Drawer, Form, Carousel } from 'antd';
import { ControlOutlined, ClearOutlined, SearchOutlined, TagOutlined } from '@ant-design/icons';
const { Content } = Layout;
import Styles from "../../styles/products.module.css"
import axiosClient from "../../libraries/axiosClient";
import { useRouter } from 'next/router';


function Products(props) {
  const { products } = props;
  const { total } = props;

  const router = useRouter();

  const [priceStartSearch, setPriceStartSearch] = useState("");
  const [priceEndSearch, setPriceEndSearch] = useState("");
  const [discountEndSearch, setDiscountEndSearch] = useState("");
  const [discountStartSearch, setDiscountStartSearch] = useState("");
  const [categorySearch, setCategorySearch] = useState("");
  const [supplierSearch, setSupplierSearch] = useState("");
  const [dataSearch, setDataSearch] = useState({});
  const [nameSearch, setNameSearch] = useState("");

  const onClearSearch = () => {
    setNameSearch("");
    setSupplierSearch("");
    setCategorySearch("");
    setPriceStartSearch("");
    setPriceEndSearch("");
    setDiscountEndSearch("");
    setDiscountStartSearch("");
    setDataSearch({});
  };

  const onSearch = () => {

    if (
      nameSearch === "" &&
      categorySearch === "" &&
      supplierSearch === "" &&
      priceStartSearch === "" &&
      priceEndSearch === "" &&
      discountStartSearch === "" &&
      discountEndSearch === ""
    ) {
      return;
    }
    setDataSearch({
      ...(nameSearch !== "" && { productName: nameSearch }),
      ...(categorySearch !== "" && { categoryName: categorySearch }),
      ...(supplierSearch !== "" && { supplier: supplierSearch }),
      ...(priceStartSearch !== "" && { priceStart: priceStartSearch }),
      ...(priceEndSearch !== "" && { priceEnd: priceEndSearch }),
      ...(discountStartSearch !== "" && { discountStart: discountStartSearch }),
      ...(discountEndSearch !== "" && { discountEnd: discountEndSearch }),
    });
  };
  const [handleSearch] = Form.useForm();

  const [openFilter, setOpenFilter] = useState(false);

  const showDrawer = () => {
    setOpenFilter(true);
  };

  const onClose = () => {
    setOpenFilter(false);
  };

  useEffect(() => {
    axiosClient
      .get("/products", {
        params: {
          ...dataSearch,
        },
      })
      .then((response) => {
        const result = response.data;
      })
      .catch((err) => {
        console.error(err);
      });
  }, [router, dataSearch]);

  return (
    <>
      <Layout className={Styles.container} >
        <Content>
          <div className={Styles.shop_wrapper}>
            <Carousel autoplay>
              <div>
                <h3 className={Styles.contentStyle}><img src="https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/w_1423,c_limit/5ba3d11d-c826-498b-90c8-8c8479267697/nike-kids.png" alt="" /></h3>
              </div>
              <div>
                <h3 className={Styles.contentStyle}><img src="https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/w_1423,c_limit/6c89c8a0-c443-4a75-9932-14a715aaec06/men-s-shoes-clothing-accessories.png" alt="" /></h3>
              </div>
              <div>
                <h3 className={Styles.contentStyle}><img src="https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/w_1423,c_limit/71960002-7601-4cb7-b9d0-0334ba6a2363/women-s-shoes-clothing-accessories.png" alt="" /></h3>
              </div>
            </Carousel>
          </div>
          <div className={Styles.header_content}>
            <h2 className={Styles.header_title}>Shop Shoes ({total} products)</h2>
            <button onClick={showDrawer} className={Styles.header_nav_button}>
              <span>Filter</span>
              <ControlOutlined />
            </button>
          </div>
          <Drawer
            title="Filter Products"
            placement="right"
            width={500}
            onClose={onClose}
            open={openFilter}
          >
            {/* Search name product */}
            <Form
              form={handleSearch}
              name="search-form"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
            >
              <Form.Item
                label="Name"
                name="name"
                hasFeedback={nameSearch === "" ? false : true}
                valuePropName={nameSearch}
              >
                <Input
                  value={nameSearch}
                  onChange={(e) => {
                    setNameSearch(e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item label="Category">
                <Input
                  value={categorySearch}
                  onChange={(e) => {
                    setCategorySearch(e.target.value);
                  }}
                  placeholder="Enter Category"
                />
              </Form.Item>

              <Form.Item label="Supplier">
                <Input
                  value={supplierSearch}
                  onChange={(e) => {
                    setSupplierSearch(e.target.value);
                  }}
                  placeholder="Enter Supplier"
                />
              </Form.Item>

              <Form.Item label="Price">
                <Space>
                  <InputNumber
                    min={0}
                    onChange={(value) => {
                      setPriceStartSearch(value);
                    }}
                    placeholder="From..."
                    value={priceStartSearch}
                  />
                  <InputNumber
                    min={0}
                    onChange={(value) => {
                      setPriceEndSearch(value);
                    }}
                    placeholder="To..."
                    value={priceEndSearch}
                  />
                </Space>
              </Form.Item>

              <Form.Item label="Discount">
                <Space>
                  <InputNumber
                    min={0}
                    onChange={(value) => {
                      setDiscountStartSearch(value);
                    }}
                    value={discountStartSearch}
                    placeholder="From..."
                  />
                  <InputNumber
                    max={99}
                    min={0}
                    onChange={(value) => {
                      setDiscountEndSearch(value);
                    }}
                    value={discountEndSearch}
                    placeholder="To..."
                  />
                </Space>
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button onClick={onClearSearch} style={{ marginRight: "5px" }}>
                  Clear
                  <ClearOutlined />
                </Button>
                <Button onClick={onSearch}>
                  Search
                  <SearchOutlined />
                </Button>
              </Form.Item>
            </Form>
          </Drawer>

          <Row justify="space-around">
            {products.length > 0 ?
              products
                .filter((item) => {
                  if (nameSearch !== "" && !item.name.toLowerCase().includes(nameSearch.toLowerCase())) {
                    return false;
                  }
                  if (categorySearch !== "" && !item.category?.name.toLowerCase().includes(categorySearch.toLowerCase())) {
                    return false;
                  }
                  if (supplierSearch !== "" && !item.supplier?.name.toLowerCase().includes(supplierSearch.toLowerCase())) {
                    return false;
                  }
                  if (
                    priceStartSearch !== "" &&
                    priceEndSearch !== "" &&
                    (item.price < parseFloat(priceStartSearch) || item.price > parseFloat(priceEndSearch))
                  ) {
                    return false;
                  }
                  if (
                    discountStartSearch !== "" &&
                    discountEndSearch !== "" &&
                    (item.discount < parseFloat(discountStartSearch) || item.discount > parseFloat(discountEndSearch))
                  ) {
                    return false;
                  }
                  return true;
                })
                .map((item) => {
                  return (
                    <div key={item.slug} className={Styles.product_item}>
                      <Link href={`/products/t/${item.slug}`}>
                        <div className={Styles.product_img}>
                          <img src={item.img} alt='' />
                        </div>
                        <div className={Styles.product_title}>
                          <span>{item.name}</span>
                        </div>
                        <div className={Styles.product_supplier}>
                          <span>{item.supplier.name}</span>
                        </div>
                        <div className={Styles.product_category}>
                          <span>{item.category.name}</span>
                        </div>
                        {item.discount > 0 ? (
                          <div style={{ display: 'flex' }}>
                            <div className={Styles.product_category}>
                              <span><TagOutlined /> {item.discount}%</span>
                            </div>
                            <div className={Styles.product_price}>${numeral(item.price).format("0,0")}</div>
                            <div className={Styles.product_total}>${numeral(item.total).format("0,0")}</div>
                          </div>
                        ) : (<div className={Styles.product_not_discount}>${numeral(item.price).format("0,0")}</div>)}
                        <div className={Styles.product_button}>
                          <button>DETAIL</button>
                        </div>
                      </Link>
                    </div>
                  )
                }
                ) : <p>Không có dữ liệu</p>
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