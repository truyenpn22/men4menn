import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import CategoryState from './context/category/CategoryState'
import ProductState from './context/product/ProductState'
import BrandState from './context/brand/BrandState'
import UserState from './context/user/UserState'
import OrderState from './context/orders/OrderState'
import { BrowserRouter as Router } from 'react-router-dom'
import { CartProvider } from 'react-use-cart'
import { I18nextProvider } from 'react-i18next';
import i18n from './translations/i18n';

ReactDOM.render(
  <React.StrictMode>
  <I18nextProvider i18n={i18n}>

      <CartProvider>
        <Router>
          <UserState>
            <OrderState>
              <BrandState>
                <CategoryState>
                  <ProductState>
                    <App />
                  </ProductState>
                </CategoryState>
              </BrandState>
            </OrderState>
          </UserState>
        </Router>
      </CartProvider>
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
