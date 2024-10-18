# 😎 일정 관리 서비스 코워커스 Coworkers

![코워커스 썸네일](https://github.com/user-attachments/assets/61111fd4-e9c2-4caa-8c94-03ae99b9dc2a)


### 💻 배포 URL: https://coworkers-1.netlify.app/
### 💻 개발 기간: 2024.09.02 - 2024.10.09


<br/>

## 목차
1. [프로젝트 개요](#프로젝트-개요)
2. [프로젝트 구조](#프로젝트-구조)
3. [팀원 소개](#팀원-소개)
4. [페이지별 기능 및 설명](#페이지별-기능-및-설명)
5. [개선한 점](#개선한-점)
6. [추가 기능](#추가-기능)
7. [프로젝트 후기](#프로젝트-후기)

<br/>

## 프로젝트 개요

### 개발환경

#### 개발 기술
<img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white"/> <img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white"/> <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat-square&logo=Tailwind CSS&logoColor=white"/>

#### 추가로 사용한 DB
<img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black"/>

#### 협업 도구
<img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white"/> <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white"/>

### 플로우 차트
[1팀 코워커스 플로우차트](https://github.com/part4-1st-team/coworkers/wiki/%EC%BD%94%EC%9B%8C%EC%BB%A4%EC%8A%A4-%ED%94%8C%EB%A1%9C%EC%9A%B0-%EC%B0%A8%ED%8A%B8)


<br/>

## 프로젝트 구조
```
📦 
├─ .eslintrc.json
├─ .github
├─ .gitignore
├─ .husky
├─ .prettierrc
├─ .storybook
├─ README.md
├─ next.config.mjs
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
├─ src
│  ├─ assets
│  │  ├─ IconList.tsx
│  │  ├─ icons
│  │  ├─ images
│  ├─ components
│  │  ├─ button
│  │  ├─ dropdown
│  │  ├─ input
│  ├─ constants
│  ├─ containers
│  ├─ firebase
│  │  ├─ firebaseDB.tsx
│  ├─ hooks
│  ├─ libs
│  │  ├─ axios.ts
│  ├─ middleware.ts
│  ├─ pages
│  ├─ schema
│  ├─ services
│  │  └─ userAPI.ts
│  ├─ stores
│  │  └─ userStore.ts
│  ├─ stories
│  ├─ styles
│  │  └─ globals.css
│  ├─ types
│  │  ├─ Article.d.ts
│  │  ├─ Comment.d.ts
│  └─ utils
│     ├─ cn.ts
├─ tailwind.config.ts
└─ tsconfig.json
```

- components 폴더에 재사용 가능한 컴포넌트들을 분리하여 관리
- `airbnb` eslint 사용
- `husky` 와 `eslint`를 통해 커밋 일관성을 유지


<br/>

## 팀원 소개

|<img width='400' src='https://github.com/user-attachments/assets/d68dc024-36bf-441a-8fc1-ecd96b48a8e1'/>|<img src='https://github.com/user-attachments/assets/e13c5b86-c846-4e01-ae3d-6a62a9a92a1c' width='400'/>|<img src='https://github.com/user-attachments/assets/cddd9eb1-30b7-467a-b865-2ff62f092d59' width='500'/>|<img src='https://github.com/user-attachments/assets/2623e4eb-13cd-4007-8c6e-59cbeefdc0e8' width='420'/>|
|:-:|:-:|:-:|:-:|
|**최민경 (팀장)**|**강효성**|**서향**|**오조환**|
|**[@mxkxx1011](https://github.com/mxkxx1011)**|**[@kanghyosung1](https://github.com/kanghyosung1)**|**[@Seo-Hyang](https://github.com/Seo-Hyang)**|**[@ohjohwan](https://github.com/ohjohwan)**|
|프로젝트 세팅, 리드미 작성|발표 자료 작성|발표 자료 작성, 리드미 이미지|발표|
|모달, 드롭다운|버튼, 인풋|GNB 및 헤더 루트, 사이드메뉴|프로필, 멤버, 캘린더|
|할 일 리스트, 계정 설정<br/>마이 히스토리 페이지|게시판, 상세 게시글, <br/>글쓰기, 랜딩 페이지|팀 생성 및 팀 참여<br/>팀 페이지 및 멤버 관리|로그인, 회원가입<br/>간편로그인 등 인증인가 담당|




## 페이지별 기능 및 설명

### 로그인 & 회원가입

|로그인|회원가입|약관동의|
|:-:|:-:|:-:|
|<img width="538" alt="스크린샷 2024-10-18 오후 10 15 31" src="https://github.com/user-attachments/assets/f42bf198-f56b-45f5-b5be-3280fabad436">|<img width="619" alt="스크린샷 2024-10-18 오후 10 15 54" src="https://github.com/user-attachments/assets/59bcf6be-f387-49fa-a27f-b6bb7b8e97bf">|<img width="565" alt="스크린샷 2024-10-18 오후 10 17 31" src="https://github.com/user-attachments/assets/2219b2f2-6760-411b-a9d5-5b1067a8ab0a">|


react-hook-form과 yup을 활용하여 유효성 검증을 수행하고, 사용자가 입력한 데이터의 유효성을 실시간으로 확인하여 에러 메시지로 사용자에게 즉시 피드백하도록 하였습니다.
또한 약관동의 페이지를 추가하여 약관 동의 후 회원가입을 처리하게끔 하였습니다.

### 그룹 페이지

|그룹 관리자|그룹 멤버|
|:-:|:-:|
|<img width="1221" alt="스크린샷 2024-10-18 오후 10 33 40" src="https://github.com/user-attachments/assets/5ef1db30-2219-48fe-8a5c-2533a47e94b3">|<img width="1236" alt="스크린샷 2024-10-18 오후 10 35 00" src="https://github.com/user-attachments/assets/0803f59d-0520-4a1a-b504-e8ef87675794">|
|톱니바퀴 버튼을 통해 그룹 수정, 삭제가 가능함|나가기 버튼을 눌러 그룹을 나갈 수 있음)

- 목록의 모든 일정에 대한 진행상황을 그룹 페이지에서 확인할 수 있습니다.
- 그룹에 존재하는 멤버 리스트를 확인할 수 있으며, 그룹 관리자일 경우 멤버를 내보낼 수 있습니다.
- 목록을 확인할 수 있으며 목록을 추가할 수 있습니다.

### 할 일 리스트 페이지


|리스트 페이지|상세 일정|
|:-:|:-:|
|<img width="1221" alt="스크린샷 2024-10-18 오후 10 37 44" src="https://github.com/user-attachments/assets/a27770d4-59cc-4256-9247-2ad896b269de">|<img width="1465" alt="스크린샷 2024-10-18 오후 10 39 53" src="https://github.com/user-attachments/assets/8764e096-7d41-4c21-8a37-63fe7204f018">|


- 우측 상단을 통해 현재 날짜를 확인할 수 있고 다른 날짜를 확인할 수 있습니다. 캘린더 버튼을 누를 경우 원하는 날짜를 선택 가능합니다.
- 왼쪽에는 목록, 오른쪽은 목록의 일정들을 확인할 수 있습니다.
- 체크박스를 통해 일정을 완료할 수 있습니다.
- 일정을 누를 경우 일정의 상세 페이지를 확인할 수 있습니다.

### 팀 추가 & 팀 참여

|팀 추가|팀 참여|
|:-:|:-:|
|<img width="731" alt="스크린샷 2024-10-18 오후 10 45 19" src="https://github.com/user-attachments/assets/cfd5b10f-b05d-4ae6-a8a2-feeead23816d">|<img width="663" alt="스크린샷 2024-10-18 오후 10 45 58" src="https://github.com/user-attachments/assets/63e328ba-f5ec-4e61-b097-6db43374a662">|

- 팀을 추가하거나 초대 코드를 통해 팀을 참여할 수 있습니다.



### 마이 히스토리 페이지

![화면 기록 2024-10-18 오후 10 40 59](https://github.com/user-attachments/assets/98579d2e-c284-4d34-864f-cf61f0b6211b)
- 일주일 간격으로 현재 사용자가 완료한 일정들의 히스토리를 확인할 수 있습니다.

### 게시판 페이지

![화면 기록 2024-10-18 오후 10 43 05](https://github.com/user-attachments/assets/ff94b6aa-2fcd-410d-bb0b-ea6a53c5812f)


- 상단에서 좋아요가 많은 베스트 게시글을 확인할 수 있습니다.
- 하단에서는 전체 게시글을 볼 수 있으며, 최신순/좋아요순 으로 정렬해서 확인할 수 있습니다.



<br/>


## 개선한 점

### 라이트/다크 모드

|라이트 모드|다크 모드|
|:-:|:-:|
|<img width="1682" alt="스크린샷 2024-10-18 오후 9 23 06" src="https://github.com/user-attachments/assets/7eb12b11-f47f-43ac-bb3b-91ebc24f6346">|<img width="1651" alt="스크린샷 2024-10-18 오후 9 22 40" src="https://github.com/user-attachments/assets/d250bfcb-0b99-4265-83df-8af60d98ba74">|

사용자의 선택을 우선적으로 생각해 피그마에서 기본 제공된 다크 색상 팔레트에 라이트 색상을 추가 구현하였습니다.<br/>
이를 통해 사용자에게 라이트/다크 모드 전환 옵션을 제공함으로써 사용자 경험을 한층 더 개선하였습니다.

### 툴팁 메시지

|버튼|로그인 상태|완료상태에 따른 메시지|
|:-:|:-:|:-:|
|<img width="294" alt="스크린샷 2024-10-18 오후 9 30 39" src="https://github.com/user-attachments/assets/bfeb7a05-4ee4-482a-be13-95b09e1527c2">|<img width="557" alt="스크린샷 2024-10-18 오후 9 30 49" src="https://github.com/user-attachments/assets/8a2de378-ab7e-4521-aefe-60a2b39a9e4e"><br/><img width="548" alt="스크린샷 2024-10-18 오후 9 35 30" src="https://github.com/user-attachments/assets/7404e570-263b-4efb-a266-5814d1ba09e6"> |![화면 기록 2024-10-18 오후 9 34 03](https://github.com/user-attachments/assets/baa5c824-3c42-468b-9e33-7107c4011727)|

다양한 상호작용 요소에서 사용자가 클릭하기 전에 어떤 액션을 취할지 미리 안내하는 툴팁 메시지를 적용하였습니다.<br/>
특히 할 일 완료 기능에서는 완료 상태에 따라 다른 메시지가 표시되며, 최근에 완료된 작업을 쉽게 취소할 수 있는 상호작용 이벤트도 추가하여 사용자가 상태를 손쉽게 변경할 수 있도록 개선하였습니다.

### 스켈레톤

#### 그룹 페이지
![화면 기록 2024-10-18 오후 9 42 27](https://github.com/user-attachments/assets/44a1c38a-b2ce-427f-983c-317a0a6f6318)

#### 베스트 게시글
![화면 기록 2024-10-18 오후 9 44 24](https://github.com/user-attachments/assets/e0cc1b83-d8fe-4abb-87c7-bed27a0918ee)

로딩 중에는 스켈레톤 컴포넌트를 사용하여, 로딩이 완료된 후 표시될 UI를 사용자에게 시각적으로 미리 보여줌으로써 더 나은 경험을 제공하였습니다.

### 진척도 탭

|기존|개선한 진척도|
|:-:|:-:|
|<img width="1206" alt="스크린샷 2024-10-18 오후 10 01 21" src="https://github.com/user-attachments/assets/01f843b9-b37b-46ae-85ad-1ce1f2a1b168">|<img width="1223" alt="스크린샷 2024-10-18 오후 10 01 27" src="https://github.com/user-attachments/assets/b067c023-79ca-4beb-91fe-cc4c48e0aa85">|

기존에는 목록에 대해 전체 진행 사항만 확인할 수 있었으나, 진척도 탭을 추가하여 각 목록별로 오늘의 할 일을 얼마나 마쳤는지를 개별적으로 확인할 수 있게 되었습니다.



<br/>


## 추가 기능

### 조회수

|본문|조회수 영역|
|:-:|:-:|
|<img width="1194" alt="스크린샷 2024-10-18 오후 9 39 40" src="https://github.com/user-attachments/assets/73c0fc18-fc94-4af3-a852-f92a1cd4836b">|<img width="203" alt="스크린샷 2024-10-18 오후 9 40 08" src="https://github.com/user-attachments/assets/b7089ab8-2324-442e-bb8b-37c10169d76d">|


Firebase를 활용하여 각 게시글별로 조회수를 확인할 수 있는 기능을 구현하였으며, 중복 집계를 방지하기 위해 페이지를 새로고침하더라도 조회수가 자동으로 갱신되지 않도록 설계했습니다.<br/>
이를 통해 보다 정확한 조회수 통계를 제공하고, 사용자 행동에 따른 불필요한 데이터 누적을 방지하여 시스템 성능을 최적화하였습니다.


### 댓글 이모지

|이모지 종류|댓글|
|:-:|:-:|
|<img width="292" alt="스크린샷 2024-10-18 오후 9 50 05" src="https://github.com/user-attachments/assets/7fd5dd1e-7d0b-4091-a3fa-37c9ab8af5ea">|<img width="594" alt="스크린샷 2024-10-18 오후 9 49 59" src="https://github.com/user-attachments/assets/ae9e2219-97cf-4acb-b6f8-15c3d090b102">|


카카오톡의 채팅 공감 기능을 참고하여 답글을 달지 않더라도 다른 사용자의 댓글에 간편하게 반응할 수 있도록 이모티콘 기능을 Firebase를 활용해 설계하고 추가하였습니다. <br/>
이를 통해 사용자들이 다른 팀원들과 더 쉽게 상호작용할 수 있습니다.

### 일정 즐겨찾기

![화면 기록 2024-10-18 오후 9 55 59](https://github.com/user-attachments/assets/1577139c-ff18-4fee-92cf-88ad6d597aca)

팀 일정 관리 서비스의 기능을 개선하여 효율성을 높였습니다. <br/>
기존에는 팀원 간 모든 일정을 공유했으나, 개인별 업무 중요도와 특성이 다를 것이라는 생각이 들었습니다.<br/>
이에 따라 개인화된 즐겨찾기 기능을 추가했습니다. <br/>
즐겨찾기는 사용자 개인만 접근 가능하여, 다른 팀원들에게는 표시되지 않습니다. <br/>
결과적으로 팀 전체의 일정 공유는 유지하면서도 개인별 맞춤 일정 관리가 가능해져, 팀 내 업무 효율성이 크게 향상됩니다.<br/>




## 프로젝트 후기

최민경 -

강효성 -

서향 - 

오조환 - 
