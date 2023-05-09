import React from 'react'
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation()
  return (
    <footer className="site-footer border-top">
      <div className="container">
        <div className="row" id='footer'>
          <div className="col-lg-3  mb-lg-0">
            <div className="row">
              <div className="col-md-12">
                <h3 className="footer-heading mb-4"> {t('content.Back to comity')}</h3>
              </div>
              <div className="col-md-6 col-lg">
                <ul className="list-unstyled">
                  <li>
                    <a href="/">{t('content.Recruiting Class')}</a>
                  </li>
                  <li>
                    <a href="/">{t('content.Contact Franchise')}</a>
                  </li>
                  <li>
                    <a href="/">{t('content.About MEN4MEN')}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-lg-3 mb-lg-0">
            <div className="row">
              <div className="col-md-12">
                <h3 className="footer-heading mb-4">{t('content.Support')}</h3>
              </div>
              <div className="col-md-6 col-lg">
                <ul className="list-unstyled">
                  <li>
                    <a href="/">{t('content.FAQs')}</a>
                  </li>
                  <li>
                    <a href="/">{t('content.Information security')}</a>
                  </li>
                  <li>
                    <a href="/">{t('content.General Policy')}</a>
                  </li>
                  <li>
                    <a href="/">{t('content.Order Lookup')}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="block-5">
              <h3 className="footer-heading mb-4">{t('content.Address')}</h3>
              <ul className="list-unstyled">
                <li className="address">
                  <a href=" https://goo.gl/maps/gviSv1m62iDQ8kub6">{t('content.Building P, Quang Trung Software Park, District 12, Ho Chi Minh City')}  </a>
                </li>
                <li className="phone">
                  <a>+84 389 927 803</a>
                </li>
                <li className="email">duantotnghiep@domain.com</li>
              </ul>
            </div>
          </div>
        </div>

        <br></br>
        <br></br>
        <div className="row text-center">
          <div className="col-md-12">
            <p>
            Copyright &copy;
              <script
                data-cfasync="false"
                src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></script>
             { t("content.All Rights Reserved") }  | { t("content.This Website Made") }  &#160;
              <i className="icon-heart" aria-hidden="true"></i>  By Team
              <a
                href="https://colorlib.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary">
                &#160; MEN4MEN
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}


export default Footer;