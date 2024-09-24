import * as yup from 'yup';
import { PASSWORD_EXP, NICKNAME_EXP, EMAIL_EXP } from '@/constants/validate'; // 정규 표현식 상수 가져오기

const signUpSchema = yup.object().shape({
  nickname: yup
    .string()
    .required('닉네임을 입력해주세요.')
    .min(2, '닉네임은 최소 2자리 이상이어야 합니다.')
    .max(20, '닉네임은 최대 20자리 이내로 입력해주세요.')
    .matches(
      NICKNAME_EXP,
      '닉네임은 영어 알파벳, 숫자, 한글로만 구성되어야 하며, 2자리 이상 20자리 이하로 제한됩니다.',
    ),

  email: yup
    .string()
    .email('유효한 이메일을 입력해주세요.')
    .required('이메일을 입력해주세요.')
    .matches(EMAIL_EXP, '유효한 이메일 형식을 입력해주세요.'),

  password: yup
    .string()
    .required('비밀번호를 입력해주세요.')
    .min(8, '비밀번호는 최소 8자리 이상이어야 합니다.')
    .max(12, '비밀번호는 최대 12자리 이내로 입력해주세요.')
    .matches(
      PASSWORD_EXP,
      '영문, 숫자, 특수문자(공백 제외)를 포함 8자리 이상 12자리 이내로 입력해주세요.',
    ),

  passwordConfirmation: yup
    .string()
    .required('비밀번호를 한번 더 입력해주세요.')
    .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다.'),
});

export default signUpSchema;
