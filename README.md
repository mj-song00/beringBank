## Bering Bank

* 과제 수행기간 : 2023.05.09 ~ 2023.05.13
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
      <td> 계좌생성 </td>
      <td> account/register </td>
      <td> POST </td>
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


          
