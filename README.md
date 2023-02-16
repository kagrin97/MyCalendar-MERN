# 🗓 [my-calendar](https://my-calendar-mern.vercel.app/)

### 달력 사이트로 사용자가 자신만의 달력에 메모를 할수 있는 앱
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

    <div>
      <video controls width=30% src="https://user-images.githubusercontent.com/75124028/218924780-bdae9b68-e637-4c4b-abc5-5519db212ee9.mp4
    " ></video>
    </div>

- ### 1-2) Signup

  <div>
      <video controls width=30% src="https://user-images.githubusercontent.com/75124028/218924838-b2729315-039e-4445-b948-8a7c25edb44c.mp4
    "></video>
  <div>
  
- ### 1-3) Calendar Memo CRUD

  <div>
  <video controls width=30% src="https://user-images.githubusercontent.com/75124028/218924897-f4e5b3bb-74e6-4911-b3fb-ba47ff3099a9.mp4"></video>
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

## SERVER API 명세서
      
- [POSTMAN API 명세서 열기](https://documenter.getpostman.com/view/21753855/2s93CEwGGG)
      
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
  
## 폴더구조 

```
myCalendar
├─ 📁backend
│  ├─ 📁routes
│  │  ├─ users-routes.js
│  │  └─ calendar-routes.js
│  ├─ 📁controllers
│  │  ├─ calendar-controllers.js
│  │  └─ users-controllers.js
│  ├─ 📁middleware
│  │  └─ check-auth.js
│  ├─ 📁models
│  │  ├─ user.js
│  │  ├─ http-error.js
│  │  └─ calendar.js
│  ├─ app.js
│  ├─ 📁constants
│  │  └─ error.js
│  └─ 📁uploads
├─ 📁frontend
│  ├─ 📁src
│  │  ├─ index.css
│  │  ├─ calendar
│  │  │  ├─ 📁components
│  │  │  │  ├─ 📁ToastEditor
│  │  │  │  │  ├─ ToastEditor.tsx
│  │  │  │  │  ├─ ToastEditor.css
│  │  │  │  │  └─ type.ts
│  │  │  │  ├─ 📁ToastViewer
│  │  │  │  │  ├─ type.ts
│  │  │  │  │  └─ ToastViewer.tsx
│  │  │  │  └─ 📁CalendarItem
│  │  │  │     ├─ CalendarItem.css
│  │  │  │     ├─ type.ts
│  │  │  │     ├─ CalendarItemView.tsx
│  │  │  │     └─ CalendarItem.tsx
│  │  │  └─ 📁pages
│  │  │     ├─ 📁CalendarDetail
│  │  │     │  ├─ CalendarDetail.css
│  │  │     │  ├─ type.ts
│  │  │     │  ├─ CalendarDetail.tsx
│  │  │     │  └─ CalendarDetailView.tsx
│  │  │     ├─ 📁MemoAll
│  │  │     │  ├─ MemoAll.tsx
│  │  │     │  ├─ MemoAllView.tsx
│  │  │     │  └─ MemoAll.css
│  │  │     └─ 📁Calendars
│  │  │        ├─ CalendarsView.tsx
│  │  │        ├─ Calendars.tsx
│  │  │        ├─ type.ts
│  │  │        └─ Calendars.css
│  │  ├─ service-worker.ts
│  │  ├─ serviceWorkerRegistration.ts
│  │  ├─ index.tsx
│  │  ├─ 📁common
│  │  │  ├─ 📁types
│  │  │  │  ├─ http.ts
│  │  │  │  └─ calendar.ts
│  │  │  ├─ 📁service
│  │  │  │  ├─ UserHttp.ts
│  │  │  │  └─ CalendarHttp.ts
│  │  │  ├─ 📁hooks
│  │  │  │  ├─ auth-hook.ts
│  │  │  │  └─ http-hook.ts
│  │  │  ├─ 📁utils
│  │  │  │  ├─ minusToDot.ts
│  │  │  │  └─ fomatDate.ts
│  │  │  ├─ 📁components
│  │  │  │  ├─ 📁Navigation
│  │  │  │  │  ├─ SideDrawer.tsx
│  │  │  │  │  ├─ MainHeader.css
│  │  │  │  │  ├─ NavLinks.css
│  │  │  │  │  ├─ MainNavigation.css
│  │  │  │  │  ├─ SideDrawer.css
│  │  │  │  │  ├─ BottomNavigation.css
│  │  │  │  │  ├─ MainHeader.tsx
│  │  │  │  │  ├─ NavLinks.tsx
│  │  │  │  │  ├─ BottomNavigation.tsx
│  │  │  │  │  └─ MainNavigation.tsx
│  │  │  │  ├─ 📁UIElements
│  │  │  │  │  ├─ Modal.css
│  │  │  │  │  ├─ Card.tsx
│  │  │  │  │  ├─ Backdrop.css
│  │  │  │  │  ├─ LoadingSpinner.css
│  │  │  │  │  ├─ CalendarCard.tsx
│  │  │  │  │  ├─ Card.css
│  │  │  │  │  ├─ ErrorModal.tsx
│  │  │  │  │  ├─ CalendarCard.css
│  │  │  │  │  ├─ Modal.tsx
│  │  │  │  │  ├─ Button.css
│  │  │  │  │  ├─ Button.tsx
│  │  │  │  │  ├─ Backdrop.tsx
│  │  │  │  │  └─ LoadingSpinner.tsx
│  │  │  │  └─ 📁PWA
│  │  │  │     └─ PWAInstallPrompt.tsx
│  │  │  ├─ 📁context
│  │  │  │  └─ authContext.tsx
│  │  │  └─ 📁api
│  │  │     ├─ calendarApi.ts
│  │  │     └─ userApi.ts
│  │  ├─ 📁user
│  │  │  ├─ 📁components
│  │  │  │  ├─ 📁Signup
│  │  │  │  │  ├─ SignupView.tsx
│  │  │  │  │  ├─ Signup.css
│  │  │  │  │  ├─ type.ts
│  │  │  │  │  └─ Signup.tsx
│  │  │  │  └─ 📁Login
│  │  │  │     ├─ Login.css
│  │  │  │     ├─ type.ts
│  │  │  │     ├─ Login.tsx
│  │  │  │     └─ LoginView.tsx
│  │  │  └─ 📁pages
│  │  │     └─ 📁Auth
│  │  │        └─ Auth.tsx
│  │  └─ App.tsx
```
  
