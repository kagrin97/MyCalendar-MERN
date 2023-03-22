# 🗓 [my-calendar](https://my-calendar-mern.vercel.app/)

> 달력 사이트로 사용자가 자신만의 달력에 메모를 할수 있는 앱
</br>

## 🚀 프로젝트 설명

- ***Front*** : React, Typescript, PWA

- ***Back*** : Express, Javascript

- ***DB*** : monggodb, mongoose

- ***Front Deploy*** : Vercel

- ***Back Deploy*** : AWS EC2

- ***Image Upload Cloud*** : Cloudinary

- ***개발 기간*** : 2023-01-27 ~ 2023-02-14

</br>

## 데모 영상

- ### 1-1) Login 

    <div align="center">
      <video controls width="10%" src="https://user-images.githubusercontent.com/75124028/218924780-bdae9b68-e637-4c4b-abc5-5519db212ee9.mp4
    " ></video>
    </div>

- ### 1-2) Signup

  <div align="center">
      <video controls width="10%" src="https://user-images.githubusercontent.com/75124028/218924838-b2729315-039e-4445-b948-8a7c25edb44c.mp4
    "></video>
  <div>
  
- ### 1-3) Calendar Memo CRUD

  <div align="center">
  <video controls width="10%" src="https://user-images.githubusercontent.com/75124028/218924897-f4e5b3bb-74e6-4911-b3fb-ba47ff3099a9.mp4"></video>
</div>
<br>

## 구현 기능

- ## Login

  - **기존 유저 확인** : server에 사용자가 입력한 email을 보내 기존에 존재하는 이메일인지 판단
    
  - **유효한 입력 값** : front, back 모두 email과 password가 유효한 입력값인지 확인 (email형식, password 7자 이상)
    
  - **validtor** : back에서 유저에게 받은 password와 db에 암호화된 password와 비교
    
  - **jwt** : 유효한 유저일 경우 기간이 12h인 jwt를 발급, front에서 token 값이 유효시간을 지나면 자동 삭제
    
  - **response** : res값으로 유저의 정보를 보냄
    
  - **contextAPI** : 받은 유저 정보를 contextAPI로 전역 상태로 관리

- ## Signup

  - **기존 유저 확인** : 위와 동일
    
  - **유효한 입력 값** : 위와 동일
    
  - **password hash** : 입력받은 password를 암호화해서 db에 저장
    
  - **프로필 사진 저장** : imgFile을 받을경우 upload폴더에 multer로 임시 저장후 cloudinary 클라우드에 이미지 저장 후 임시 저장 파일 삭제, 만약 프로필 사진을 설정하지 않을경우 기본 아바타로 적용
    
  - **jwt** : 위와 동일 
    
  - **response** : 위와 동일
    
  - **contextAPI** : 위와 동일
 
- ## Calendar memo

  - **로그인 확인** : token을 가지고 있고 token 유효시간일 때만 CRUD기능이 정상적으로 작동
    
  - **GET/memo** : 유저의 모든 calendr memo를 가져옴
    
  - **POST/memo** 생성 : 유효한 입력 값 일때만 memo를 생성, db에서 Transaction으로 문제 발생시 데이터 롤백
    
  - **POST/memo** 이미지 생성 : memo를 작성할때 이미지 첨부 가능 첨부시 cloudinary에 이미지 저장 
    
  - **PATCH/memo** : 유효한 값일떄만 memo 정보를 수정할수있음
<br>
      
## 핵심 기능
      
### Front

<details>
<summary>로그인 토큰을 저장, 유효시간 안 자동 로그인, 유효시간 후 자동 삭제</summary>
<div markdown="1">
<br>

- 로드인 시 토큰과 토큰 유효시간을 localStorage와 전역상태에 저장
https://github.com/kagrin97/MyCalendar-MERN/blob/92319c981c785a64fedcbe97f342e2c670f377c1/frontend/src/common/hooks/auth-hook.ts#L22-L43
<br>

- 페이지 새로고침시 토큰 유효시간이 지나지 않았다면 로그인
https://github.com/kagrin97/MyCalendar-MERN/blob/92319c981c785a64fedcbe97f342e2c670f377c1/frontend/src/common/hooks/auth-hook.ts#L63-L83
<br>

- 페이지 새로고침시 토큰 유효시간이 지났다면 자동 로그아웃
https://github.com/kagrin97/MyCalendar-MERN/blob/92319c981c785a64fedcbe97f342e2c670f377c1/frontend/src/common/hooks/auth-hook.ts#L45-L61
<br>

<br>
</div>
</details>

<details>
<summary>AbortController로 비동기 작업 취소</summary>
<div markdown="1">
<br>

- unmount시 AbortController 인스턴스가 들어있는 activeHttpRequests를 모두 abort 메서드를 실행함으로 비동기 작업취소<br>
https://github.com/kagrin97/MyCalendar-MERN/blob/92319c981c785a64fedcbe97f342e2c670f377c1/frontend/src/common/hooks/http-hook.ts#L3-L74
<br>

</div>
</details>
      
### Back
      
<details>
<summary>calendar의 RUD 요청시 토큰 검사</summary>
<div markdown="1">
<br>

- 토큰 검사 미들웨어를 구현해서 인증된 사용자만 RUD 요청 동작
https://github.com/kagrin97/MyCalendar-MERN/blob/92319c981c785a64fedcbe97f342e2c670f377c1/backend/middleware/check-auth.js#L1-L22
<br>

</div>
</details>
      
<details>
<summary>image 파일들을 cloudinary 클라우드 서버에 저장</summary>
<div markdown="1">
<br>

- image 파일들을 따로 저장
https://github.com/kagrin97/MyCalendar-MERN/blob/92319c981c785a64fedcbe97f342e2c670f377c1/backend/controllers/calendar-controllers.js#L167-L194
<br>

</div>
</details>
<br>
      
## ERD
<p align="center">
<img width="300px" src="https://user-images.githubusercontent.com/75124028/226619799-903cf774-f18e-4d7f-98e4-fef77f9c5b45.png" /></p>
<br>
      
## SERVER API 명세서
      
- [POSTMAN API 명세서 열기](https://documenter.getpostman.com/view/21753855/2s93CEwGGG)
<br>
      
## 제가 블로그에 작성한 프로젝트 진행중 배운점
      
- <a href="https://kagrin97-blog.vercel.app/react/React-Hook-Form" target="_blank">React Hook Form으로 회원가입, 로그인 구현하기!</a>
- <a href="https://kagrin97-blog.vercel.app/react/pwa-beforeInstallPrompt" target="_blank">PWA 페이지에서 앱 설치를 유도해보기 (feat. React)</a>
- <a href="https://kagrin97-blog.vercel.app/backend/cloudinary-uploadImges" target="_blank">cloudinary에 이미지 업로드 하기!</a>
- <a href="https://kagrin97-blog.vercel.app/backend/jsonwebtoken" target="_blank">[node.js] JWT(JSON Web Token)을 jsonwebtoken 라이브러리로 사용하기</a>
- <a href="https://kagrin97-blog.vercel.app/backend/bcrypt&bcryptjs" target="_blank">해쉬 라이브러리 bcrypt, bcryptjs 비교 및 사용법</a>
- <a href="https://kagrin97-blog.vercel.app/backend/Multer(Node,%20express)" target="_blank">Multer를 사용해 파일 조작(Node, express)</a>
- <a href="https://kagrin97-blog.vercel.app/db/mongoDB%EB%A5%BCexpress%EC%99%80%EC%97%B0%EA%B2%B0%ED%95%98%EA%B8%B0" target="_blank">mongoDB를 express와 연결하기 (mongoose방법도 추가)</a>
- <a href="https://kagrin97-blog.vercel.app/server/ec2-httpTohttps" target="_blank">http를 https로 적용하기 (feat. ec2/node.js)</a>      
- <a href="https://kagrin97-blog.vercel.app/server/ec2-express,mongodb" target="_blank">ec2에 express 앱 배포하기!! (feat. pm2)</a>
  
