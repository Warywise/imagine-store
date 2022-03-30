import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import BSCarousel from 'react-bootstrap/Carousel';
import { RiHeartAddLine, RiHeartFill } from 'react-icons/ri';

import { MainContext } from '../context/mainContext';
import { ProductType } from '../interfaces/store';

import '../styles/productCard.scss';

export default function ProductCard(product: ProductType) {
  const {
    id, name, category, price, image, provider, discountValue, hasDiscount
  } = product;
  const { favorites, setFavorites } = useContext(MainContext);

  const navigateTo = useNavigate();
  const Location = useLocation();
  const redirect = () => {
    if (Location.pathname === '/favorites') return navigateTo(`/favorites/${id}`);
    return navigateTo(`/${id}`);
  };

  const verifyFavorites = () =>
    favorites.some((fav) => fav.name === name && fav.provider === provider);
  
  const handleFavorites = () => {
    if (verifyFavorites()) {
      const newFavorites = favorites
        .filter((fav) => (fav.name !== name || fav.provider !== provider));
      return setFavorites(newFavorites);
    }
    return setFavorites([...favorites, product]);
  };

  const discountPrice = +(price) - (+(price) * +(discountValue));
  const priceFormat = Intl.NumberFormat('BR', { style: 'currency', currency: 'BRL' });

  return (
    <div className='product-card'>
      {verifyFavorites()
        ? (<RiHeartFill
          onClick={handleFavorites}
          aria-label='remove from favorites'
          className='favorite-icon'
        />)
        : (<RiHeartAddLine
          onClick={handleFavorites}
          aria-label='add to favorites'
          className='favorite-icon'
        />)}
      <BSCarousel interval={null} fade className='card-carousel'>
        {image.map((img, ind) =>
          <BSCarousel.Item key={`${ind}${name}`} className='card-carousel-item'>
            <img src={img} alt={name} />
          </BSCarousel.Item>)}
      </BSCarousel>
      <div onClick={redirect}>
        <h5>{name}</h5>
        <p className='text-muted'>{category.name}</p>
        <hr />
        <p className='card-price'>{priceFormat.format(hasDiscount? discountPrice : +(price))}</p>
      </div>
    </div>
  );
}
