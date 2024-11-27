import { useEffect, useState } from "react";
import { updateProfile } from "../api/auth";
import { getNickname } from "../utils/Authenticated";
import styled from "styled-components";

const ProfilePage = () => {
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const nickname = await getNickname();
        setNickname(nickname);
      } catch (err) {
        setError("회원 정보를 가져오는 데 실패했습니다.", err);
      }
    };

    fetchUserProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append("nickname", nickname);

      await updateProfile(formData);
      setSuccess("닉네임이 성공적으로 업데이트되었습니다!");
    } catch (err) {
      setError("닉네임 업데이트에 실패했습니다.");
    }
  };

  return (
    <Container>
      <FormWrapper onSubmit={handleSubmit}>
        <Title>프로필 수정</Title>
        <InputWrapper>
          <Input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
        </InputWrapper>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}
        <Button type="submit">업데이트</Button>
      </FormWrapper>
    </Container>
  );
};

export default ProfilePage;

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
