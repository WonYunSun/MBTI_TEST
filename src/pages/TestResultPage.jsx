import { useEffect, useState } from "react";
import {
  getTestResults,
  deleteTestResult,
  updateTestResultVisibility,
} from "../api/testResults";
import styled from "styled-components";
import { getid } from "../utils/Authenticated";

const PageContainer = styled.div`
  padding: 20px;
`;

const ResultList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ResultItem = styled.li`
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const ResultInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #333;
`;

const TesterName = styled.div`
  font-size: 19px;
`;

const ResultTitle = styled.h3`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

const ResultDescription = styled.p`
  font-size: 16px;
  color: #555;
`;

const LoadingText = styled.div`
  font-size: 18px;
  color: #999;
`;

const ErrorText = styled.div`
  font-size: 18px;
`;

const Button = styled.button`
  padding: 8px 12px;
  margin-left: 8px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  ${(props) =>
    props.variant === "delete" &&
    `
      background-color: #e74c3c;
      color: white;
  `}

  ${(props) =>
    props.variant === "visibility" &&
    `
      background-color: #3498db;
      color: white;
  `}
`;

const TestResultPage = () => {
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentUserId = getid(); // 현재 접속 중인 유저의 ID

  useEffect(() => {
    const fetchTestResults = async () => {
      try {
        const results = await getTestResults();
        setTestResults(results);
      } catch (err) {
        setError("결과를 불러오는 데 실패했습니다.", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestResults();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("이 테스트 결과를 삭제하시겠습니까?")) {
      try {
        await deleteTestResult(id);
        setTestResults(testResults.filter((result) => result.id !== id));
      } catch (error) {
        console.error("테스트 결과 삭제 실패:", error);
      }
    }
  };

  const handleVisibilityToggle = async (id, currentVisibility) => {
    try {
      const newVisibility = !currentVisibility;
      await updateTestResultVisibility(id, newVisibility);
      setTestResults(
        testResults.map((result) =>
          result.id === id ? { ...result, visibility: newVisibility } : result
        )
      );
    } catch (error) {
      console.error("가시성 업데이트 실패:", error);
    }
  };

  if (loading) {
    return <LoadingText>로딩 중...</LoadingText>;
  }

  if (error) {
    return <ErrorText>{error}</ErrorText>;
  }

  return (
    <PageContainer>
      {testResults.length === 0 ? (
        <p>아직 테스트 결과가 없습니다.</p>
      ) : (
        <ResultList>
          {testResults.map((result) => (
            <ResultItem key={result.id}>
              <ResultInfo>
                <TesterName>{result.tester}</TesterName>
                <div>{result.createAt}</div>
              </ResultInfo>
              <ResultTitle>{result.result}</ResultTitle>
              <ResultDescription>
                {result.description || "결과에 대한 설명이 없습니다."}
              </ResultDescription>
              {result.userId === currentUserId && (
                <div>
                  <Button
                    variant="delete"
                    onClick={() => handleDelete(result.id)}
                  >
                    삭제
                  </Button>
                  <Button
                    variant="visibility"
                    onClick={() =>
                      handleVisibilityToggle(result.id, result.visibility)
                    }
                  >
                    {result.visibility ? "비공개로 전환" : "공개로 전환"}
                  </Button>
                </div>
              )}
            </ResultItem>
          ))}
        </ResultList>
      )}
    </PageContainer>
  );
};

export default TestResultPage;
