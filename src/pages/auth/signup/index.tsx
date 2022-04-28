import React, { MouseEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../../../components/header/Header';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormInput from '../components/FormInput';

import * as Validation from '../../../helpers/validations';
import { MainContext } from '../../../context/mainContext';
import { axiosCreate } from '../../../helpers/axios';
import AuthEmailSignup from '../components/AuthEmailSignup';

const INITIAL_CONDITION = {
  valid: false,
  invalid: false,
  msg: '',
};

export default function Signup() {
  const { active } = useContext(MainContext);
  const navigateTo = useNavigate();

  const [email, setEmail] = useState('');
  const [emailAuth, setEmailAuth] = useState(true);
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');

  const [passwordCondition, setPasswordCondition] = useState(INITIAL_CONDITION);
  const [nameCondition, setNameCondition] = useState(INITIAL_CONDITION);
  const [lastNameCondition, setLastNameCondition] = useState(INITIAL_CONDITION);

  const [unauthorized, setUnauthotorized] = useState('');

  const nameValidation = (nameValue: string) => {
    const nameResult = Validation.nameVerifier(nameValue);
    if (nameResult) {
      return setNameCondition({
        valid: false,
        invalid: true,
        msg: nameResult,
      });
    }

    setNameCondition({ valid: true, invalid: false, msg: '' });
  };

  const lastNameValidation = (nameValue: string) => {
    const lastNameResult = Validation.nameVerifier(nameValue);
    if (lastNameResult) {
      return setLastNameCondition({
        valid: false,
        invalid: true,
        msg: lastNameResult,
      });
    }

    setLastNameCondition({ valid: true, invalid: false, msg: '' });
  };

  const passwordValidation = (passwordValue: string) => {
    const passwordResult = Validation.passwordVerifier(passwordValue);
    if (passwordResult) {
      return setPasswordCondition({
        valid: false,
        invalid: true,
        msg: passwordResult,
      });
    }

    setPasswordCondition({ valid: true, invalid: false, msg: '' });
  };

  const handleButtonDisable = () => {
    return (
      !!Validation.emailVerifier(email) ||
      !!Validation.passwordVerifier(password) ||
      !!Validation.nameVerifier(name) ||
      !!Validation.nameVerifier(lastName)
    );
  };

  const handleClick = async (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    event.preventDefault();

    const body = {
      email,
      hash: password,
      name,
      lastName,
    };

    const { error } = await axiosCreate(body);

    if (error) {
      setPasswordCondition(INITIAL_CONDITION);
      setUnauthotorized(error);
    } else {
      navigateTo('/auth/login', { replace: true });
    }
  };

  useEffect(() => {
    if (active) navigateTo('/', { replace: true });
  });

  return (
    <>
      <Header />
      <Container className='d-flex mt-5 justify-content-center'>
        <Form action=''>
          <h1 className='mb-3'>Signup</h1>
          {emailAuth
            ? <AuthEmailSignup {...{ email, setEmail, setEmailAuth }} />
            : <>
              <Form.Group className='mb-3'>
                <Form.Label>First Name</Form.Label>
                <FormInput
                  stateCondition={nameCondition}
                  value={name}
                  setValue={setName}
                  validation={nameValidation}
                  name='name'
                />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label>Last Name</Form.Label>
                <FormInput
                  stateCondition={lastNameCondition}
                  value={lastName}
                  setValue={setLastName}
                  validation={lastNameValidation}
                  name='lastName'
                />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label>Password</Form.Label>
                <FormInput
                  stateCondition={passwordCondition}
                  value={password}
                  setValue={setPassword}
                  validation={passwordValidation}
                  name='password'
                />
              </Form.Group>

              <Form.Group className='mb-3'>
                <span className='m-1' />
                <Button
                  variant='outline-success'
                  size='lg'
                  type='button'
                  onClick={handleClick}
                  disabled={handleButtonDisable()}
                >
              Confirm
                </Button>
                <Form.Text className='d-block font-monospace text-danger fw-bolder'>
                  {unauthorized}
                </Form.Text>
              </Form.Group>
            </>}
        </Form>
      </Container>
    </>
  );
}
