import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthGoogle() {
  const navigate = useNavigate();
  const googleCode = new URL(window.location.href).searchParams.get('code');
  localStorage.setItem('ACCESS_TOKEN', googleCode);

  useEffect(() => {
    navigate('/');
  }, [navigate]);

  return <div>로그인 중,,,</div>;
}
