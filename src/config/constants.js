export const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://jihun-market-server.herokuapp.com'
    : 'http://localhost:8080';
/* 삼항 연산자
우리 컴퓨터에서 돌릴 때(테스트)는 development 값이 들어가고 - localhost
 클라우드에서 돌아갈 때는 'production'값이 들어간다. - heroku */
