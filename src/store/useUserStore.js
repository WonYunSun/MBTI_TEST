import { create } from "zustand";

const useUserStore = create((set) => ({
  nickname: "",
  setNickname: (newNickname) => set({ nickname: newNickname }), // 닉네임을 업데이트하는 함수
}));

export default useUserStore;
