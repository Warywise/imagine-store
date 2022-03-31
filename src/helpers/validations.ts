const RegExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

export function emailVerifier(email: string) {
  const invalidTerms = [undefined, ''];
  if (invalidTerms.includes(email)) {
    return '"Email" is required';
  }

  return RegExp.test(email)
    ? false : '"Email" must be valid: email@example.com';
}

export function passwordVerifier(password: string) {
  const invalidTerms = [undefined, ''];
  if (invalidTerms.includes(password)) return '"Password" is required';

  if (password.length < 6) return '"Password" must be at least 6 characters';

  return false;
}

export function nameVerifier(name: string) {
  const invalidTerms = [undefined, ''];
  if (invalidTerms.includes(name)) return '"Name/Last Name" is required';

  if (name.length < 3) return '"Name/Last Name" must be at least 6 characters';

  return false;
}
