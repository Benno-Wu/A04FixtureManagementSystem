import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "./API"
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN'

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// 国际化
// https://ant.design/components/config-provider-cn/#components-config-provider-demo-prefixCls

// console.log(Api.registerUser())
// let test = async () => {
//   const aaa = await Api.registerUser() as ({ data: { a: any } })
//   console.log(aaa.data.a)
// }

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
