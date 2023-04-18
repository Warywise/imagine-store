import React, { useContext, useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';

import Modal from 'react-bootstrap/Modal';
import BSCarousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import { CloseButton, Spinner } from 'react-bootstrap';

import { BsCart4 } from 'react-icons/bs';
import { IoIosLogIn } from 'react-icons/io';

import { StoreContext } from '../context/storeContext';
import { ProductType } from '../interfaces/store';
import { MainContext } from '../context/mainContext';

import '../styles/productDetail.scss';
import { axiosGetter } from '../helpers/axios';

export default function ProductDetail() {
  const { id } = useParams();
  const { products } = useContext(StoreContext);
  const { active, cart, setCart, favorites } = useContext(MainContext);
  const [product, setProduct] = useState({} as ProductType);

  const navigateTo = useNavigate();
  const Location = useLocation();
  const redirect = () => {
    if (Location.pathname.includes('/favorites')) return navigateTo('/favorites');
    return navigateTo('/');
  };

  const findProduct = () => (products ?? favorites)
    .find((prod) => prod.id === +(id as string)) as ProductType;

  const discountPrice = () => +(product.price) - (+(product.price) * +(product.discountValue));
  const priceFormat = Intl.NumberFormat('BR', { style: 'currency', currency: 'BRL' });

  const verifyCart = () => cart.some((prod) => prod.id === +(id as string));

  const handleCart = () => {
    if (verifyCart()) {
      const newCart = cart
        .filter((prod) => (prod.name !== product.name || prod.provider !== product.provider));
      return setCart(newCart);
    }
    return setCart([...cart, product]);
  };

  useEffect(() => {
    const prod = findProduct();
    if (prod) {
      setProduct(prod);
    } else {
      axiosGetter(`/products/${id}`)
        .then((res) => setProduct(res));
    }
  }, []);

  if (product && Object.keys(product).length) {
    console.log('Osh');
    return (
      <div className='product-details'>
        <Modal.Dialog className='product-modal'>
          <BSCarousel interval={null} fade variant='dark' className='product-modal-carousel'>
            {product.image.map((img, ind) => (
              <BSCarousel.Item key={ind} className='product-modal-carousel-item'>
                <img src={img} />
              </BSCarousel.Item>
            ))}
          </BSCarousel>
          <CloseButton onClick={redirect} className='product-close' />
          <Modal.Header className='product-modal-head'>
            <h4>{product.name}</h4>
            <h5 className='text-muted'>{product.category.name}</h5>
          </Modal.Header>

          <Modal.Body>
            <b>Price:</b>
            {product.hasDiscount
              ? (<><s className='text-muted'>{priceFormat.format(+(product.price))}</s>
                <p>{priceFormat.format(discountPrice())}</p></>)
              : (<p>{priceFormat.format(+(product.price))}</p>)}
            <b>Description:</b>
            <p>{product.description}</p>
            <b>Material:</b>
            <p>{product.material}</p>
            <b>Provider:</b>
            <p>{product.provider}</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={redirect}>Cancel</Button>
            {active
              ? < Button variant="success" className='product-detail-button' onClick={handleCart}>
                {verifyCart() ? 'Remove' : 'Add to cart'}<BsCart4 />
              </Button>
              : <Button className='product-detail-button' onClick={() => navigateTo('/auth/login')}>
                Login<IoIosLogIn />
              </Button>}
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    );
  }

  return (
    <div className='product-details'>
      <Modal.Dialog className='product-modal'>
        <CloseButton onClick={redirect} className='product-close' title='Close' />
        <Spinner animation='border' title='Loading...' className='loading' />
      </Modal.Dialog>
    </div>
  );
}
