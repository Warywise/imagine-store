import React, { createRef, useContext, useState } from 'react';
import { Button, Form, InputGroup, Tab, Tabs } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaRegCreditCard } from 'react-icons/fa';

import Header from '../../../components/header/Header';
import * as Validation from '../../../helpers/validations';
import { MainContext } from '../../../context/mainContext';
// import { UserContext } from '../../../context/userContext';
import PurchaseProducts from '../components/PurchaseProducts';
import FormInput from '../../auth/components/FormInput';

const INITIAL_CONDITION = {
  valid: false,
  invalid: false,
  msg: '',
};

export default function Shop() {
  const [key, setKey] = useState('check');

  const cardNumber = createRef<HTMLInputElement>();
  const [cardNumberCondition, setCardNumberCondition] = useState(INITIAL_CONDITION);
  const cardNumberValidation = (cardNumberValue: string) => {
    const cardNumberResult = Validation.cardNumberVerifier(cardNumberValue);
    if (cardNumberResult) {
      return setCardNumberCondition({
        valid: false, invalid: true, msg: cardNumberResult,
      });
    }

    setCardNumberCondition({ valid: true, invalid: false, msg: '' });
  };

  const cardName = createRef<HTMLInputElement>();
  const cardExpiration = createRef<HTMLInputElement>();
  const cardCVV = createRef<HTMLInputElement>();

  const { cart } = useContext(MainContext);
  // const { user } = useContext(UserContext);

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
      Your shopping cart is empty<hr />
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
          <Tab eventKey="payment" title="Payment Method" className='shop-tab-item'>
            <h5><strong className='text-muted'>
              Card Details:
            </strong></h5>
            <FormInput
              stateCondition={cardNumberCondition}
              validation={cardNumberValidation}
              reference={cardNumber}
              leftIcon={<FaRegCreditCard />}
              placeholder='Card Number'
              name='user'
            />
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Cardholder Name</InputGroup.Text>
              <Form.Control
                placeholder="Card Name"
                aria-label="card name"
                aria-describedby="basic-addon1"
                ref={cardName}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Expiration Date</InputGroup.Text>
              <Form.Control
                placeholder="Expiration Date"
                aria-label="expiration date"
                aria-describedby="basic-addon1"
                ref={cardExpiration}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">CVV</InputGroup.Text>
              <Form.Control
                aria-label="cvv"
                aria-describedby="basic-addon1"
                ref={cardCVV}
              />
            </InputGroup>

            <Button variant='btn btn-outline-warning' onClick={() => console.log(cardNumber.current?.value)} />

          </Tab>
          <Tab eventKey="confirmation" title="Purchase Confirmation" className='shop-tab-item' disabled>
            {/*  */}
          </Tab>
        </Tabs>
      </section>
    </div>
  );
}
