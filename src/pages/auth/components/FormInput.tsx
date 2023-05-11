import React, { RefObject } from 'react';
import Form from 'react-bootstrap/Form';
import { Dispatch, SetStateAction } from 'react';
import { InputGroup } from 'react-bootstrap';

type StateCondition = {
  valid: boolean, invalid: boolean, msg: string,
}

type FormInputProps = {
  stateCondition: StateCondition,
  value?: string,
  setValue?: Dispatch<SetStateAction<string>>,
  validation(value: string): void,
  name: string,
  reference?: RefObject<HTMLInputElement>,
  placeholder?: string,
  hasLabel?: boolean,
  leftIcon?: JSX.Element | string,
  inlineLabel?: boolean,
  format?(value: string): string,
};

export default function FormInput(
  { stateCondition, value, setValue, validation, name, reference, placeholder, hasLabel = false, leftIcon, inlineLabel, format }: FormInputProps
) {

  const identifier = name.toLowerCase();

  if (reference) {
    return (
      <Form.Group className='mb-3'>
        <InputGroup>
          {hasLabel && <Form.Label>{name}</Form.Label>}
          {leftIcon && <InputGroup.Text id="basic-addon1">{leftIcon}</InputGroup.Text>}
          <Form.Control
            placeholder={placeholder}
            isValid={stateCondition.valid}
            isInvalid={stateCondition.invalid}
            onBlur={({ target }) => validation(target.value)}
            onChange={({ target }) => format && (target.value = format(target.value))}
            type={identifier === 'password' ? 'password' : 'text'}
            name={identifier}
            className=''
            ref={reference}
            id={identifier}
            aria-describedby={`${identifier}-feedback`}
          />
        </InputGroup>
        <Form.Text id={`${identifier}-feedback`} muted>
          {stateCondition.msg}
        </Form.Text>
      </Form.Group>
    );
  }

  if (setValue) {
    return (
      <Form.Group className='mb-3'>
        <InputGroup className={inlineLabel ? '' : 'd-grid'}>
          {hasLabel && <Form.Label className='me-1 align-self-center'>{name}:</Form.Label>}
          {leftIcon && <InputGroup.Text id="basic-addon1">{leftIcon}</InputGroup.Text>}
          <Form.Control
            isValid={stateCondition.valid}
            isInvalid={stateCondition.invalid}
            onBlur={({ target }) => validation(target.value)}
            type={name === 'password' ? 'password' : 'text'}
            name={name}
            className='w-auto'
            value={value}
            onChange={({ target }) => setValue(target.value)}
            id={name}
            aria-describedby={`${name}Feedback`}
          />
        </InputGroup>
        <Form.Text id={`${name}Feedback`} muted>
          {stateCondition.msg}
        </Form.Text>
      </Form.Group >
    );
  }

  return <></>;
}
