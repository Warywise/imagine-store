import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { MainContext } from '../../context/mainContext';

import { BsCart4 } from 'react-icons/bs';
import { IoIosLogIn } from 'react-icons/io';

export default function CartButton() {
  const { active } = useContext(MainContext);
  return (
    <div className='cart-button'>
      {active
        ? <Link to='/'>
          <button type='button'>
            <BsCart4 className='icon'/>
          </button>
          <span>Cart</span></Link>
        : (
          <Link to='auth/signin'>
            <IoIosLogIn className='icon'/>
            <p>Login</p>
          </Link>
        )}
    </div>
  );
}
