import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { MainContext } from '../../context/mainContext';

import { BsCart4 } from 'react-icons/bs';
import { IoIosLogIn } from 'react-icons/io';

export default function CartButton() {
  const { active, cart } = useContext(MainContext);

  const cartCounter = () => (
    <span className='cart-counter'>{cart.length}</span>
  );

  return (
    <div className='cart-button'>
      {active
        ? <Link to='/account/shop'>
          <button type='button'>
            <BsCart4 className='icon'/>
          </button>
          {cart.length > 0 && cartCounter()}
          <span>Cart</span></Link>
        : (
          <Link to='/auth/login'>
            <IoIosLogIn className='icon'/>
            <p>Login</p>
          </Link>
        )}
    </div>
  );
}
