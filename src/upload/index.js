import {
  Form,
  Divider,
  Input,
  InputNumber,
  Button,
  Upload,
  message,
} from 'antd';
import './index.css';
import { useState } from 'react';
import { API_URL } from '../config/constants.js';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function UploadPage() {
  const [imageUrl, setImageUrl] = useState(null); // imageUrl의 기본값으로 null. "순서" 이미지를 업로드 하였을 때 밑에 onChage함수가 불리면서 콜백에 들어간 인자 'info'를 이용해서 state를 업데이트 시켜준다.
  const history = useHistory(); //react 훅?

  const onSubmit = (values) => {
    // values를 활용해서 상품정보를 node 서버에 올린다.
    axios
      .post(`${API_URL}/products`, {
        name: values.name,
        description: values.description,
        seller: values.seller,
        price: parseInt(values.price), // 내장함수 parseInt를 쓰면 문자열로 된 것을 숫자로 바꿔준다.
        imageUrl: imageUrl, // imageUrl은 위 함수 state에서 가져오는 것이다.
      })
      .then((result) => {
        console.log(result);
        history.replace('/'); //history.push를 하게 되면 이전페이지로 간다. replace를 하게 되면 이전 페이지의 기록이 사라진다. 1번페이지, 2번페이지, 3번페이지 보고 replace를 하면 1번페이지로 간다.
      })
      .catch((error) => {
        console.error(error);
        message.error(`에러가 발생했습니다. ${error.message}`);
      });
  };
  const onChangeImage = (info) => {
    if (info.file.status === 'uploading') {
      return; // 업로드 페이지에서 파일업로드 버튼을 누르면 호출이 된다. 파일을 업로드해서 네트워트 요청이 끝날때까지의 상태(status)는 uploading이다.
    }
    if (info.file.status === 'done') {
      const response = info.file.response;
      const imageUrl = response.imageUrl;
      setImageUrl(imageUrl); // 이미지를 받아서 상태(status)가 done이 되었을 때 setImageUrl로 imageUrl을 넣겠다.
    }
  };
  return (
    <div id="upload-container">
      <Form name="상품 업로드" onFinish={onSubmit}>
        <Form.Item
          name="upload"
          label={<div className="upload-label">상품 사진</div>}>
          <Upload
            name="image" // postman에서 key의 값
            action={`${API_URL}/image`} // 이미지를 여기로 보낸다(주소)
            listType="picture"
            showUploadList={false} // default값은 업로드 이미지를 확인 할 수 있는데 그거 말고 추가적으로 다른 이미지를 보여준다. 이 속성을 없앤다.
            onChange={onChangeImage}>
            {imageUrl ? ( // 삼항연산자는 세 개의 피연신자를 취할 수 있는 연산자. 맨 앞에 조건문이 들어가고, 그 뒤로 물음표(?)와 조건이 참이라면 실행할 식의 물음표 뒤로 들어간다. 바로 뒤로 콜론(:)이 들어가며 조건이 거짓이라면 실행할 식이 마지막에 들어간다.
              <img id="upload-img" src={`${API_URL}/${imageUrl}`} />
            ) : (
              <div id="upload-img-placeholder">
                <img src="/images/icons/camera.png" alt="이미지 업로드 요청" />
                <span>이미지를 업로드해주세요.</span>
              </div>
            )}
          </Upload>
        </Form.Item>
        <Divider />
        <Form.Item
          label={<div className="upload-label">판매자 명</div>}
          name="seller"
          rules={[{ required: true, message: '판매자 이름을 입력해주세요' }]}>
          <Input
            className="upload-name"
            size="large"
            placeholder="이름을 입력해주세요."
          />
        </Form.Item>
        <Divider />
        <Form.Item
          name="name"
          label={<div className="upload-label">상품 이름</div>}
          rules={[{ required: true, message: '상품 이름을 입력해주세요' }]}>
          <Input
            className="upload-name"
            size="large"
            placeholder="상품 이름을 입력해 주세요"
          />
        </Form.Item>
        <Divider />
        <Form.Item
          name="price"
          label={<div className="upload-label">상품 가격</div>}
          rules={[{ required: true, message: '상품 가격을 입력해 주세요' }]}>
          <InputNumber defaultValue={0} className="upload-price" size="large" />
        </Form.Item>
        <Divider />
        <Form.Item
          name="description"
          label={<div className="upload-label">상품 소개</div>}
          rules={[{ required: true, message: '상품 소개를 입력해주세요' }]}>
          <Input.TextArea
            size="large"
            id="product-description"
            showCount
            maxLength={300}
            placeholder="상품 소개를 적어주세요."
          />
        </Form.Item>
        <Form.Item>
          <Button id="submit-botton" size="large" htmlType="submit">
            상품 등록하기
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default UploadPage;
