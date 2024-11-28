#  📌 MBTI-TEST 프로젝트 개요
이 프로젝트는 사용자가 테스트를 통해 다양한 MBTI 결과를 얻고, 해당 유형에 대한 설명을 제공하는 웹 애플리케이션입니다. Glitch로 배포된 JSON 서버를 백엔드로 사용하며, Vercel을 통해 프론트엔드가 배포됩니다.
### 🌟 배포 -> [https://vercel.com/0-4040s-projects/mbti-test](https://mbti-test-psi.vercel.app/)
### 🛠️ 기술 스택
프론트엔드: React
백엔드: JSON Server (Glitch)
배포: Vercel (프론트엔드), Glitch (백엔드)
기타 라이브러리:
react-router-dom: 라우팅 관리
Axios: API 통신
### ✨주요 기능
* **회원가입**

JWT 인증 서버를 활용하여 회원가입/로그인/프로필(닉네임 변경) 가능.
* **MBTI 유형 검색**
  
사용자가 MBTI 유형(예: INTJ, ENFP)을 입력하면 해당 유형의 설명을 반환.
* **API 연동**

Glitch에 배포된 JSON 서버와 연동하여 실시간 데이터 검색 및 조회.
* **라우팅**

react-router-dom을 사용하여 페이지 전환 없이 URL 변경 가능.
