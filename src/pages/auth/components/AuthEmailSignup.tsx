import React, { Dispatch, SetStateAction, useState } from 'react';
import bcrypt from 'bcryptjs';
import { Alert, Button, Form } from 'react-bootstrap';

import FormInput from './FormInput';
import { axiosEmailAuth } from '../../../helpers/emailSender';
import { setCookie } from '../../../helpers/cookie';
import { axiosGetter } from '../../../helpers/axios';
import { emailVerifier } from '../../../helpers/validations';

import { UserConditionReturn } from '../../../interfaces/userInfos';

const INITIAL_CONDITION = {
  valid: false,
  invalid: false,
  msg: '',
};

const AUTH_CONDITION = {
  requiring: false,
  success: false,
  msg: '',
};

type EmailProps = {
  email: string,
  setEmail: Dispatch<SetStateAction<string>>,
  setEmailAuth: Dispatch<SetStateAction<boolean>>,
}

export default function AuthEmailSignup({ email, setEmail, setEmailAuth }: EmailProps) {
  const [emailCondition, setEmailCondition] = useState(INITIAL_CONDITION);
  const [authCondition, setAuthCondition] = useState(AUTH_CONDITION);
  const [authCode, setAuthCode] = useState('');
  const [authCodeCondition, setAuthCodeCondition] = useState(INITIAL_CONDITION);

  const emailValidation = async (emailValue: string) => {
    const emailError = emailVerifier(emailValue);
    if (emailError) {
      return setEmailCondition({
        valid: false,
        invalid: true,
        msg: emailError,
      });
    }

    const emailUnavailable = await axiosGetter(`/users/${email}`) as UserConditionReturn;
    if (emailUnavailable.active) {
      return setEmailCondition({
        valid: false,
        invalid: true,
        msg: 'Email unavailable',
      });
    }

    setEmailCondition({ valid: true, invalid: false, msg: '' });
  };

  const authCodeValidation = (code: string) => {
    if (code.length < 6) {
      return setAuthCodeCondition({
        valid: false,
        invalid: true,
        msg: 'Verification code must be 6 digits',
      });
    }

    setAuthCodeCondition({ valid: true, invalid: false, msg: '' });
  };

  const sendAuthCode = async () => {
    setAuthCondition({ requiring: true, success: false, msg: '' });
    const emailAuth = await axiosEmailAuth(email);
    if ('code' in emailAuth) {
      const authCodeHash = bcrypt.hashSync(emailAuth.code, 10);
      setCookie('email_auth_pair', authCodeHash);
      return setAuthCondition({ requiring: false, success: true, msg: '' });
    }
    return setAuthCondition({
      requiring: false, success: false, msg: 'Error! Please, try again later.'
    });
  };

  return (
    !authCondition.success
      // - - <Enter Email> - - //
      ? <Form.Group className = 'mb-3'>
        <Form.Label>E-mail</Form.Label>
        <FormInput
          stateCondition={emailCondition}
          value={email}
          setValue={setEmail}
          validation={emailValidation}
          name='email'
        />
        <h5 className='mt-3 mb-3'>Enter your email to receive a verification code.</h5>
        <Button
          variant='outline-primary'
          size='lg'
          type='button'
          onClick={sendAuthCode}
          disabled={authCondition.requiring}
        >
          {authCondition.requiring ? 'Please wait...' : 'Confirm'}
        </Button>
        <Form.Text className='d-block font-monospace text-danger fw-bolder'>
          {authCondition.msg}
        </Form.Text>
      </Form.Group>
      // - - <Verification Code> - - //
      : <Form.Group className='mb-3'>
        <Form.Label>VERIFICATION CODE</Form.Label>
        <FormInput
          stateCondition={authCodeCondition}
          value={authCode}
          setValue={setAuthCode}
          validation={authCodeValidation}
          name='auth-code'
        />
        <Alert className='mt-3 mb-3 text-black' variant='danger'>
          Enter the <strong>six-digit</strong> verification code.
        </Alert>
        <Button
          variant='outline-primary'
          size='lg'
          type='button'
          // onClick={sendAuthCode}
          // disabled={authCondition.requiring}
        >
          {authCondition.requiring ? 'Please wait...' : 'Confirm'}
        </Button>
      </Form.Group>
  );
}
