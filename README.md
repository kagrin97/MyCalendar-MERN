# ๐ [my-calendar](https://my-calendar-mern.vercel.app/)

### ๋ฌ๋ ฅ ์ฌ์ดํธ๋ก ์ฌ์ฉ์๊ฐ ์์ ๋ง์ ๋ฌ๋ ฅ์ ๋ฉ๋ชจ๋ฅผ ํ ์ ์๋ ์ฑ
</br>

## ๐ ํ๋ก์ ํธ ์ค๋ช

- ***Front*** : React, Typescript, PWA

- ***Back*** : Express, Javascript

- ***DB*** : monggodb, mongoose

- ***Front Deploy*** : Vercel

- ***Back Deploy*** : AWS EC2

- ***Image Upload Cloud*** : Cloudinary

- ***๊ฐ๋ฐ ๊ธฐ๊ฐ*** : 2023-01-27 ~ 2023-02-14

</br>

## ๋ฐ๋ชจ ์์

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

## ๊ตฌํ ๊ธฐ๋ฅ

- ## Login

  - **๊ธฐ์กด ์ ์  ํ์ธ** : server์ ์ฌ์ฉ์๊ฐ ์๋ ฅํ email์ ๋ณด๋ด ๊ธฐ์กด์ ์กด์ฌํ๋ ์ด๋ฉ์ผ์ธ์ง ํ๋จ
    
  - **์ ํจํ ์๋ ฅ ๊ฐ** : front, back ๋ชจ๋ email๊ณผ password๊ฐ ์ ํจํ ์๋ ฅ๊ฐ์ธ์ง ํ์ธ (emailํ์, password 7์ ์ด์)
    
  - **validtor** : back์์ ์ ์ ์๊ฒ ๋ฐ์ password์ db์ ์ํธํ๋ password์ ๋น๊ต
    
  - **jwt** : ์ ํจํ ์ ์ ์ผ ๊ฒฝ์ฐ ๊ธฐ๊ฐ์ด 12h์ธ jwt๋ฅผ ๋ฐ๊ธ, front์์ token ๊ฐ์ด ์ ํจ์๊ฐ์ ์ง๋๋ฉด ์๋ ์ญ์ 
    
  - **response** : res๊ฐ์ผ๋ก ์ ์ ์ ์ ๋ณด๋ฅผ ๋ณด๋
    
  - **contextAPI** : ๋ฐ์ ์ ์  ์ ๋ณด๋ฅผ contextAPI๋ก ์ ์ญ ์ํ๋ก ๊ด๋ฆฌ

- ## Signup

  - **๊ธฐ์กด ์ ์  ํ์ธ** : ์์ ๋์ผ
    
  - **์ ํจํ ์๋ ฅ ๊ฐ** : ์์ ๋์ผ
    
  - **password hash** : ์๋ ฅ๋ฐ์ password๋ฅผ ์ํธํํด์ db์ ์ ์ฅ
    
  - **ํ๋กํ ์ฌ์ง ์ ์ฅ** : imgFile์ ๋ฐ์๊ฒฝ์ฐ uploadํด๋์ multer๋ก ์์ ์ ์ฅํ cloudinary ํด๋ผ์ฐ๋์ ์ด๋ฏธ์ง ์ ์ฅ ํ ์์ ์ ์ฅ ํ์ผ ์ญ์ , ๋ง์ฝ ํ๋กํ ์ฌ์ง์ ์ค์ ํ์ง ์์๊ฒฝ์ฐ ๊ธฐ๋ณธ ์๋ฐํ๋ก ์ ์ฉ
    
  - **jwt** : ์์ ๋์ผ 
    
  - **response** : ์์ ๋์ผ
    
  - **contextAPI** : ์์ ๋์ผ
 
- ## Calendar memo

  - **๋ก๊ทธ์ธ ํ์ธ** : token์ ๊ฐ์ง๊ณ  ์๊ณ  token ์ ํจ์๊ฐ์ผ ๋๋ง CRUD๊ธฐ๋ฅ์ด ์ ์์ ์ผ๋ก ์๋
    
  - **GET/memo** : ์ ์ ์ ๋ชจ๋  calendr memo๋ฅผ ๊ฐ์ ธ์ด
    
  - **POST/memo** ์์ฑ : ์ ํจํ ์๋ ฅ ๊ฐ ์ผ๋๋ง memo๋ฅผ ์์ฑ, db์์ Transaction์ผ๋ก ๋ฌธ์  ๋ฐ์์ ๋ฐ์ดํฐ ๋กค๋ฐฑ
    
  - **POST/memo** ์ด๋ฏธ์ง ์์ฑ : memo๋ฅผ ์์ฑํ ๋ ์ด๋ฏธ์ง ์ฒจ๋ถ ๊ฐ๋ฅ ์ฒจ๋ถ์ cloudinary์ ์ด๋ฏธ์ง ์ ์ฅ 
    
  - **PATCH/memo** : ์ ํจํ ๊ฐ์ผ๋๋ง memo ์ ๋ณด๋ฅผ ์์ ํ ์์์

## SERVER API ๋ช์ธ์
      
- [POSTMAN API ๋ช์ธ์ ์ด๊ธฐ](https://documenter.getpostman.com/view/21753855/2s93CEwGGG)
      
## ์ ๊ฐ ๋ธ๋ก๊ทธ์ ์์ฑํ ํ๋ก์ ํธ ์งํ์ค ๋ฐฐ์ด์ 
      
- <a href="https://kagrin97-blog.vercel.app/react/React-Hook-Form" target="_blank">React Hook Form์ผ๋ก ํ์๊ฐ์, ๋ก๊ทธ์ธ ๊ตฌํํ๊ธฐ!</a>
- <a href="https://kagrin97-blog.vercel.app/react/pwa-beforeInstallPrompt" target="_blank">PWA ํ์ด์ง์์ ์ฑ ์ค์น๋ฅผ ์ ๋ํด๋ณด๊ธฐ (feat. React)</a>
- <a href="https://kagrin97-blog.vercel.app/backend/cloudinary-uploadImges" target="_blank">cloudinary์ ์ด๋ฏธ์ง ์๋ก๋ ํ๊ธฐ!</a>
- <a href="https://kagrin97-blog.vercel.app/backend/jsonwebtoken" target="_blank">[node.js] JWT(JSON Web Token)์ jsonwebtoken ๋ผ์ด๋ธ๋ฌ๋ฆฌ๋ก ์ฌ์ฉํ๊ธฐ</a>
- <a href="https://kagrin97-blog.vercel.app/backend/bcrypt&bcryptjs" target="_blank">ํด์ฌ ๋ผ์ด๋ธ๋ฌ๋ฆฌ bcrypt, bcryptjs ๋น๊ต ๋ฐ ์ฌ์ฉ๋ฒ</a>
- <a href="https://kagrin97-blog.vercel.app/backend/Multer(Node,%20express)" target="_blank">Multer๋ฅผ ์ฌ์ฉํด ํ์ผ ์กฐ์(Node, express)</a>
- <a href="https://kagrin97-blog.vercel.app/db/mongoDB%EB%A5%BCexpress%EC%99%80%EC%97%B0%EA%B2%B0%ED%95%98%EA%B8%B0" target="_blank">mongoDB๋ฅผ express์ ์ฐ๊ฒฐํ๊ธฐ (mongoose๋ฐฉ๋ฒ๋ ์ถ๊ฐ)</a>
- <a href="https://kagrin97-blog.vercel.app/server/ec2-httpTohttps" target="_blank">http๋ฅผ https๋ก ์ ์ฉํ๊ธฐ (feat. ec2/node.js)</a>      
- <a href="https://kagrin97-blog.vercel.app/server/ec2-express,mongodb" target="_blank">ec2์ express ์ฑ ๋ฐฐํฌํ๊ธฐ!! (feat. pm2)</a>
  
## ํด๋๊ตฌ์กฐ 

```
myCalendar
โโ ๐backend
โ  โโ ๐routes
โ  โ  โโ users-routes.js
โ  โ  โโ calendar-routes.js
โ  โโ ๐controllers
โ  โ  โโ calendar-controllers.js
โ  โ  โโ users-controllers.js
โ  โโ ๐middleware
โ  โ  โโ check-auth.js
โ  โโ ๐models
โ  โ  โโ user.js
โ  โ  โโ http-error.js
โ  โ  โโ calendar.js
โ  โโ app.js
โ  โโ ๐constants
โ  โ  โโ error.js
โ  โโ ๐uploads
โโ ๐frontend
โ  โโ ๐src
โ  โ  โโ index.css
โ  โ  โโ calendar
โ  โ  โ  โโ ๐components
โ  โ  โ  โ  โโ ๐ToastEditor
โ  โ  โ  โ  โ  โโ ToastEditor.tsx
โ  โ  โ  โ  โ  โโ ToastEditor.css
โ  โ  โ  โ  โ  โโ type.ts
โ  โ  โ  โ  โโ ๐ToastViewer
โ  โ  โ  โ  โ  โโ type.ts
โ  โ  โ  โ  โ  โโ ToastViewer.tsx
โ  โ  โ  โ  โโ ๐CalendarItem
โ  โ  โ  โ     โโ CalendarItem.css
โ  โ  โ  โ     โโ type.ts
โ  โ  โ  โ     โโ CalendarItemView.tsx
โ  โ  โ  โ     โโ CalendarItem.tsx
โ  โ  โ  โโ ๐pages
โ  โ  โ     โโ ๐CalendarDetail
โ  โ  โ     โ  โโ CalendarDetail.css
โ  โ  โ     โ  โโ type.ts
โ  โ  โ     โ  โโ CalendarDetail.tsx
โ  โ  โ     โ  โโ CalendarDetailView.tsx
โ  โ  โ     โโ ๐MemoAll
โ  โ  โ     โ  โโ MemoAll.tsx
โ  โ  โ     โ  โโ MemoAllView.tsx
โ  โ  โ     โ  โโ MemoAll.css
โ  โ  โ     โโ ๐Calendars
โ  โ  โ        โโ CalendarsView.tsx
โ  โ  โ        โโ Calendars.tsx
โ  โ  โ        โโ type.ts
โ  โ  โ        โโ Calendars.css
โ  โ  โโ service-worker.ts
โ  โ  โโ serviceWorkerRegistration.ts
โ  โ  โโ index.tsx
โ  โ  โโ ๐common
โ  โ  โ  โโ ๐types
โ  โ  โ  โ  โโ http.ts
โ  โ  โ  โ  โโ calendar.ts
โ  โ  โ  โโ ๐service
โ  โ  โ  โ  โโ UserHttp.ts
โ  โ  โ  โ  โโ CalendarHttp.ts
โ  โ  โ  โโ ๐hooks
โ  โ  โ  โ  โโ auth-hook.ts
โ  โ  โ  โ  โโ http-hook.ts
โ  โ  โ  โโ ๐utils
โ  โ  โ  โ  โโ minusToDot.ts
โ  โ  โ  โ  โโ fomatDate.ts
โ  โ  โ  โโ ๐components
โ  โ  โ  โ  โโ ๐Navigation
โ  โ  โ  โ  โ  โโ SideDrawer.tsx
โ  โ  โ  โ  โ  โโ MainHeader.css
โ  โ  โ  โ  โ  โโ NavLinks.css
โ  โ  โ  โ  โ  โโ MainNavigation.css
โ  โ  โ  โ  โ  โโ SideDrawer.css
โ  โ  โ  โ  โ  โโ BottomNavigation.css
โ  โ  โ  โ  โ  โโ MainHeader.tsx
โ  โ  โ  โ  โ  โโ NavLinks.tsx
โ  โ  โ  โ  โ  โโ BottomNavigation.tsx
โ  โ  โ  โ  โ  โโ MainNavigation.tsx
โ  โ  โ  โ  โโ ๐UIElements
โ  โ  โ  โ  โ  โโ Modal.css
โ  โ  โ  โ  โ  โโ Card.tsx
โ  โ  โ  โ  โ  โโ Backdrop.css
โ  โ  โ  โ  โ  โโ LoadingSpinner.css
โ  โ  โ  โ  โ  โโ CalendarCard.tsx
โ  โ  โ  โ  โ  โโ Card.css
โ  โ  โ  โ  โ  โโ ErrorModal.tsx
โ  โ  โ  โ  โ  โโ CalendarCard.css
โ  โ  โ  โ  โ  โโ Modal.tsx
โ  โ  โ  โ  โ  โโ Button.css
โ  โ  โ  โ  โ  โโ Button.tsx
โ  โ  โ  โ  โ  โโ Backdrop.tsx
โ  โ  โ  โ  โ  โโ LoadingSpinner.tsx
โ  โ  โ  โ  โโ ๐PWA
โ  โ  โ  โ     โโ PWAInstallPrompt.tsx
โ  โ  โ  โโ ๐context
โ  โ  โ  โ  โโ authContext.tsx
โ  โ  โ  โโ ๐api
โ  โ  โ     โโ calendarApi.ts
โ  โ  โ     โโ userApi.ts
โ  โ  โโ ๐user
โ  โ  โ  โโ ๐components
โ  โ  โ  โ  โโ ๐Signup
โ  โ  โ  โ  โ  โโ SignupView.tsx
โ  โ  โ  โ  โ  โโ Signup.css
โ  โ  โ  โ  โ  โโ type.ts
โ  โ  โ  โ  โ  โโ Signup.tsx
โ  โ  โ  โ  โโ ๐Login
โ  โ  โ  โ     โโ Login.css
โ  โ  โ  โ     โโ type.ts
โ  โ  โ  โ     โโ Login.tsx
โ  โ  โ  โ     โโ LoginView.tsx
โ  โ  โ  โโ ๐pages
โ  โ  โ     โโ ๐Auth
โ  โ  โ        โโ Auth.tsx
โ  โ  โโ App.tsx
```
  
