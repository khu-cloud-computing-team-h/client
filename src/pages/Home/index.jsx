import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('ACCESS_TOKEN');

  useEffect(() => {
    if (accessToken) {
      navigate('/dashboard');
    }
  }, [navigate, accessToken]);
  return <h1>Welcome</h1>;
}
