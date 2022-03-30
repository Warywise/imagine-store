import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';

import Header from '../../../components/header/Header';

export default function Shop() {
  const [key, setKey] = useState('check');

  return (
    <div>
      <Header />
      <h2>Shopping:</h2>
      <section className='account-section'>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(key) => setKey(key as string)}
          className="mb-3"
        >
          <Tab eventKey="check" title="Check Products" className='account-tab-item'>
            {/*  */}
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
