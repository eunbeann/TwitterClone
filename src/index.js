import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'components/App';
import fbase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// 출처: https://gallery-k.tistory.com/259 [Gallery-K:티스토리]
import "./styles.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // 콘솔로그 두 번 찍히는 거 끄기
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);
