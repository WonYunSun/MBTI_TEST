import axios from "axios";

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: "https://moneyfulpublicpolicy.co.kr",
});

// 요청 인터셉터 (필요 시)
axiosInstance.interceptors.request.use(
  (config) => {
    // 예: 토큰을 모든 요청 헤더에 자동 추가
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 회원가입 API
export const register = async (userData) => {
  try {
    const response = await axiosInstance.post("/register", userData);
    return response.data;
  } catch (error) {
    console.error("회원가입 오류:", error);
    throw error.response?.data || error.message;
  }
};

// 로그인 API
export const login = async (userData, expiresIn = "1h") => {
  try {
    const response = await axiosInstance.post("/login", userData, {
      params: { expiresIn },
    });
    return response.data;
  } catch (error) {
    console.error("로그인 오류:", error);
    throw error.response?.data || error.message;
  }
};

// 회원정보 확인 API
export const getUserProfile = async (userId = null) => {
  try {
    const response = await axiosInstance.get("/user", {
      params: userId ? { user_id: userId } : {},
    });
    return response.data;
  } catch (error) {
    console.error("회원정보 확인 오류:", error);
    throw error.response?.data || error.message;
  }
};

// 프로필 수정 API
export const updateProfile = async (formData) => {
  try {
    const response = await axiosInstance.patch("/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("프로필 수정 오류:", error);
    throw error.response?.data || error.message;
  }
};
