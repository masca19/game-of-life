import React from 'react';
import ReactDOM from 'react-dom';
import './styles/common.scss';
import App from './pages/App/App';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer'

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <App />
    <Footer />
  </React.StrictMode>,
  document.getElementById('root')
);
