import Cookie from 'js-cookie';

const cookies = Cookie.withAttributes({
  expires: 1,
});

export function setCookie(key: string, value: string) {
  cookies.set(key, value);
}
