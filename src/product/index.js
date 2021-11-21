import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './index.css';
import { API_URL } from '../config/constants';
import dayjs from 'dayjs';
import { Button, message } from 'antd';

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  // 상품의 정보를 받아오는 로직 getProduct
  const getProduct = () => {
    axios
      .get(`${API_URL}/products/${id}`)
      .then(function (result) {
        setProduct(result.data.product);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(function () {
    getProduct();
  }, []);

  if (product === null) {
    return <h1>상품 정보를 받고 있습니다...</h1>;
  }

  // 구매하기 버튼을 클릭했을 때 새로고침 (서버랑 통신하여 각 상품 정보를 받아오는 것)
  const onClickPurchase = () => {
    axios
      .post(`${API_URL}/purchase/${id}`)
      .then((result) => {
        message.info('구매가 완료되었습니다.');
        getProduct();
      })
      .catch((error) => {
        message.error(`에러가 발생했습니다. ${error.message}`);
      });
  };

  return (
    <div>
      <div id="image-box">
        <img
          src={`${API_URL}/${product.imageUrl}`}
          alt="서버에서 내려 받는 이미지"
        />
      </div>
      <div id="profile-box">
        <img src="/images/icons/avatar.png" alt="아바타 사진" />
        <span>{product.seller}</span>
      </div>
      <div id="contents-box">
        <div id="name">{product.name}</div>
        <div id="price">{product.price}원</div>
        <div id="createdAt">
          {dayjs(product.createdAt).format('YYYY년 MM월 DD일')}
        </div>
        <Button
          id="purchase-button"
          size="large"
          type="primary"
          danger
          onClick={onClickPurchase}
          disabled={product.soldout === 1}>
          재빨리 구매하기
        </Button>
        <pre id="description">{product.description}</pre>
      </div>
    </div>
  );
}

export default ProductPage;
