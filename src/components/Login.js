import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss';

// Login 함수 컴포넌트 정의하기
const Login = () => {
  // useNavigate 훅을 사용하여 navigate 함수를 받아오기
  const navigate = useNavigate();
  // useState로 userName 상태와 setUserName 함수 생성하고 초기값으로 빈 문자열 설정
  const [userName, setUserName] = useState('');

  // 로그인 버튼 클릭 시 실행되는 함수
  const onLogin = (e) => {
    e.preventDefault();
    // localStorage에 'username' 키로 userName 값을 저장
    localStorage.setItem('username', userName);
    // '/Home' 경로로 이동하기
    navigate('/Home');
  };

  // 사용자 이름 입력 필드 값이 변경될 때 실행되는 함수
  const onUserNameChange = (e) => {
    // 입력된 값으로 userName 상태 업데이트
    setUserName(e.target.value);
  };

  return (
    <div className="Login">
      <h2>Hello!</h2>

      <form id="login-form" onSubmit={onLogin}>
        <input
          type="text"
          maxLength="10"
          placeholder="닉네임을 입력하세요."
          required
          value={userName}
          onChange={onUserNameChange}
        ></input>
        <input type="submit" value="확인"></input>
      </form>
    </div>
  );
};

// Login 컴포넌트를 다른 파일에서 불러올 수 있도록 내보내기
export default Login;
