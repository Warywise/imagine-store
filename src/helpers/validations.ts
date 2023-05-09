const EmailRegExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const CardValidityRegExp = /^\d{2}\/\d{2}$/;
const invalidTerms = [undefined, ''];

export function emailVerifier(email: string) {
  if (invalidTerms.includes(email)) {
    return '"Email" is required';
  }

  return EmailRegExp.test(email)
    ? false : '"Email" must be valid: email@example.com';
}

export function passwordVerifier(password: string) {
  if (invalidTerms.includes(password)) return '"Password" is required';

  if (password.length < 6) return '"Password" must be at least 6 characters';

  return false;
}

export function nameVerifier(name: string) {
  if (invalidTerms.includes(name)) return '"Name/Last Name" is required';

  if (name.length < 3) return '"Name/Last Name" must be at least 6 characters';

  return false;
}

export function cpfVerifier(cpf: string) {
  if (invalidTerms.includes(cpf)) return '"CPF" is required';

  if (cpf.length !== 11) return '"CPF" must be 11 characters';

  return false;
}

export function cardNameVerifier(cardName: string) {
  if (invalidTerms.includes(cardName)) return '"Card Name" is required';

  if (cardName.length < 3) return '"Card Name" must be at least 3 characters';

  return false;
}

export function cardNumberVerifier(cardNumber: string) {
  if (invalidTerms.includes(cardNumber)) return '"Card Number" is required';

  if (cardNumber.length !== 16) return '"Card Number" must be 16 characters';

  return false;
}

export function cardValidityVerifier(cardValidity: string) {
  if (invalidTerms.includes(cardValidity)) return '"Card Validity" is required';

  return CardValidityRegExp.test(cardValidity)
    ? false : '"Card Validity" must be valid: MM/YY';
}

export function cvvVerifier(cvv: string) {
  if (invalidTerms.includes(cvv)) return '"CVV" is required';

  if (cvv.length !== 3) return '"CVV" must be 3 characters';

  return false;
}
