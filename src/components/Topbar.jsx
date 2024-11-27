import styled from "styled-components";
import { isAuthenticated } from "../utils/Authenticated";
import { useNavigate } from "react-router-dom";

const TopbarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  padding: 10px 20px;
  color: white;
  box-sizing: border-box;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
`;

const Menu = styled.nav`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const MenuItem = styled.div`
  cursor: pointer;
  font-size: 16px;
  &:hover {
    text-decoration: underline;
  }
`;

const LogoutBtn = styled.button``;

const Topbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // 로그아웃 시 토큰 삭제
    navigate("/"); // 로그인 페이지로 이동
    alert("로그아웃 되었습니다.");
  };
  return (
    <TopbarContainer>
      <Logo onClick={() => navigate("/")}>MBTI TEST</Logo>
      <Menu>
        {isAuthenticated() ? (
          <>
            <MenuItem onClick={() => navigate("/profile")}>프로필</MenuItem>
            <MenuItem onClick={() => navigate("/test")}>테스트</MenuItem>
            <MenuItem onClick={() => navigate("/results")}>결과보기</MenuItem>
            <LogoutBtn onClick={handleLogout}>로그아웃</LogoutBtn>
          </>
        ) : (
          <button onClick={() => navigate("/login")}>로그인</button>
        )}
      </Menu>
    </TopbarContainer>
  );
};

export default Topbar;
