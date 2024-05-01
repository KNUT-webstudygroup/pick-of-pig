import { oauth2Key } from '@/recoil/atoms';
import { useGoogleOneTapLogin } from '@react-oauth/google';

useGoogleOneTapLogin({
  onSuccess: (credentialResponse) => {
    console.log(credentialResponse);
  },
  onError: () => {
    console.log('Login Failed');
  },
});
