const EmailRegExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const CardValidityRegExp = /^\d{2}\/\d{2}$/;
const invalidTerms = [undefined, ''];

export function emailVerifier(email: string) {
  if (invalidTerms.includes(email))  return '"Email" is required';

  return EmailRegExp.test(email)
    ? false : '"Email" must be valid: email@example.com';
}

export function minLengthVerifier(value: string, field: string, length: number, exact?: boolean, onlyNumbers?: boolean) {
  const formatedValue = onlyNumbers ? value.replace(/\D/g, '') : value;

  if (invalidTerms.includes(formatedValue)) return `"${field}" is required`;

  if (!exact && formatedValue.length < length) return `"${field}" must be at least ${length} characters`;

  if (exact && formatedValue.length !== length) return `"${field}" must be ${length} characters`;

  return false;
}

export const passwordVerifier = (password: string) => minLengthVerifier(password, 'Password', 6);

export const nameVerifier = (name: string) => minLengthVerifier(name, 'Name/Last Name', 3);

export const cpfVerifier = (cpf: string) => minLengthVerifier(cpf, 'CPF', 11, true, true);

export const cardNameVerifier = (cardName: string) => minLengthVerifier(cardName, 'Card Name', 3);

export const cardNumberVerifier = (cardNumber: string) => minLengthVerifier(cardNumber, 'Card Number', 16, true, true);

export function cardExpirationVerifier(cardValidity: string) {
  if (invalidTerms.includes(cardValidity)) return '"Card Validity" is required';

  return CardValidityRegExp.test(cardValidity)
    ? false : '"Card Validity" must be valid: MM/YY';
}

export const cardCvvVerifier = (cvv: string) => minLengthVerifier(cvv, 'CVV', 3, true, true);

export const addressVerifier = (address: string) => minLengthVerifier(address, 'Address', 5);

export const districtVerifier = (district: string) => minLengthVerifier(district, 'District/Neighborhood', 2);

export const cityVerifier = (city: string) => minLengthVerifier(city, 'City', 2);

export const stateVerifier = (state: string) => minLengthVerifier(state, 'State', 2);

export const zipCodeVerifier = (zipCode: string) => minLengthVerifier(zipCode, 'Zip Code', 5, false, true);
