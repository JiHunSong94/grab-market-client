import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import { API_URL } from '../config/constants';
dayjs.extend(relativeTime);
dayjs.locale('ko');

function ProductCard(props) {
  // ProductCard에 props를 넣고
  const product = props.product; // product 함수에다가 부모에서 받아온 props를 넣는다.
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
                src="/images/icons/avatar.png"
                alt="아바타 이미지"
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
}

export default ProductCard;
