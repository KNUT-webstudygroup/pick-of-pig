'use client';

import { GoogleLogin } from '@react-oauth/google';

function OAuth2() {
  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        console.log(credentialResponse);
      }}
      onError={() => {
        console.log('Login Failed');
      }}
      useOneTap
    />
  );
}
export default OAuth2;
