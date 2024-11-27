import { useState } from "react";
import TestForm from "../components/TestForm";
import { calculateMBTI, mbtiDescriptions } from "../utils/mbtiCalculator";
import { createTestResult } from "../api/testResults";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getNickname, getid } from "../utils/Authenticated";

// 스타일링
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
`;

const Card = styled.div`
  border-radius: 10px;
  padding: 2rem;
  max-width: 600px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

const Heading = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 1.5rem;
`;

const Description = styled.p`
  font-size: 1.125rem;
  color: #b6b6b6;
  margin-bottom: 1.5rem;
`;

const ResultButton = styled.button`
  width: 100%;

  color: white;
  padding: 1rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    color: #fff;
  }
`;

const TestPage = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const now = new Date().toLocaleDateString();

  const handleTestSubmit = async (answers) => {
    const mbtiResult = calculateMBTI(answers);
    // console.log("결과는 ", mbtiResult);
    const nickname = await getNickname();
    const userId = getid();
    createTestResult(
      mbtiResult,
      mbtiDescriptions[mbtiResult],
      nickname,
      now,
      userId
    );

    setResult(mbtiResult);
  };

  const handleNavigateToResults = () => {
    navigate("/results");
  };

  return (
    <PageContainer>
      <Card>
        {!result ? (
          <>
            <Heading>MBTI 테스트</Heading>
            <TestForm onSubmit={handleTestSubmit} />
          </>
        ) : (
          <>
            <Heading>테스트 결과: {result}</Heading>
            <Description>
              {mbtiDescriptions[result] ||
                "해당 성격 유형에 대한 설명이 없습니다."}
            </Description>
            <ResultButton onClick={handleNavigateToResults}>
              결과 페이지로 이동하기
            </ResultButton>
          </>
        )}
      </Card>
    </PageContainer>
  );
};

export default TestPage;
