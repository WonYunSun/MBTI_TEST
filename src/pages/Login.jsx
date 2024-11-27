import { useState } from "react";
import { login } from "../api/auth"; // 로그인 API 함수 가져오기
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await login({ id, password });
      localStorage.setItem("accessToken", response.accessToken); // 토큰 저장
      localStorage.setItem("id", id);
      alert("로그인 성공!");
      navigate("/"); // 로그인 성공 후 이동할 페이지
    } catch (err) {
      setError(err.message || "로그인에 실패했습니다.");
    }
  };

  return (
    <Container>
      <FormWrapper onSubmit={handleSubmit}>
        <Title>로그인</Title>

        <Input
          type="text"
          id="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
          placeholder="아이디"
        />
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="비밀번호"
        />

        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit">로그인</Button>
        <SigninText>
          아직 계정이 없으세요?{" "}
          <span onClick={() => navigate("/signup")}>회원가입하기</span>
        </SigninText>
      </FormWrapper>
    </Container>
  );
};

export default Login;
const SigninText = styled.div`
  color: #fff;
  padding-top: 20px;
  span {
    text-decoration: underline;
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
      color: #9a7eff;
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const FormWrapper = styled.form`
  background-color: #333333;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  text-align: center;
  color: #fff;
`;

const Input = styled.input`
  width: 100%;
  color: #0f0f0f;
  padding: 0.75rem;
  margin-bottom: 20px;
  background-color: #fff;
  border: 1px solid #fff;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: #401cc2;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  margin-top: 1rem;
`;
