// 비밀번호 유효성 검사식
export const PASSWORD_EXP =
  /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}[^\s]*$/;

// 이메일 유효성 검사식
export const EMAIL_EXP = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// 닉네임 유효성 검사식
export const NICKNAME_EXP = /^[a-zA-Z0-9가-힣]{2,20}$/;
