import React from "react";
import Styles from "../styles/home.module.css"
import { Row, Col } from 'antd';
import axiosClient from "../libraries/axiosClient";

function Home(props) {
  const { suppliers } = props;

  return (
    <>
      <div className={Styles.home}>
        <section id="home">
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
        </section>
        <section id="collection" className={Styles.collection}>
          {suppliers.map((item) => (
            <Row>
              <div className={`${Styles.container}  ${Styles.collections}`}>
                <div className={Styles.content}>
                  <img src={item.img} alt="img" />
                  <div className={Styles.img_content}>
                    <p>{item.name}</p>
                    <button><a href="#sellers">SHOP NOW</a></button>
                  </div>
                </div>
              </div>
            </Row>
          ))
          }
        </section>
        <section id="sellers">
          <div className={`${Styles.seller}  ${Styles.container}`}>
            <h2>Top Sales</h2>
            <div className={Styles.best_seller}>
              <div className={Styles.best_p1}>
                <img src="https://i.postimg.cc/8CmBZH5N/shoes.webp" alt="img" />
                <div className={Styles.best_p1_txt}>
                  <div className={Styles.name_of_p}>
                    <p>PS England Shoes</p>
                  </div>
                  <div className={Styles.rating}>
                    <i className={`${Styles.bx}  ${Styles.bxs_star}`} />
                    <i className={`${Styles.bx}  ${Styles.bxs_star}`} />
                    <i className={`${Styles.bx}  ${Styles.bxs_star}`} />
                    <i className={`${Styles.bx}  ${Styles.bx_star}`} />
                    <i className={`${Styles.bx}  ${Styles.bx_star}`} />
                  </div>
                  <div className={Styles.price}>
                    $37.24
                    <div className="colors">
                      <i className="bx bxs-circle red" />
                      <i className="bx bxs-circle blue" />
                      <i className="bx bxs-circle white" />
                    </div>
                  </div>
                  <div className={Styles.buy_now}>
                    <button><a href="https://codepen.io/sanketbodke/full/mdprZOq">Buy  Now</a></button>
                  </div>
                </div>
              </div>
              <div className={Styles.best_p1}>
                <img src="https://i.postimg.cc/76X9ZV8m/Screenshot_from_2022-06-03_18-45-12.png" alt="img" />
                <div className={Styles.best_p1_txt}>
                  <div className={Styles.name_of_p}>
                    <p>PS England Jacket</p>
                  </div>
                  <div className={Styles.rating}>
                    <i className="bx bxs-star" />
                    <i className="bx bxs-star" />
                    <i className="bx bx-star" />
                    <i className="bx bx-star" />
                    <i className="bx bx-star" />
                  </div>
                  <div className={Styles.price}>
                    $17.24
                    <div className="colors">
                      <i className="bx bxs-circle green" />
                      <i className="bx bxs-circle grey" />
                      <i className="bx bxs-circle brown" />
                    </div>
                  </div>
                  <div className={Styles.buy_now}>
                    <button><a href="https://codepen.io/sanketbodke/full/mdprZOq">Buy  Now</a></button>
                  </div>
                </div>
              </div>
              <div className={Styles.best_p1}>
                <img src="https://i.postimg.cc/j2FhzSjf/bs2.png" alt="img" />
                <div className={Styles.best_p1_txt}>
                  <div className={Styles.name_of_p}>
                    <p>PS England Shirt</p>
                  </div>
                  <div className={Styles.rating}>
                    <i className="bx bxs-star" />
                    <i className="bx bxs-star" />
                    <i className="bx bxs-star" />
                    <i className="bx bxs-star" />
                    <i className="bx bx-star" />
                  </div>
                  <div className={Styles.price}>
                    $27.24
                    <div className="colors">
                      <i className="bx bxs-circle brown" />
                      <i className="bx bxs-circle green" />
                      <i className="bx bxs-circle blue" />
                    </div>
                  </div>
                  <div className={Styles.buy_now}>
                    <button><a href="https://codepen.io/sanketbodke/full/mdprZOq">Buy  Now</a></button>
                  </div>
                </div>
              </div>
              <div className={Styles.best_p1}>
                <img src="https://i.postimg.cc/QtjSDzPF/bs3.png" alt="img" />
                <div className={Styles.best_p1_txt}>
                  <div className={Styles.name_of_p}>
                    <p>PS England Shoes</p>
                  </div>
                  <div className="rating">
                    <i className="bx bxs-star" />
                    <i className="bx bxs-star" />
                    <i className="bx bxs-star" />
                    <i className="bx bxs-star" />
                    <i className="bx bxs-star" />
                  </div>
                  <div className={Styles.price}>
                    $43.67
                    <div className="colors">
                      <i className="bx bxs-circle red" />
                      <i className="bx bxs-circle grey" />
                      <i className="bx bxs-circle blue" />
                    </div>
                  </div>
                  <div className={Styles.buy_now}>
                    <button><a href="https://codepen.io/sanketbodke/full/mdprZOq">Buy  Now</a></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`${Styles.container}  ${Styles.seller}`}>
            <h2>New Arrivals</h2>
            <div className={Styles.best_seller}>
              <div className={Styles.best_p1}>
                <img src="https://i.postimg.cc/fbnB2yfj/na1.png" alt="img" />
                <div className={Styles.best_p1_txt}>
                  <div className={Styles.name_of_p}>
                    <p>PS England T-Shirt</p>
                  </div>
                  <div className="rating">
                    <i className="bx bxs-star" />
                    <i className="bx bxs-star" />
                    <i className="bx bxs-star" />
                    <i className="bx bxs-star" />
                    <i className="bx bxs-star" />
                  </div>
                  <div className={Styles.price}>
                    $10.23
                    <div className="colors">
                      <i className="bx bxs-circle blank" />
                      <i className="bx bxs-circle blue" />
                      <i className="bx bxs-circle brown" />
                    </div>
                  </div>
                  <div className={Styles.buy_now}>
                    <button><a href="https://codepen.io/sanketbodke/full/mdprZOq">Buy  Now</a></button>
                  </div>
                </div>
              </div>
              <div className={Styles.best_p1}>
                <img src="https://i.postimg.cc/zD02zJq8/na2.png" alt="img" />
                <div className={Styles.best_p1_txt}>
                  <div className={Styles.name_of_p}>
                    <p>PS England Bag</p>
                  </div>
                  <div className="rating">
                    <i className="bx bxs-star" />
                    <i className="bx bx-star" />
                    <i className="bx bx-star" />
                    <i className="bx bx-star" />
                    <i className="bx bx-star" />
                  </div>
                  <div className={Styles.price}>
                    $09.28
                    <div className="colors">
                      <i className="bx bxs-circle brown" />
                      <i className="bx bxs-circle red" />
                      <i className="bx bxs-circle green" />
                    </div>
                  </div>
                  <div className={Styles.buy_now}>
                    <button><a href="https://codepen.io/sanketbodke/full/mdprZOq">Buy  Now</a></button>
                  </div>
                </div>
              </div>
              <div className={Styles.best_p1}>
                <img src="https://i.postimg.cc/Dfj5VBcz/sunglasses1.jpg" alt="img" />
                <div className={Styles.best_p1_txt}>
                  <div className={Styles.name_of_p}>
                    <p>PS England Sunglass</p>
                  </div>
                  <div className="rating">
                    <i className="bx bxs-star" />
                    <i className="bx bxs-star" />
                    <i className="bx bxs-star" />
                    <i className="bx bxs-star" />
                    <i className="bx bxs-star" />
                  </div>
                  <div className={Styles.price}>
                    $06.24
                    <div className="colors">
                      <i className="bx bxs-circle grey" />
                      <i className="bx bxs-circle blank" />
                      <i className="bx bxs-circle blank" />
                    </div>
                  </div>
                  <div className={Styles.buy_now}>
                    <button><a href="https://codepen.io/sanketbodke/full/mdprZOq">Buy  Now</a></button>
                  </div>
                </div>
              </div>
              <div className={Styles.best_p1}>
                <img src="https://i.postimg.cc/FszW12Kc/na4.png" alt="img" />
                <div className={Styles.best_p1_txt}>
                  <div className={Styles.name_of_p}>
                    <p>PS England Shoes</p>
                  </div>
                  <div className="rating">
                    <i className="bx bxs-star" />
                    <i className="bx bxs-star" />
                    <i className="bx bxs-star" />
                    <i className="bx bxs-star" />
                    <i className="bx bxs-star" />
                  </div>
                  <div className={Styles.price}>
                    $43.67
                    <div className="colors">
                      <i className="bx bxs-circle grey" />
                      <i className="bx bxs-circle red" />
                      <i className="bx bxs-circle blue" />
                    </div>
                  </div>
                  <div className={Styles.buy_now}>
                    <button><a href="https://codepen.io/sanketbodke/full/mdprZOq">Buy  Now</a></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`${Styles.seller}  ${Styles.container}`}>
            <h2>Hot Sales</h2>
            <div className={Styles.best_seller}>
              <div className={Styles.best_p1}>
                <img src="https://i.postimg.cc/jS7pSQLf/na4.png" alt="img" />
                <div className={Styles.best_p1_txt}>
                  <div className={Styles.name_of_p}>
                    <p>PS England Shoes</p>
                  </div>
                  <div className={Styles.rating}>
                    <i className={`${Styles.bx}  ${Styles.bxs_star}`} />
                    <i className={`${Styles.bx}  ${Styles.bxs_star}`} />
                    <i className={`${Styles.bx}  ${Styles.bxs_star}`} />
                    <i className={`${Styles.bx}  ${Styles.bxs_star}`} />
                    <i className={`${Styles.bx}  ${Styles.bxs_star}`} />
                  </div>
                  <div className={Styles.price}>
                    $37.24
                    <div className="colors">
                      <i className="bx bxs-circle grey" />
                      <i className="bx bxs-circle black" />
                      <i className="bx bxs-circle blue" />
                    </div>
                  </div>
                  <div className={Styles.buy_now}>
                    <button><a href="https://codepen.io/sanketbodke/full/mdprZOq">Buy  Now</a></button>
                  </div>
                </div>
              </div>
              <div className={Styles.best_p1}>
                <img src="https://i.postimg.cc/fbnB2yfj/na1.png" alt="img" />
                <div className={Styles.best_p1_txt}>
                  <div className={Styles.name_of_p}>
                    <p>PS England T-Shirt</p>
                  </div>
                  <div className="rating">
                    <i className="bx bxs-star" />
                    <i className="bx bxs-star" />
                    <i className="bx bxs-star" />
                    <i className="bx bxs-star" />
                    <i className="bx bxs-star" />
                  </div>
                  <div className={Styles.price}>
                    $10.23
                    <div className="colors">
                      <i className="bx bxs-circle blank" />
                      <i className="bx bxs-circle blue" />
                      <i className="bx bxs-circle brown" />
                    </div>
                  </div>
                  <div className={Styles.buy_now}>
                    <button><a href="https://codepen.io/sanketbodke/full/mdprZOq">Buy  Now</a></button>
                  </div>
                </div>
              </div>
              <div className={Styles.best_p1}>
                <img src="https://i.postimg.cc/RhVP7YQk/hs1.png" alt="img" />
                <div className={Styles.best_p1_txt}>
                  <div className={Styles.name_of_p}>
                    <p>PS England T-Shirt</p>
                  </div>
                  <div className="rating">
                    <i className="bx bxs-star" />
                    <i className="bx bxs-star" />
                    <i className="bx bxs-star" />
                    <i className="bx bxs-star" />
                    <i className="bx bxs-star" />
                  </div>
                  <div className={Styles.price}>
                    $15.24
                    <div className="colors">
                      <i className="bx bxs-circle blank" />
                      <i className="bx bxs-circle red" />
                      <i className="bx bxs-circle blue" />
                    </div>
                  </div>
                  <div className={Styles.buy_now}>
                    <button><a href="https://codepen.io/sanketbodke/full/mdprZOq">Buy  Now</a></button>
                  </div>
                </div>
              </div>
              <div className={Styles.best_p1}>
                <img src="https://i.postimg.cc/zD02zJq8/na2.png" alt="img" />
                <div className={Styles.best_p1_txt}>
                  <div className={Styles.name_of_p}>
                    <p>PS England Bag</p>
                  </div>
                  <div className="rating">
                    <i className="bx bxs-star" />
                    <i className="bx bx-star" />
                    <i className="bx bx-star" />
                    <i className="bx bx-star" />
                    <i className="bx bx-star" />
                  </div>
                  <div className={Styles.price}>
                    $09.28
                    <div className="colors">
                      <i className="bx bxs-circle blank" />
                      <i className="bx bxs-circle grey" />
                      <i className="bx bxs-circle brown" />
                    </div>
                  </div>
                  <div className={Styles.buy_now}>
                    <button><a href="https://codepen.io/sanketbodke/full/mdprZOq">Buy  Now</a></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="news">
          <div className={Styles.news_heading}>
            <p>LATEST NEWS</p>
            <h2>Fashion New Trends</h2>
          </div>
          <div className={`${Styles.l_news}  ${Styles.container}`}>
            <div className={Styles.l_news1}>
              <div className={Styles.news1_img}>
                <img src="https://i.postimg.cc/2y6wbZCm/news1.jpg" alt="img" />
              </div>
              <div className={Styles.news1_conte}>
                <div className={Styles.date_news1}>
                  <p><i className={`${Styles.bx}  ${Styles.bxs_calendar}`} /> 12 February 2022</p>
                  <h4>What Curling Irons Are The Best Ones</h4>
                  <a href="https://www.vogue.com/article/best-curling-irons" target="_blank">read more</a>
                </div>
              </div>
            </div>
            <div className={Styles.l_news2}>
              <div className={Styles.news2_img}>
                <img src="https://i.postimg.cc/9MXPK7RT/news2.jpg" alt="img" />
              </div>
              <div className={Styles.news2_conte}>
                <div className={Styles.date_news2}>
                  <p><i className="bx bxs-calendar" /> 17 February 2022</p>
                  <h4>The Health Benefits Of Sunglasses</h4>
                  <a href="https://www.rivieraopticare.com/blog/314864-the-health-benefits-of-wearing-sunglasses_2/" target="_blank">read more</a>
                </div>
              </div>
            </div>
            <div className={Styles.l_news3}>
              <div className={Styles.news3_img}>
                <img src="https://i.postimg.cc/x1KKdRLM/news3.jpg" alt="img" />
              </div>
              <div className={Styles.news3_conte}>
                <div className={Styles.date_news3}>
                  <p><i className="bx bxs-calendar" /> 26 February 202</p>
                  <h4>Eternity Bands Do Last Forever</h4>
                  <a href="https://www.briangavindiamonds.com/news/eternity-bands-symbolize-love-that-lasts-forever/" target="_blank">read more</a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="contact">
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
        </section>
      </div>
    </>
  );
}

export default Home;

export async function getStaticProps() {
  try {
    const response = await axiosClient.get("/suppliers");

    return {
      props: {
        suppliers: response.data
      },

    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}