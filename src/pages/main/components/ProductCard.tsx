import React from 'react';
import BSCarousel from 'react-bootstrap/Carousel';

import { ProductType } from '../../../interfaces/store';

import '../styles/productCard.scss';

export default function ProductCard({
  id, name, category, price, description, image, material, provider, discountValue, hasDiscount
}: ProductType) {
  const discountPrice = +(price) - (+(price) * +(discountValue));
  const priceFormat = Intl.NumberFormat('BR', { style: 'currency', currency: 'BRL' });

  return (
    <div className='product-card'>
      <BSCarousel interval={null} fade className='card-carousel'>
        {image.map((img, ind) =>
          <BSCarousel.Item key={`${ind}${name}`} className='card-carousel-item'>
            <img src={img} alt={name} />
          </BSCarousel.Item>)}
      </BSCarousel>
      <div>
        <h5>{name}</h5>
        <p className='text-muted'>{category.name}</p>
        <hr />
        <p className='card-price'>{priceFormat.format(hasDiscount? discountPrice : +(price))}</p>
      </div>
    </div>
  );
}
