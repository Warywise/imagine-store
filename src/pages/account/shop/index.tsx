import React, { useContext, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';

import Header from '../../../components/header/Header';
import { MainContext } from '../../../context/mainContext';
import { UserContext } from '../../../context/userContext';

export default function Shop() {
  const [key, setKey] = useState('check');
  const { cart, setCart } = useContext(MainContext);
  const { user } = useContext(UserContext);

  const priceFormat = Intl.NumberFormat('BR', { style: 'currency', currency: 'BRL' });

  const totalPrice = () => cart.reduce((acc, cur) => {
    const price = cur.hasDiscount
      ? +(cur.price) - (+(cur.price) * +(cur.discountValue))
      : +(cur.price);
    return acc + price;
  }, 0);

  return (
    <div>
      <Header />
      <h2>Shopping</h2>
      <section className='shop-section'>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(key) => setKey(key as string)}
          className="mb-3"
        >
          <Tab eventKey="check" title="Check Products" className='shop-tab-item'>
            <strong className='text-danger'>Please, check the purchase prodcuts:</strong>
            <div>
              {}
            </div>
            <strong>Total Price:</strong>
            <p>{priceFormat.format(totalPrice())}</p>
          </Tab>
          <Tab eventKey="payment" title="Payment Method">
            {/*  */}
          </Tab>
          <Tab eventKey="confirmation" title="Purchase Confirmation" disabled>
            <h4 className='font-monospace text-danger mt-5'>
              Sorry for the inconvenience, we are under maintenance.
            </h4>
          </Tab>
        </Tabs>
      </section>
    </div>
  );
}
