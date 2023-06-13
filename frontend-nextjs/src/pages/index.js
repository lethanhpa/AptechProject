import React from "react";
import Styles from "../styles/home.module.css"
import { Row } from 'antd';
import { TagOutlined } from '@ant-design/icons'
import axiosClient from "../libraries/axiosClient";

function Home(props) {
  const { suppliers } = props;
  const { products } = props;

  return (
    <>
      <div className={Styles.home}>
        <div id="home">
          <div className={Styles.home_page}>
            <div className={Styles.home_img}>
              <img src="https://static.nike.com/a/images/w_1423,c_limit/b05de187-a4ca-4f37-867b-b7f011d98cb6/nike-just-do-it.jpg" alt="img " />
            </div>
            <div className={Styles.home_txt}>
              <p className={Styles.collections}>SUMMER COLLECTION</p>
              <h2>SUMMER - AUTUMN<br />Collection 2023</h2>
              <div className={Styles.home_label}>
                <p>A specialist label creating luxury essentials. Ethically crafted<br />with an unwavering commitment to exceptional quality.</p>
              </div>
              <button><a href="#sellers">SHOP NOW</a><i className="bx bx-right-arrow-alt" /></button>
              <div className={Styles.home_social_icons}>
                <a href="#"><i className="bx bxl-facebook" /></a>
                <a href="#"><i className="bx bxl-twitter" /></a>
                <a href="#"><i className="bx bxl-pinterest" /></a>
                <a href="#"><i className="bx bxl-instagram" /></a>
              </div>
            </div>
          </div>
        </div>
        <div id="collection" className={Styles.collection}>
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
        <div id="sellers">
          <div className={`${Styles.container}  ${Styles.seller}`}>
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
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((item) => (
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
                      <div className={Styles.description}>
                        {item.description}
                        <div className="colors">
                          <i className="bx bxs-circle blank" />
                          <i className="bx bxs-circle blue" />
                          <i className="bx bxs-circle brown" />
                        </div>
                      </div>
                      <div className={Styles.buy_now}>
                        <button><a href={`/products/t/${item.slug}`}>Buy Now</a></button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

          </div>
          <div className={`${Styles.seller}  ${Styles.container}`}>
            <h2>Hot Sales</h2>
            <div className={Styles.best_seller}>
              {products.map((item) => (
                item.discount > 0 && (
                  <div key={item._id} className={Styles.best_p1}>
                    <img src={item.img} alt="img" />
                    <div className={Styles.best_p1_txt}>
                      <div className={Styles.name}>
                        <p>{item.name}</p>
                      </div>
                      <div className={Styles.description}>
                        <p>{item.description}</p>
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
                      <div className={Styles.buy_now}>
                        <button><a href={`/products/t/${item.slug}`}>Buy  Now</a></button>
                      </div>
                    </div>
                  </div>
                )))}
            </div>
          </div>
        </div>
        <div id="news">
          <div className={Styles.news_heading}>
            <p>LATEST NEWS</p>
            <h2>Limited Edition</h2>
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
                      <p><i className={`${Styles.bx}  ${Styles.bxs_calendar}`} />{item.description}</p>
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
            <form>
              <div className={Styles.form}>
                <div className={Styles.form_txt}>
                  <h4>INFORMATION</h4>
                  <h1>Contact Us</h1>
                  <span>As you might expect of a company that began as a high-end interiors contractor, we pay strict
                    attention.</span>
                  <h3>USA</h3>
                  <p>195 E Parker Square Dr, Parker, CO 801<br />+43 982-314-0958</p>
                  <h3>Viet Nam</h3>
                  <p>254 Nguyen Van Linh, Thach Gian, Thanh Khe, Da Nang<br />+84 337-219-023</p>
                </div>
                <div className={Styles.form_details}>
                  <input type="text" name="name" id="name" placeholder="Name" required />
                  <input type="email" name="email" id="email" placeholder="Email" required />
                  <textarea name="message" id="message" cols={52} rows={7} placeholder="Message" required defaultValue={""} />
                  <button>SEND MESSAGE</button>
                </div>
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
