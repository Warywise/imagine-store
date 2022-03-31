import React, { useContext } from 'react';
import BSCarousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';

import { MainContext } from '../../../context/mainContext';
import { ProductType } from '../../../interfaces/store';

export default function PurchaseProducts(props: ProductType) {
  const {
    name, price, hasDiscount, discountValue, category, provider, image
  } = props;

  const { cart, setCart } = useContext(MainContext);

  const priceFormat = Intl.NumberFormat('BR', { style: 'currency', currency: 'BRL' });

  const prodPrice = hasDiscount
    ? +(price) - (+(price) * +(discountValue))
    : +(price);

  const handleCart = () => {
    const newCart = cart
      .filter((prod) => (prod.name !== name || prod.provider !== provider));
    return setCart(newCart);
  };

  return (
    <div className='purchase-product'>
      <BSCarousel className='purchase-carousel' fade interval={null} variant='dark'>
        {image.map((img, ind) => (
          <BSCarousel.Item key={ind}>
            <img src={img} alt={name}/>
          </BSCarousel.Item>
        ))}
      </BSCarousel>
      <div className='purchase-product-content'>
        <h3>{name}</h3>
        <h4 className='text-muted'>{category.name}</h4>
        <hr />
        <b>Provider:</b>
        <p>{provider}</p>
        <b>Price:</b>
        <p>{priceFormat.format(prodPrice)}</p>
        <Button variant='btn btn-outline-danger' onClick={handleCart}>
          Delete From Cart
        </Button>
      </div>
    </div>
  );
}
