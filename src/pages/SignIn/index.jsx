import imgGoogleLogin from './assets/imgGoogleLogin.png';

/** 로그인 페이지 */
export default function SignIn() {
  const redirect_uri = import.meta.env.VITE_REDIRECT_URL;
  const google_client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const GoogleURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${google_client_id}&redirect_uri=${redirect_uri}/google&response_type=code&scope=email profile`;

  const handleGoogleLoginButton = () => {
    window.location.href = GoogleURL;
  };

  return (
    <button type='button' onClick={handleGoogleLoginButton}>
      <img
        src={imgGoogleLogin}
        alt='google-login-button'
        width={300}
        height={45}
      />
    </button>
  );
}
