import './index.css';
import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { API_URL } from '../config/constants.js';
import { Carousel } from 'antd';
import 'dayjs/locale/ko';
import ProductCard from '../components/productsCard';

dayjs.extend(relativeTime);
dayjs.locale('ko');

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
            <ProductCard product={product} key={index} />
          ); /* products={product}는 props 설정 - 컴포넌트 자식에서 속성을 준다. - 자식 product에 부모 product 속성을 넣는다.
Product 컴포넌트의 집합을 관리하기 위해서 key를 넣어준다. 컴포넌트가 각각 나열될 때마다 서로 다른 key를 가지고 있다고 인지시켜주는 것. 성능의 최적화 된다.*/
        })}
      </div>
    </div>
  );
}

export default MainPage;
