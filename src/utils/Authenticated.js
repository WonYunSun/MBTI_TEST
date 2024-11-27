import { getUserProfile } from "../api/auth";

export const getAccessToken = () => localStorage.getItem("accessToken");
export const getid = () => localStorage.getItem("id");

export const getNickname = async () => {
  const userId = getid();
  if (userId) {
    try {
      const userProfile = await getUserProfile(userId);
      return userProfile.nickname;
    } catch (error) {
      console.error("프로필을 가져오는 데 실패했습니다.", error);
      return null;
    }
  }
  return null; // userId가 없으면 null 반환
};

// 인증 여부 확인 함수
export const isAuthenticated = () => !!getAccessToken();
