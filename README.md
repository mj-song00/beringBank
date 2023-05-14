## Bering Bank

* 과제 수행기간 : 2023.05.09 ~ 2023.05.14
* 사용언어 및 프레임워크 : Typescript, Nest.js
* Database : PostgresQL

## ERD<img width="1239" alt="스크린샷 2023-05-13 오후 5 55 21" src="https://github.com/mj-song00/beringBank/assets/104669297/6babaabd-d90d-4235-9117-3287cd99f30b">
* user와 card, account는 1:N 관계로 설정하였습니다.
* card와 account는 1:N 관계로 설정하였습니다.

## API
### <a href='https://documenter.getpostman.com/view/23879843/2s93ecwq6J'>PostMan API 문서</a>
<table border='1'>
  <th> 기능 </th> 
  <th> EndPoint </th>
  <th> 메소드 </th>
  <tr>
    <td> 유저 생성 </td>
    <td> /user </td>
    <td> POST </td>
    <tr>
       <td> 유저 login </td>
    <td> /user/login </td>
    <td> POST </td>
    <tr>
      <td> 계좌생성 </td>
      <td> account/register </td>
      <td> POST </td>
      <tr>
        <td> 계좌조회 </td>
      <td> account </td>
      <td> GET </td>
      <tr>
      <td> 현금입금 </td>
      <td> account/deposit </td>
      <td> POST </td>
      <tr>
      <td> 현금출금 </td>
      <td> account/withdraw </td>
      <td> POST </td>
      <tr>
        <td> 카드생성 </td>
      <td> card/register </td>
      <td> POST </td>
        <tr>
           <td> 카드 사용 여부 </td>
      <td> card/convert/:id </td>
      <td> PATCH </td>
       </table>

## 구현
1. userId, nickname을 이용한 token 생성
2. 비밀번호: 숫자, 영문자, 특수문자를 포함한 최소8, 최대15자리 문자열 
3. bcyrpt를 이용한 비밀번호 암호화
4. @UseGuards(AuthGuard('jwt')), @GetUser Custom decorator를 이용하여 개인정보 조회

## 실행방법
1. git clone후 해당 폴더를 열어 터미널에 npm install을 입력해주세요.
2. 터미널에 npx prisma init, npx prisma generate 를 입력해주세요. 정상적으로 실행되면 .env가 생성됩니다.
2-1. .env를 사용하고 싶지 않으시다면, 
      prisma/schema.prisma에 있는 DATABASE_URL을 직접 입력해주세요.
      user/userService.ts에 있는 USER_SALT에 숫자를 입력해주세요.
      card/cardService.ts에 있는 CARD_RAMDOM_NUMBER에 숫자를 입력해주세요      
      account/accountService.ts에 있는 ACCOUNT_RANDOM_NUMBER에 숫자를 입력해주세요
      user.module.ts, passport.jwt.strategy.ts에 있는 'jwtConstants.secret, process.env.JWT_CINSTANTS'에 같은 문자열을 입력해주세요. 복호화 비밀번호 입니다.
3. npm run start:dev를 터미널에 입력해주세요. 서버가 실행됩니다. 
