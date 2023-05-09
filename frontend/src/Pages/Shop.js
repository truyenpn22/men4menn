import React, { useContext, useEffect, useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import Breadcrumb from "../components/Breadcrumb";
import CategoryContext from "../context/category/categoryContext";
import productContext from "../context/product/productContext";
import { useToasts } from "react-toast-notifications";
import { useTranslation } from 'react-i18next';

const Shop = () => {
  // for product context
  const { t } = useTranslation()
  const pContext = useContext(productContext);
  const { getProducts, products } = pContext;

  // for category context
  const cContext = useContext(CategoryContext);
  const { categories, getCategories } = cContext;
  const { addItem } = useCart();
  const { addToast } = useToasts();

  const [skip, setSkip] = useState(0);
  const [keyWord, setKeyWord] = useState("");
  const [category, setCategory] = useState("");
  const [totalResults, setTotalResults] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const limit = 6;

  useEffect(() => {
    const populateProducts = async () => {
      setTotalResults(await getProducts(limit, skip, keyWord, category));
    };
    populateProducts();
    getCategories();
    // eslint-disable-next-line
  }, [skip, limit, category]);
  const [data, setData] = useState([]);

  const [sortType, setSortType] = useState();
  useEffect(() => {
    const sortArray = (type) => {
      const sorted = products;

      if (type === "priceHighToLow") {
        sorted.sort((a, b) => b.price - a.price);
      }
      if (type === "priceLowToHigh") {
        sorted.sort((a, b) => a.price - b.price);
      }
      setData([...sorted]);
    };

    sortArray(sortType);
  }, [sortType]);

  const handleChange = (e) => {
    setKeyWord(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSkip(0);
    setCategory("");
    const populateProducts = async () => {
      setTotalResults(await getProducts(limit, skip, keyWord, category));
    };
    populateProducts();
  };

  const handlePreviousClick = async () => {
    if (skip > 0) {
      setSkip(skip - limit);
    }
  };

  const handleNextClick = async () => {
    setSkip(skip + limit);
  };

  const formatter = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "VND",
  });
  const [price, setPrice] = useState(0);

  return (
    <>
      <Breadcrumb pageName="Shop" />
      <div className="site-section-shop">
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-9 order-2">
              <div className="row">
                <div className="col-md-12 mb-5 d-flex justify-content-between" id="rowshop">
                  <div className=" col-md-6 float-md-left mb-4">
                    <h2 className="text-black h5">{t('content.Price_filter')}</h2>
                    <select onChange={ (e) => setSortType(e.target.value) }>
                      <option disabled value="default">
                      {t('content.Sort_price')}
                      </option>
                      <option value="priceHighToLow">
                      {t('content.price_HighToLow')}
                      </option>
                      <option value="priceLowToHigh">
                      {t('content.price_LowToHigh')}
                      </option>
                    </select>
                  </div>
                  <div className="col-md-6 " id="search">
                    <Form className="d-flex" onSubmit={ handleSearchSubmit }>
                      <FormControl
                        type="search"
                        placeholder={t('content.search_products')}
                        className="me-2 "
                        aria-label="Search"
                        size="sm"
                        value={ keyWord }
                        onChange={ handleChange }
                      />

                      <button type="submit" className="btn btn-secondary ">
                      {t('content.search')}
                      </button>
                    </Form>
                  </div>
                </div>
              </div>
              { products?.length ? (
                <div className="row mb-5" id="shopproducts">
                  { products.filter((filterProduct) => {
                    return filterProduct.price >= parseInt(price, 10);
                  }).map((product) => (
                    <div
                      className="col-sm-6 col-lg-4 mb-4"
                      data-aos="fade-up"
                      key={ product._id }
                    >
                      <div className="block-4 text-center border">

                        <div className="product-img">
                          <Link to={ `/shopSingle/${product._id}` }>
                            <img src={ product.image } alt="" />
                          </Link>
                          <div>
                            <button className="icon btn" onClick={ () => {
                              let item = { ...product, id: product._id, };
                              if (addToast) {
                                addToast(`${t('content.Added to cart')}`, { appearance: "success", autoDismiss: true });
                              }
                              addItem(item, quantity);
                            } }
                              disabled={ product.Stock <= 0 } >{ product.Stock <= 0 ? `${t('content.Out_of_stock')}` : `${t('content.add_to_cart')}` }
                            </button>
                          </div>
                        </div>
                        <div className="block-4-text p-4">
                          <p id="name"><Link to={ `/shopSingle/${product._id}` }>{ product.name }</Link>
                          </p>
                          <p id="price">{ formatter.format(product.price) }</p>
                        </div>
                      </div>
                    </div>
                  )) }
                </div>
              ) : (

                <div className="col-md-12 text-center">
                  <img className="text-center" src="https://bizweb.dktcdn.net/100/333/755/themes/688335/assets/empty_cart.png?1647314197820" alt="" />
                  <h2> {t('content.No_products')}</h2>
                </div>

              ) }
              <div className="row" data-aos="fade-up">
                <div className="col-md-12 text-center">
                  <div className="d-flex justify-content-between align-items-center my-3">
                    <Button
                      variant="success"
                      size="sm"
                      onClick={ handlePreviousClick }
                      disabled={ skip < 1 }
                    >
                      &larr; {t('content.Before')}
                    </Button>
                    <div className="text-center mx-2">
                    {t('content.Page')} { skip / limit + 1 }
                    </div>

                    <Button
                      variant="success"
                      size="sm"
                      onClick={ handleNextClick }
                      disabled={ totalResults - skip <= limit }
                    >
                      {t('content.After')} &rarr;
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-3 order-1 mb-5 mb-md-0">
              <div className="border p-4 rounded mb-4">
                <section id="sidebar">
                  <div className="py-2 border-bottom ml-3">
                    <h6 className="font-weight-bold">{t('content.Category')} </h6>
                    <div id="orange"><span className="fa fa-minus"></span></div>
                    <form>
                      <div className="form-group">
                        <input type="radio" id="male" className="radio-input" name="gender" onClick={ () => { setCategory(''); setSkip(0) } } />
                        <label for="male" className="radio-label">  All</label>
                      </div>
                      { categories.map((cate) => (
                        <div className="form-group">
                          <input type="radio" id="fmale" className="radio-input" name="gender" onClick={ () => { setCategory(cate._id); setSkip(0); } } />
                          <label for="fmale" className="radio-label">{ cate.title }</label>
                        </div>
                      )) }
                    </form>
                  </div>
                </section>
                <br></br>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;