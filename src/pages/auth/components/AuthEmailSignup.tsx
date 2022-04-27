import React, { Dispatch, SetStateAction, useState } from 'react';
import bcrypt from 'bcryptjs';
import { Form } from 'react-bootstrap';

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

type EmailProps = {
  email: string,
  setEmail: Dispatch<SetStateAction<string>>,
}

export default function AuthEmailSignup({ email, setEmail }: EmailProps) {
  const [emailCondition, setEmailCondition] = useState(INITIAL_CONDITION);

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

  const authenticateEmail = async (email: string) => {
    // emailAuthReque = true
    const emailAuth = await axiosEmailAuth(email);
    if ('code' in emailAuth) {
      const authCodeHash = bcrypt.hashSync(emailAuth.code, 10);
      setCookie('email_auth_pair', authCodeHash);
      // emailAuthRequire = verify
    }
    // emailAuthReque = error
  };

  return (
    <Form.Group className='mb-3'>
      <Form.Label>E-mail</Form.Label>
      <FormInput
        stateCondition={emailCondition}
        value={email}
        setValue={setEmail}
        validation={emailValidation}
        name='email'
      />
    </Form.Group>
  );
}
