import React, { Dispatch, SetStateAction, useState } from 'react';
import bcrypt from 'bcryptjs';
import { Alert, Button, Form } from 'react-bootstrap';

import FormInput from './FormInput';
import { axiosEmailAuth } from '../../../helpers/emailSender';
import { getCookie, setCookie } from '../../../helpers/cookie';
import { fetcherGet } from '../../../helpers/axios';
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
  const [emailTimeout, setEmailTimeout] = useState(false);

  const isEmailUnavailable = async () => {
    const emailUnavailable = await fetcherGet(`/users/${email}`) as UserConditionReturn;
    return emailUnavailable.active ?? false;
  };

  const emailValidation = async (emailValue: string) => {
    const emailError = emailVerifier(emailValue);
    if (emailError) {
      return setEmailCondition({
        valid: false,
        invalid: true,
        msg: emailError,
      });
    }

    const emailUnavailable = await isEmailUnavailable();
    if (emailUnavailable) {
      return setEmailCondition({
        valid: false,
        invalid: true,
        msg: 'Email unavailable',
      });
    }

    return setEmailCondition({ valid: true, invalid: false, msg: '' });
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
    setAuthCondition({ ...AUTH_CONDITION, requiring: true });

    const emailAlreadyUsed = await isEmailUnavailable();
    if (emailAlreadyUsed) {
      setAuthCondition({ ...AUTH_CONDITION, msg: 'This email is NOT available' });
      return setEmailCondition({ ...INITIAL_CONDITION, invalid: true });
    }

    const emailAuth = await axiosEmailAuth(email);
    if (emailAuth && 'code' in emailAuth) {
      const authCodeHash = bcrypt.hashSync(emailAuth.code, bcrypt.genSaltSync());
      setCookie('email_auth_pair', authCodeHash);
      setTimeout(() => setEmailTimeout(true), 20000);
      return setAuthCondition({ ...AUTH_CONDITION, success: true });
    }

    return setAuthCondition({
      ...AUTH_CONDITION, msg: 'Error! Please, try again later.'
    });
  };

  const comparePairToPair = () => {
    const hashCode = getCookie('email_auth_pair');
    if (hashCode) {
      const isCodeValid = bcrypt.compareSync(authCode, hashCode as string);
      return isCodeValid
        ? setEmailAuth(false)
        : setAuthCondition({
          requiring: false, success: true, msg: 'INVALID CODE! Please, check and try again.'
        });
    }

    return setAuthCondition({ ...AUTH_CONDITION, msg: 'Please, try again.' });
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
          Enter the <strong>six-digit</strong> verification code.<br />
          {emailTimeout && <>
            Did not find? Check the <strong>span box</strong> or{' '}
            <a
              style={{ cursor: 'pointer', textDecoration: 'underline' }}
              className='font-monospace'
              onClick={() => { setAuthCondition({ ...AUTH_CONDITION }); setEmailTimeout(false); }}
            >
            RESEND THE CODE!
            </a>
          </>}
        </Alert>
        <Button
          variant='outline-primary'
          size='lg'
          type='button'
          onClick={comparePairToPair}
          disabled={authCode.length < 6}
        >
          Authenticate
        </Button>
        <Form.Text className='d-block font-monospace text-danger fw-bolder'>
          {authCondition.msg}
        </Form.Text>
      </Form.Group>
  );
}
