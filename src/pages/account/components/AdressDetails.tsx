import React, { createRef, useState } from 'react';
import CardFormInput from './CardFormInput';

import * as Validation from '../../../helpers/validations';

const INITIAL_CONDITION = {
  valid: false,
  invalid: false,
  msg: '',
};

const AddressDetails = () => {
  const address = createRef<HTMLInputElement>();
  const [addressCondition, setAddressCondition] = useState(INITIAL_CONDITION);

  const district = createRef<HTMLInputElement>();
  const [districtCondition, setDistrictCondition] = useState(INITIAL_CONDITION);

  const city = createRef<HTMLInputElement>();
  const [cityCondition, setCityCondition] = useState(INITIAL_CONDITION);

  const state = createRef<HTMLInputElement>();
  const [stateCondition, setStateCondition] = useState(INITIAL_CONDITION);

  const zipCode = createRef<HTMLInputElement>();
  const [zipCodeCondition, setZipCodeCondition] = useState(INITIAL_CONDITION);
  const zipCodeFormat = (zipCodeValue: string) => {
    const result = zipCodeValue.replace(/\D/g, '');
    return result?.length > 8 ? result.slice(0, 8) : result;
  };

  const removeNumbers = (value: string, length?: number) => {
    let result = value.replace(/\d/g, '');
    if (length && result?.length > length) { result = result.slice(0, length); }
    return result;
  };

  return (
    <div >
      <h5><strong className='text-muted'>
      Shipping Address:
      </strong></h5>
      <CardFormInput
        state={[addressCondition, setAddressCondition]}
        validator={Validation.addressVerifier}
        reference={address}
        placeholder='123 Awesome St.'
        name='Address'
        hasLabel
      />
      <CardFormInput
        state={[districtCondition, setDistrictCondition]}
        validator={Validation.districtVerifier}
        reference={district}
        placeholder='Brooklyn'
        name='District/Neighborhood'
        hasLabel
      />
      <CardFormInput
        state={[cityCondition, setCityCondition]}
        validator={Validation.cityVerifier}
        reference={city}
        placeholder='New York'
        name='City'
        format={removeNumbers}
        hasLabel
      />
      <CardFormInput
        state={[stateCondition, setStateCondition]}
        validator={Validation.stateVerifier}
        reference={state}
        placeholder='NY'
        name='State'
        format={(value) => removeNumbers(value, 2)}
        hasLabel
      />
      <CardFormInput
        state={[zipCodeCondition, setZipCodeCondition]}
        validator={Validation.zipCodeVerifier}
        reference={zipCode}
        placeholder=''
        name='Zip Code'
        format={zipCodeFormat}
        hasLabel
      />
    </div>
  );
};

export default AddressDetails;
