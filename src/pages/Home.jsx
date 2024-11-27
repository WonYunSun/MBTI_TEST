import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  padding: 50px 20px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 10px;
  color: white;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: white;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
`;

const Card = styled.div`
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
  text-align: left;
  width: 300px;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 10px;
`;

const CardDescription = styled.p`
  font-size: 1rem;
  color: #666;
`;

const Button = styled.button`
  margin-top: 60px;
`;

const Home = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Title>무료 성격 테스트</Title>
      <Subtitle>
        자신의 성격 유형을 확인할 수 있도록 솔직하게 답변해 주세요.
      </Subtitle>
      <CardContainer>
        <Card>
          <CardTitle>성격 유형 검사</CardTitle>
          <CardDescription>
            자신의 성격 유형을 파악하고 삶의 여러 영역에서 어떤 영향을 미치는지
            알아보세요.
          </CardDescription>
        </Card>
        <Card>
          <CardTitle>성격 유형 이해</CardTitle>
          <CardDescription>
            다른 사람들이 어떻게 행동하는지 이해하는 데 도움을 줄 수 있습니다.
          </CardDescription>
        </Card>
        <Card>
          <CardTitle>팀 평가</CardTitle>
          <CardDescription>
            팀 내에서 자신의 동료들과 협력할 수 있는 방법을 배워보세요.
          </CardDescription>
        </Card>
      </CardContainer>
      <Button onClick={() => navigate("/test")}>내 성격 알아보기</Button>
    </Container>
  );
};

export default Home;
