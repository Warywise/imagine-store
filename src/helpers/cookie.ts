import JsCookie from 'js-cookie';
import jwt_decode from 'jwt-decode';

const cookies = JsCookie.withAttributes({
  expires: 1,
});

export function setCookie(key: string, value: string) {
  cookies.set(key, value);
}

export function getCookie(key: string) {
  const token = cookies.get(key) as string;
  if (token) {
    const { email } = jwt_decode(token) as { email: string };
    return {
      email, token,
    };
  }
  return null;
}

export function destroyCookie(key: string) {
  cookies.remove(key);
}
