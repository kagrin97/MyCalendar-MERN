# 🗓 [my-calendar](https://my-calendar-mern.vercel.app/)


### 달력 사이트로 사용자가 자신만의 달력에 메모를 할수 있는 앱
</br>

## 🚀 프로젝트 설명

- <b>Front</b> : React, Typescript, PWA
- Back : Express, Javascript
- DB : monggodb, mongoose
- Front Deploy : Vercel
- Back Deploy : AWS EC2
- Image Upload Cloud : Cloudinary
- 개발 기간 : 2023-01-27 ~ 2023-02-14

## 데모 영상

- ### 1-1) Login 

  <video controls width=60% src="https://user-images.githubusercontent.com/75124028/218924780-bdae9b68-e637-4c4b-abc5-5519db212ee9.mp4
" ></video>

- ### 1-2) Signup

  <video controls width=60% src="https://user-images.githubusercontent.com/75124028/218924838-b2729315-039e-4445-b948-8a7c25edb44c.mp4
"></video>

- ### 1-3) Calendar Memo CRUD

  <video controls width=60% src="https://user-images.githubusercontent.com/75124028/218924897-f4e5b3bb-74e6-4911-b3fb-ba47ff3099a9.mp4"></video>

<br>

## 구현 기능

- ## Login

  - 기존 유저 확인 : server에 사용자가 입력한 email을 보내 기존에 존재하는 이메일인지 판단
  - 유효한 입력 값 : front, back 모두 email과 password가 유효한 입력값인지 확인 (email형식, password 7자 이상)
  - validtor : back에서 유저에게 받은 password와 db에 암호화된 password와 비교
  - jwt : 유효한 유저일 경우 기간이 12h인 jwt를 발급, front에서 token 값이 유효시간을 지나면 자동 삭제
  - response : res값으로 유저의 정보를 보냄
  - contextAPI : 받은 유저 정보를 contextAPI로 전역 상태로 관리

- ## Signup

  - 기존 유저 확인 : 위와 동일
  - 유효한 입력 값 : 위와 동일
  - password hash : 입력받은 password를 암호화해서 db에 저장
  - 프로필 사진 저장 : imgFile을 받을경우 upload폴더에 multer로 임시 저장후 cloudinary 클라우드에 이미지 저장 후 임시 저장 파일 삭제, 만약 프로필 사진을 설정하지 않을경우 기본 아바타로 적용
  - jwt : 위와 동일 
  - response : 위와 동일
  - contextAPI : 위와 동일
 
- ## Calendar memo

  - 로그인 확인 : token을 가지고 있고 token 유효시간일 때만 CRUD기능이 정상적으로 작동
  - GET/memo : 유저의 모든 calendr memo를 가져옴
  - POST/memo 생성 : 유효한 입력 값 일때만 memo를 생성, db에서 Transaction으로 문제 발생시 데이터 롤백
  - POST/memo 이미지 생성 : memo를 작성할때 이미지 첨부 가능 첨부시 cloudinary에 이미지 저장 
  - PATCH/memo : 유효한 값일떄만 memo 정보를 수정할수있음

## api 명세 추가예정

## 폴더구조 
  
