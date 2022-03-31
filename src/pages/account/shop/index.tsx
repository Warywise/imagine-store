import React, { useContext, useState } from 'react';
import { Button, Tab, Tabs } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import Header from '../../../components/header/Header';
import { MainContext } from '../../../context/mainContext';
import { UserContext } from '../../../context/userContext';
import PurchaseProducts from '../components/PurchaseProducts';

export default function Shop() {
  const [key, setKey] = useState('check');
  const { cart } = useContext(MainContext);
  const { user } = useContext(UserContext);

  const navigateTo = useNavigate();

  const priceFormat = Intl.NumberFormat('BR', { style: 'currency', currency: 'BRL' });

  const totalPrice = () => cart.reduce((acc, cur) => {
    const price = cur.hasDiscount
      ? +(cur.price) - (+(cur.price) * +(cur.discountValue))
      : +(cur.price);
    return acc + price;
  }, 0);

  const dontHaveProducts = () => (
    <h5 className='text-info mt-5 bg-dark bg-gradient p-3'>
      Your shopping cart is empty<hr/>
      <Button variant='btn btn-outline-warning' onClick={() => navigateTo('/')}>
        Go Shop?
      </Button>
    </h5>
  );

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
            <h5><strong className='text-danger'>
              Please, check the purchase products:
            </strong></h5>
            <div className='purchase-products-box'>
              {cart.length > 0
                ? cart.map((prod) => <PurchaseProducts key={prod.id} {...prod} />)
                : dontHaveProducts()}
            </div>
            <strong>Total Price:</strong>
            <h5>{priceFormat.format(totalPrice())}</h5>
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
