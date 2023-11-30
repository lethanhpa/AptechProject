import React from "react";
import Styles from "../styles/home.module.css"
import { Row, Carousel, Pagination } from 'antd';
import { TagOutlined } from '@ant-design/icons'
import axiosClient from "../libraries/axiosClient";
import Link from "next/link";
import FlaseSale from './FlaseSale/index';

function Home(props) {
  const { suppliers } = props;
  const { products } = props;

  const [currentPage, setCurrentPage] = React.useState(1);
  const pageSize = 4;
  const totalProduct = products.filter((item) => item.discount > 0).length;
  const totalPages = Math.ceil(totalProduct / pageSize);

  return (
    <>
      <div className={Styles.home}>
        <div id="home">
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
        </div>
        <div id="supplier" className={Styles.collection}>
          {suppliers.map((item) => {
            return (
              <Row key={item._id}>
                <div className={`${Styles.container}  ${Styles.collections}`}>
                  <div className={Styles.content}>
                    <div className={Styles.image}>
                      <img src={item.img} alt="img" />
                    </div>
                    <div className={Styles.img_content}>
                      <p>{item.name}</p>
                      <button><a href={`/products/suppliers?supplierId=${item._id}`}>SHOP NOW</a></button>
                    </div>
                  </div>
                </div>
              </Row>
            )
          })
          }
        </div>
        <div>
          {/* <div id="new" className={`${Styles.container}  ${Styles.seller}`}>
            <h2>New Fashion Of The Month</h2>
            <div className={Styles.best_seller}>
              {products
                .filter((item) => {
                  const productDate = new Date(item.createdAt);
                  const currentDate = new Date();
                  const currentMonth = currentDate.getMonth();
                  const productMonth = productDate.getMonth();

                  return productMonth === currentMonth && item.discount <= 0 && item.stock > 10;
                })
                .slice(0, 4)
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((item) => (
                  <Link href={`/products/t/${item.slug}`}>
                    <div className={Styles.best_p1} key={item._id}>
                      <img src={item.img} alt="img" />
                      <div className={Styles.best_p1_txt}>
                        <div className={Styles.name}>
                          <p>{item.name}</p>
                        </div>
                        <div className="rating">
                          <i className="bx bxs-star" />
                          <i className="bx bxs-star" />
                          <i className="bx bxs-star" />
                          <i className="bx bxs-star" />
                          <i className="bx bxs-star" />
                        </div>
                        <div className={Styles.category}>
                          {item.category.name}
                          <div className="colors">
                            <i className="bx bxs-circle blank" />
                            <i className="bx bxs-circle blue" />
                            <i className="bx bxs-circle brown" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div> */}
         
          <div className={`${Styles.seller} ${Styles.container}`}>
             <div className={Styles.flex}>
             <h1 id="sale">Flash Sales</h1>
              <FlaseSale/>
             </div>
            <div className={Styles.product_grid}>
              {products
                .filter((item) => item.discount > 0)
                .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                .map((item) => (
                  <Link href={`/products/t/${item.slug}`} key={item.slug}>
                    <div className={Styles.best_p1}>
                      <img src={item.img} alt="img" />
                      <div className={Styles.best_p1_txt}>
                        <div className={Styles.name}>
                          <p>{item.name}</p>
                        </div>
                        <div className={Styles.category}>
                          <p>{item.category.name}</p>
                        </div>
                        <div className={Styles.discount}>
                          <p><TagOutlined /> {item.discount}%</p>
                        </div>
                        <div className={Styles.rating}>
                          <i className={`${Styles.bx}  ${Styles.bxs_star}`} />
                          <i className={`${Styles.bx}  ${Styles.bxs_star}`} />
                          <i className={`${Styles.bx}  ${Styles.bxs_star}`} />
                          <i className={`${Styles.bx}  ${Styles.bxs_star}`} />
                          <i className={`${Styles.bx}  ${Styles.bxs_star}`} />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
            {totalPages > 1 && (
              <Pagination
                style={{ marginTop: "16px", textAlign: "center" }}
                current={currentPage}
                pageSize={pageSize}
                total={totalProduct}
                onChange={(page) => setCurrentPage(page)}
              />
            )}
          </div>

        </div>
        <div id="limited">
          <div className={Styles.news_heading}>
            <p>LATEST NEWS</p>
            <h1>Limited Edition</h1>
          </div>
          <div className={`${Styles.l_news}  ${Styles.container}`}>
            {products.map((item) => (
              item.stock <= 10 && (
                <div key={item._id} className={Styles.l_news1}>
                  <div className={Styles.news1_img}>
                    <img src={item.img} alt="img" />
                  </div>
                  <div className={Styles.news1_conte}>
                    <div className={Styles.date_news1}>
                      <p><i className={`${Styles.bx}  ${Styles.bxs_calendar}`} />{item.category.name}</p>
                      <h4>{item.name}</h4>
                      <a href={`/products/t/${item.slug}`} >More</a>
                    </div>
                  </div>
                </div>
              )))}

          </div>
        </div>
        <div id="contact">
          <div className={`${Styles.contact}  ${Styles.container}`}>
            <div className="map">
              <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d837.4903189925518!2d108.24469424552568!3d16.039739029733948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTbCsDAyJzIzLjAiTiAxMDjCsDE0JzQwLjIiRQ!5e1!3m2!1svi!2s!4v1684853146304!5m2!1svi!2s" width={600} height={450} style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
            <form className={Styles.flex_form}>
              <div className={Styles.form}>
                <div className={Styles.form_txt}>
                  <h2>INFORMATION</h2>
                  <h1>Contact Us</h1>
                  <span>👟 Featuring style and variety, YAME - Shoes for your style! 👟
                    <br />
                    Welcome to YAME - the premier shoe store for fashion and beauty lovers. We pride ourselves on being a place where you can find high-quality shoes that give you comfort and confidence every step of the way.</span>
                  <h3>Viet Nam</h3>
                  <p>K29 Ho Xuan Huong, Bac My An, Ngu Hanh Son, Da Nang<br />+84 337-219-023</p>
                </div>
              </div>
              <div class={Styles.form_details}>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  required
                  style={{ marginRight: "15px" }}
                ></input>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  required
                ></input>
                <textarea
                  name="message"
                  id="message"
                  cols="52"
                  rows="7"
                  placeholder="Message"
                  required
                ></textarea>
                <button>SEND MESSAGE</button>
              </div>
            </form>
          </div>
          
        </div>
      </div >
    </>
  );
}

export default Home;

export async function getStaticProps() {
  try {
    const suppliersResponse = await axiosClient.get("/suppliers");
    const productsResponse = await axiosClient.get("/products");

    const suppliers = suppliersResponse.data;
    const products = productsResponse.data.data;
    const total = productsResponse.data.total;

    return {
      props: {
        suppliers,
        products,
        total
      }
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
}
