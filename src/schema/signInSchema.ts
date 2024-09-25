// src/schemas/signInSchema.ts
import * as yup from 'yup';

const signInSchema = yup.object().shape({
  email: yup
    .string()
    .email('유효한 이메일을 입력하세요.')
    .required('이메일은 필수 항목입니다.'),
  password: yup
    .string()
    .min(8, '비밀번호는 최소 8자리 이상이어야 합니다.')
    .required('비밀번호는 필수 항목입니다.'),
});

export default signInSchema;
