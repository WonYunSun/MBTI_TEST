import { useState } from "react";
import { register } from "../api/auth"; // 회원가입 API 함수 가져오기
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Signup = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      await register({ id, password, nickname });
      setSuccess("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
      setTimeout(() => navigate("/login"), 2000); // 2초 후 로그인 페이지로 이동
    } catch (err) {
      setError(err.message || "회원가입에 실패했습니다.");
    }
  };

  return (
    <Container>
      <FormWrapper onSubmit={handleSubmit}>
        <Title>회원가입</Title>
        <InputWrapper>
          <Input
            type="text"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
            placeholder="아이디"
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="비밀번호"
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
            placeholder="닉네임"
          />
        </InputWrapper>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}
        <Button type="submit">회원가입</Button>
        <SigninText>
          이미 계정이 있으세요?{" "}
          <span onClick={() => navigate("/login")}>로그인하기</span>
        </SigninText>
      </FormWrapper>
    </Container>
  );
};

export default Signup;

// 스타일 정의
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

const InputWrapper = styled.div`
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  color: #0f0f0f;
  padding: 0.75rem;
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
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  margin-top: 1rem;
`;

const SuccessMessage = styled.p`
  color: green;
  text-align: center;
  margin-top: 1rem;
`;

const SigninText = styled.div`
  color: #fff;
  padding-top: 20px;
  text-align: center;
  span {
    text-decoration: underline;
    cursor: pointer;
    transition: color 0.3s ease;
    &:hover {
      color: #9a7eff;
    }
  }
`;
