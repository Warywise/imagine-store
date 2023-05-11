import React, { Dispatch, SetStateAction } from 'react';
import FormInput from '../../auth/components/FormInput';

type StateCondition = {
  valid: boolean, invalid: boolean, msg: string,
}

type CardInputProps = {
  validator: (value: string) => string | false,
  reference: React.RefObject<HTMLInputElement>,
  leftIcon: JSX.Element | string,
  state: [StateCondition, Dispatch<SetStateAction<StateCondition>>],
  placeholder: string,
  name: string,
  format?(value: string): string,
};

const CardFormInput: React.FC<CardInputProps> = ({ validator, reference, leftIcon, state, placeholder, name, format }) => {
  const [currentCondition, setCondition] = state;

  const validation = (cardNumberValue: string) => {
    const validationResult = validator(cardNumberValue);

    if (validationResult && !currentCondition.invalid) {
      return setCondition({
        valid: false, invalid: true, msg: validationResult,
      });
    }

    if (!validationResult && currentCondition.invalid) {
      setCondition({ valid: true, invalid: false, msg: '' });
    }
  };

  return (
    <FormInput
      stateCondition={currentCondition}
      validation={validation}
      reference={reference}
      leftIcon={leftIcon}
      placeholder={placeholder}
      name={name}
      format={format}
    />
  );
};

export default CardFormInput;
