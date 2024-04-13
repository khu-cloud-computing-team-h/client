export default function AuthGoogle() {
  const googleCode = new URL(window.location.href).searchParams.get('code');

  return (
    <div>
      <h1>로그인 성공!</h1>
      <h2>
        아래의 코드가 인가코드이고, 이를 서버에 보내면 서버에서 처리해준 뒤
        토큰을 넘겨주는 방식입니다.
      </h2>
      <p>{googleCode}</p>
    </div>
  );
}
