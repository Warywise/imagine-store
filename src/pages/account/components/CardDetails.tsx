import React, { createRef, useState } from 'react';
import { FaRegAddressCard, FaRegCalendarAlt, FaRegCreditCard } from 'react-icons/fa';
import CardFormInput from './CardFormInput';

import * as Validation from '../../../helpers/validations';

const INITIAL_CONDITION = {
  valid: false,
  invalid: false,
  msg: '',
};

const CardDetails = () => {
  const cardNumber = createRef<HTMLInputElement>();
  const [cardNumberCondition, setCardNumberCondition] = useState(INITIAL_CONDITION);
  const cardNumberFormat = (cardNumValue: string) => {
    let result = cardNumValue.replace(/\D/g, '');
    if (result.length > 16) { result = result.slice(0, 16); }
    return result.replace(/(\d{4})(\d{4})?(\d{4})?(\d)/, '$1 $2 $3 $4');
  };

  const cardName = createRef<HTMLInputElement>();
  const [cardNameCondition, setCardNameCondition] = useState(INITIAL_CONDITION);

  const cardExpiration = createRef<HTMLInputElement>();
  const [cardExpirationCondition, setCardExpirationCondition] = useState(INITIAL_CONDITION);
  const cardExpirationFormat = (cardExpValue: string) => {
    let result = cardExpValue.replace(/\D/g, '');
    if (result?.length > 4) { result = result.slice(0, 4); }
    return result.replace(/(\d{2})(\d{1})/, '$1/$2');
  };

  const cardCVV = createRef<HTMLInputElement>();
  const [cardCVVCondition, setCardCVVCondition] = useState(INITIAL_CONDITION);
  const cardCVVFormat = (cardCVVValue: string) => {
    const result = cardCVVValue.replace(/\D/g, '');
    return result?.length > 3 ? result.slice(0, 3) : result;
  };

  return (
    <div >
      <h5><strong className='text-muted'>
        Card Details:
      </strong></h5>
      <CardFormInput
        state={[cardNumberCondition, setCardNumberCondition]}
        validator={Validation.cardNumberVerifier}
        reference={cardNumber}
        leftIcon={<FaRegCreditCard />}
        placeholder='Card Number'
        name='card-number'
        format={cardNumberFormat}
      />
      <CardFormInput
        state={[cardNameCondition, setCardNameCondition]}
        validator={Validation.cardNameVerifier}
        reference={cardName}
        leftIcon={<FaRegAddressCard />}
        placeholder='Cardholder Name'
        name='card-name'
      />
      <CardFormInput
        state={[cardExpirationCondition, setCardExpirationCondition]}
        validator={Validation.cardExpirationVerifier}
        reference={cardExpiration}
        leftIcon={<FaRegCalendarAlt />}
        placeholder='Expiration Date (MM/YY)'
        name='card-expiration'
        format={cardExpirationFormat}
      />
      <CardFormInput
        state={[cardCVVCondition, setCardCVVCondition]}
        validator={Validation.cardCvvVerifier}
        reference={cardCVV}
        leftIcon={'CVV'}
        placeholder='CVV Code'
        name='card-cvv'
        format={cardCVVFormat}
      />
    </div>
  );
};

export default CardDetails;
