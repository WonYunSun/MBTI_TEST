import axios from "axios";

// axios 인스턴스 생성
const axiosInstance = axios.create({
  // baseURL: "http://localhost:5000/testResults",
  baseURL: "https://button-maddening-library.glitch.me/testResults",
});

// 테스트 결과 조회
export const getTestResults = async () => {
  try {
    const response = await axiosInstance.get();
    return response.data;
  } catch (error) {
    console.error("테스트 결과 조회 실패:", error);
    throw error;
  }
};

// 테스트 결과 생성 (예: ISFP, ENFP)
export const createTestResult = async (
  resultData,
  descriptionData,
  nickname,
  createAt,
  userId
) => {
  try {
    const response = await axiosInstance.post("/", {
      result: resultData, // 전달받은 MBTI 결과 (예: "ISFP", "ENFP" 등)
      description: descriptionData,
      tester: nickname,
      createAt: createAt,
      userId: userId,
    });
    return response.data; // 저장된 결과 반환
  } catch (error) {
    console.error("테스트 결과 저장 실패:", error);
    throw error;
  }
};

// 테스트 결과 삭제
export const deleteTestResult = async (id) => {
  try {
    const response = await axiosInstance.delete(`/${id}`);
    return response.data; // 삭제된 결과 반환
  } catch (error) {
    console.error("테스트 결과 삭제 실패:", error);
    throw error;
  }
};

// 테스트 결과 가시성 업데이트 (예: 공개 여부 설정)
export const updateTestResultVisibility = async (id, visibility) => {
  try {
    const response = await axiosInstance.patch(`/${id}`, {
      visibility, // true/false 값으로 가시성 설정
    });
    return response.data; // 업데이트된 결과 반환
  } catch (error) {
    console.error("테스트 결과 가시성 업데이트 실패:", error);
    throw error;
  }
};
