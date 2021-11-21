import './index.css';
import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { API_URL } from '../config/constants.js';
import { Carousel } from 'antd';
dayjs.extend(relativeTime);

function MainPage() {
  // 상품 정보를 받아오는 로직
  const [products, setProducts] = React.useState([]); // product가 업데이트 되면 다시 렌더링한다.
  const [banners, setBanners] = React.useState([]); // banner가 업데이트 되면 다시 렌더링한다.
  React.useEffect(function () {
    // useEffect 안에서 한번만 실행된다.
    axios
      .get(`${API_URL}/products`)
      .then(function (result) {
        const products = result.data.products;
        setProducts(products);
      })
      .catch(function (error) {
        console.error('에러 발생 :', error);
      });
    axios
      .get(`${API_URL}/banners`)
      .then((result) => {
        const banners = result.data.banners; // banners에 데이터가 들어간다
        setBanners(banners);
      })
      .catch((error) => {
        console.error('에러 발생');
      });
  }, []);

  return (
    <div>
      <Carousel autoplay autoplaySpeed={3000}>
        {banners.map((banner, index) => {
          //banners가 순회 됐을때 banner은 그 하나하나의 해당 객체이다.
          return (
            <Link to={banner.href}>
              <div id="banner">
                <img src={`${API_URL}/${banner.imageUrl}`} alt="배너" />
              </div>
            </Link>
          );
        })}
      </Carousel>
      <h1 id="product-headline">판매되는 상품들</h1>
      <div id="product-list">
        {products.map(function (product, index) {
          return (
            <div className="product-card">
              {
                product.soldout === 1 && <div className="product-blur" /> // 여기서 product는 위에서 map으로 순회하고 있는 product객체다.
              }
              <Link
                style={{ color: 'inherit' }}
                className="product-link"
                to={`/products/${product.id}`}>
                <div>
                  <img
                    className="product-img"
                    src={`${API_URL}/${product.imageUrl}`}
                    alt="상품 이미지"
                  />
                </div>
                <div className="product-contents">
                  <span className="product-name">{product.name}</span>
                  <span className="product-price">{product.price}원</span>
                  <div className="product-footer">
                    <div className="product-seller">
                      <img
                        className="product-avatar"
                        src="images/icons/avatar.png"
                        alt="아바타"
                      />
                      <span>{product.seller}</span>
                    </div>
                    <span className="product-date">
                      {dayjs(product.createdAt).fromNow()}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MainPage;
