import './index.css';
import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

function MainPage() {
  const [products, setProducts] = React.useState([]);
  React.useEffect(function () {
    axios
      .get(
        'https://c8f5db1f-8406-44a3-a2fb-c9a4ee313516.mock.pstmn.io/products'
      )
      .then(function (result) {
        const products = result.data.products;
        setProducts(products);
      })
      .catch(function (error) {
        console.error('에러 발생 :', error);
      });
  }, []);

  return (
    <div>
      <div id="banner">
        <img src="/images/banners/banner1.png" alt="배너" />
      </div>
      <h1>판매되는 상품들</h1>
      <div id="product-list">
        {products.map(function (product, index) {
          return (
            <div className="product-card">
              <Link
                style={{ color: 'inherit' }}
                className="product-link"
                to={`/products/${product.id}`}>
                <div>
                  <img
                    className="product-img"
                    src={product.imageUrl}
                    alt="상품 이미지"
                  />
                </div>
                <div className="product-contents">
                  <span className="product-name">{product.name}</span>
                  <span className="product-price">{product.price}원</span>
                  <div className="product-seller">
                    <img
                      className="product-avatar"
                      src="images/icons/avatar.png"
                      alt="아바타"
                    />
                    <span>{product.seller}</span>
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
