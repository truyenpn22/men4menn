import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../context/user/UserContext'
import { useCart } from 'react-use-cart'
import { useTranslation } from 'react-i18next';
import PropTypes from "prop-types";
import { useToasts } from "react-toast-notifications";
import i18n from '../translations/i18n';


const Header = () => {
  
  const { t } = useTranslation()

  const navigate = useNavigate()
  const { addToast } = useToasts();

  const { totalUniqueItems, items } = useCart()

  // for user context
  const userContext = useContext(UserContext)
  const { logout, user } = userContext

  const logoutHandler = () => {

    logout(items, addToast, totalUniqueItems)

    // navigate('/login')
  }


  // eslint-disable-next-line no-undef
  ScrollOut({
    cssProps: true,
    threshold: 0.2
  });
  // const [selected, setSelected] = useState('');
//   const [tets, sTet] = useState("en")
//   // const [language, setLanguage] = useState('vi')
//   const changeLanguage = (e) =>{
//     sTet(e.target.value)
//     i18n.changeLanguage(e.target.value);
    
//   }
//   const [lang,sLang] = useState("")
// useEffect(() =>{
//     localStorage.setItem("lang", tets)
//  const ngonngu =  localStorage.getItem("lang",tets)
//  sLang(ngonngu)
// },[tets])

  const [language, setLanguage] = useState('en'); 

  useEffect(() => {
    const lang = localStorage.getItem('language');
    if (lang) {
      setLanguage(lang);
    }
  }, []);

  const changeLanguage = (event) => {
    const lang = event.target.value;
    i18n.changeLanguage(event.target.value);
    localStorage.setItem('language', lang);
    setLanguage(lang);
  };

  return (
    <header className="site-navbar" role="banner" data-scroll>
      <div className="site-navbar">
        <div className="container">
          <div className="row align-items-center">
            {/* <div className="col-12 mb-3 mb-md-0 col-md-4 order-1 order-md-2"> */ }
            <div className="logo">
              <a href='/'>
                <img src="images/logo6.png" alt="placeholder"></img>
              </a>
            </div>
            {/* </div> */ }
            <div className='dinh'>
              <nav className="site-navigation text-right text-md-center" role="navigation">
                <div className="container">
                  <ul className="site-menu js-clone-nav d-none d-md-block">
                  <li className="active">
                      <Link to="/">
                      {t('content.HOME')}
                      </Link>
                    </li>
                    <li>
                      <Link to="/shop">
                      {t('content.SHOP')}
                      </Link>
                    </li>
                    <li>
                      <Link to="/contact">
                      {t('content.CONTACT_US')}
                      </Link>
                    </li>
                    <span>
                      <ul>
                        { user && user.role === 'admin' && (
                          <li>
                            <Link to="/adminDashboard">
                              <i className='fas fa-user-cog'>&ensp;</i> 
                            </Link>
                          </li>
                        ) }
                        { user ? (
                          <>
                            <li>
                              <Link to="/profile">
                                <i className='fas fa-user-edit'>&ensp;</i>
                                { user.name }
                              </Link>
                            </li>
                            <li>
                              <Link to="/" onClick={ logoutHandler }>
                                <i className='fas fa-sign-in-alt'>&ensp;</i>
                                
                              </Link>
                            </li>
                          </>
                        ) : (
                          <>
                            <li>
                              <Link to="/login">
                                <i className="fas fa-sign-in-alt"> &ensp;</i>
                              </Link>
                            </li>
                            <li>
                              <Link to="/signup">
                                <i className="fas fa-user-plus">&ensp;</i>
                              </Link>
                            </li>
                          </>
                        ) }
                        <li>
                          <Link to="/cart" className="site-cart">

                            <div className="main-icon">
                              <a className="main-bag">
                                <i className="icon icon-shopping_cart" aria-hidden="true"></i>
                                { totalUniqueItems && totalUniqueItems > 0 ? (
                                  <span className="count-item" id="cart-total">{ totalUniqueItems }</span>
                                ) : (
                                  ''
                                ) }
                              </a>
                            </div>

                          </Link>
                        </li>
                      </ul>
                    </span>
                    
                  </ul>
                </div>
              </nav>
            </div>
            <div className="col-6 col-md-4 order-3 order-md-3 text-right">
              <div className="dropdown2">
              <div className="d-flex align-items-center">
                    <select className='btn btn-primary' onChange={changeLanguage} value={language}>
                        <option value="en">
                           {"ENGLISH"}
                        </option>
                        <option value="vi">
                        {"Tiếng Việt"}  
                        </option>
                    </select>
                </div>
                { user ? (
                  <>
                    <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">{t('content.Hello')}  { user.name }</button>
                  </>
                ) : (<button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">{t('content.Hello')}?</button>)
                }
                <ul className="dropdown-menu">
                  <ul>
                    { user && user.role === 'admin' && (
                      <li>
                        <Link to="/adminDashboard">
                          <i className='fas fa-user-cog'>&ensp;</i>{t('content.ADMIN_DASHBOARD')} 
                        </Link>
                      </li>
                    ) }
                    { user ? (
                      <>
                        <li>
                          <Link to="/profile">
                            <i className='fas fa-user-edit'>&ensp;</i>
                            { user.name }
                          </Link>
                        </li>
                        <li>
                          <Link to="/" onClick={ logoutHandler }>
                            <i className='fas fa-sign-in-alt'> &ensp;</i> 
                            {t('content.LOGOUT')}                     
                          </Link>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <Link to="/login">
                            <i className="fa fa-user"> &ensp;</i>{t('content.LOGIN')} 
                          </Link>
                        </li>
                        <li>
                          <Link to="/signup">
                            <i className="fas fa-user-plus">&ensp;</i>{t('content.SIGNUP')} 
                          </Link>
                        </li>
                      </>
                    ) }
                  </ul>
                </ul>
                <div className='box2'>
                  <Link to="/cart" className="site-cart">

                    <div className="main-icon">
                      <a className="main-bag">
                        <i className="icon icon-shopping_cart" aria-hidden="true"></i>
                        { totalUniqueItems && totalUniqueItems > 0 ? (
                          <span className="count-item" id="cart-total">{ totalUniqueItems }</span>
                        ) : (
                          ''
                        ) }
                      </a>
                    </div>


                    {/* <span className="icon icon-shopping_cart">&ensp;</span> */ }
                    {/* {totalUniqueItems && totalUniqueItems > 0 ? ( */ }
                    {/* // <span className="count">{totalUniqueItems}</span> */ }
                    {/* // ) : ( */ }
                    {/* // '' */ }
                    {/* // )} */ }
                  </Link>
                </div>
              </div>
            </div>
            <div className="site-top-icons">
              <span className='icon'>
                <li className="d-inline-block d-md-none ml-md-0">
                  <a href="/" className="site-menu-toggle js-menu-toggle">
                    <span className="icon-menu"></span>
                  </a>
                </li>
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;
