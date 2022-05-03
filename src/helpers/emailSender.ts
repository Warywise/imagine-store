import axios, { AxiosError } from 'axios';
import { v4 as uuid } from 'uuid';

type EmailAuthReturn = { code: string } | { error: string };

const URL = 'https://emailsendnodeapi.herokuapp.com/';

const getVerificationCode = () => uuid().match(/\w{6}/) as string[];

const getEmailText = (code: string) =>
  `Welcome to Imagine Store!\n
This is an automatic email, no need to reply.\n\n
YOUR VERIFICATION CODE IS:   ${code[0]} ${code[1]} ${code[2]} ${code[3]} ${code[4]} ${code[5]}\n\n
   ;D`;

const getEmailHTML = (code: string) =>
  `<div style="display: grid">
<h2 style="font-style: italic">Imagine Store</h2>
<hr />
<p>This is an automated email, no need to reply.</p>
<strong>Your verification code is:
<br />
<code style="font-family: monospace; font-size: 1.5rem; letter-spacing: 2px;" }}>${code}</code>
</strong>
<br />
<p>You're welcome! ;D</p>
</div>`;

const getEmailBody = (email: string, code: string) => ({
  email,
  sender_name: 'Imagine Store',
  subject: 'Email Authentication - Your Verification Code',
  text: getEmailText(code),
  html: getEmailHTML(code),
});

export async function axiosEmailAuth(email: string): Promise<EmailAuthReturn> {
  const CODE = getVerificationCode()[0];
  try {
    await axios({
      method: 'POST',
      url: URL,
      data: getEmailBody(email, CODE),
      timeout: 15000,
    }).then((response) => response.status);
    return { code: CODE };
  } catch (error) {
    const { response } = error as AxiosError;
    return response?.data;
  }
}
