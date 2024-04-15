/** 로그인 성공 페이지 */
export default function LoginSuccess() {
  const token = localStorage.getItem('ACCESS_TOKEN');

  return (
    <>
      <h2>로그인 성공!</h2>
      <p>
        아래는 인가코드입니다. 이걸 서버로 보내면 서버에서 토큰을 생성하여
        front에게 넘겨주면 됩니다.
      </p>
      <p>{token}</p>
    </>
  );
}
