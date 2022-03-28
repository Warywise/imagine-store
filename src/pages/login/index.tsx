import React, { MouseEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormInput from './components/formInput';

import * as Validation from '../../helpers/validations';
import { axiosLogin } from '../../helpers/axios';
import { setCookie } from '../../helpers/cookie';
import { MainContext } from '../../context/mainContext';

const INITIAL_CONDITION = {
  valid: false,
  invalid: false,
  msg: '',
};

export default function Login() {
  const { active, setActive, setCurrentUser } = useContext(MainContext);
  const navigateTo = useNavigate();

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [emailCondition, setEmailCondition] = useState(INITIAL_CONDITION);
  const [passwordCondition, setPasswordCondition] = useState(INITIAL_CONDITION);
  const [unauthorized, setUnauthotorized] = useState('');

  const emailValidation = (emailValue: string) => {
    const emailResult = Validation.emailVerifier(emailValue);
    if (emailResult) {
      return setEmailCondition({
        valid: false,
        invalid: true,
        msg: emailResult,
      });
    }

    setEmailCondition({ valid: true, invalid: false, msg: '' });
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
      !!Validation.emailVerifier(user) ||
      !!Validation.passwordVerifier(password)
    );
  };

  const handleClick = async (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    event.preventDefault();

    const body = {
      email: user,
      hash: password,
    };

    const { email, name, token, error } = await axiosLogin(body);

    if (error) {
      setEmailCondition(INITIAL_CONDITION);
      setPasswordCondition(INITIAL_CONDITION);
      setUnauthotorized(error);
    } else {
      setCookie('auth_handler', token);
      setCurrentUser({ name, email });
      setActive(true);
      navigateTo('/', { replace: true });
    }
  };

  useEffect(() => {
    if (active) navigateTo('/', { replace: true });
  });

  return (
    <Container className='d-flex mt-5 justify-content-center'>
      <Form action=''>
        <Form.Group className='mb-3'>
          <h1 className='mb-3'>Login</h1>
          <Form.Label>E-mail</Form.Label>
          <FormInput
            stateCondition={emailCondition}
            value={user}
            setValue={setUser}
            validation={emailValidation}
            name='user'
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
          <Button
            variant='outline-dark'
            size='lg'
            onClick={handleClick}
            type='submit'
            disabled={handleButtonDisable()}
          >
              Login
          </Button>
          <span className='m-1' />
          {/* <Button
            variant='outline-dark'
            size='lg'
            type='button'
            onClick={() => navigateTo('/cadastro')}
          >
              Quero me Cadastrar
          </Button> */}
          <Form.Text className='d-block font-monospace text-danger fw-bolder'>
            {unauthorized}
          </Form.Text>
        </Form.Group>
      </Form>
    </Container>
  );
}
