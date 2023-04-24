import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import BSCarousel from 'react-bootstrap/Carousel';
import LoadingIndicator from 'react-bootstrap/Spinner';

import '../styles/carousel.scss';
import { fetcherGet } from '../../../helpers/axios';
import { ProductType } from '../../../interfaces/store';

export default function Carousel() {
  const [products, setProducts] = useState([] as ProductType[]);
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    const response = await fetcherGet('/products/query', { hasDiscount: true, take: 10, skip: 0, orderBy: { price: 'asc' } });
    setProducts(response?.products || []);
    setLoading(false);
  };

  const getCarouselItems = () => products.map((
    { image, id, name, price, discountValue }
  ) => {
    const discountPrice = +(price) - (+(price) * +(discountValue));
    const priceFormat = Intl.NumberFormat('BRL', { style: 'currency', currency: 'BRL' });

    return (
      <BSCarousel.Item key={id} className='carousel-item'>
        <div className='carousel-item-content'>
          <img src={image[0]} alt={name} />
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

  useEffect(() => { getProducts(); }, []);

  if (!products.length && !loading) return <></>;

  return (
    <BSCarousel variant='dark' pause='hover' className='main-carousel'>
      {products.length ?
        getCarouselItems()
        : (
          <div className='loading-indicator'>
            <LoadingIndicator animation='border' variant='secondary' />
            <LoadingIndicator animation='grow' variant='light' />
          </div>)}
    </BSCarousel>
  );
}
