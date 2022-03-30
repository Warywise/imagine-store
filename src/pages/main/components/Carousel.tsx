import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import BSCarousel from 'react-bootstrap/Carousel';

import { StoreContext } from '../../../context/storeContext';

import '../styles/carousel.scss';

export default function Carousel() {
  const { allProducts } = useContext(StoreContext);

  const getProductsWithDiscount = () => allProducts
    .filter(({hasDiscount}) => hasDiscount);

  const getCarouselItems = () => getProductsWithDiscount().map((
    { image, id, name, price, discountValue }
  ) => {
    const discountPrice = +(price) - (+(price) * +(discountValue));
    const priceFormat = Intl.NumberFormat('BR', { style: 'currency', currency: 'BRL' });

    return (
      <BSCarousel.Item key={id} className='carousel-item'>
        <div className='carousel-item-content'>
          <img src={image[0]} alt={name}/>
          <div>
            <h5>{name}</h5>
            <p className='original-price'>{priceFormat.format(+(price))}</p>
            <p className='new-price'>{priceFormat.format(+(discountPrice))}</p>
            <Link to={`/${id}`} className='see-more-link'>
              {'>'}<span>See More!</span>{'<'}
            </Link>
          </div>
        </div>
      </BSCarousel.Item>
    );
  });

  return (
    <BSCarousel variant='dark' pause='hover' className='main-carousel'>
      { allProducts.length > 0 && getCarouselItems() }
    </BSCarousel>
  );
}
