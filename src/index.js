import React from 'react';
import ReactDOM from 'react-dom';
import './styles/common.scss';
import App from './pages/App/App';
import Header from './components/Header/Header';

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
