import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { signInInstance } from '../../apis/instance';
import { useEffect } from 'react';

export default function AuthGoogle() {
  const navigate = useNavigate();
  const googleCode = new URL(window.location.href).searchParams.get('code');
  console.log(googleCode);

  const { mutate } = useMutation({
    mutationKey: ['sign-in'],
    mutationFn: async () => {
      const response = await signInInstance.post('/auth/code/google', {
        googleCode: googleCode,
      });

      return response;
    },
    onSuccess: (data) => {
      console.log(data);
      localStorage.setItem('ACCESS_TOKEN', googleCode);
      navigate('/success');
    },
  });

  useEffect(() => {
    mutate();
  }, [mutate]);

  return <div>로그인 중,,,</div>;
}
