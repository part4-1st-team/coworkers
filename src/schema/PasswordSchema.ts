import * as yup from 'yup';
import { PASSWORD_EXP } from '@/constants/validate';

const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .max(12, '비밀번호는 12자리 이내로 입력해주세요.')
    .matches(
      PASSWORD_EXP,
      '영문, 숫자, 특수문자(공백 제외)를 포함 8자리 이상 12자리 이내로 입력해주세요',
    )
    .required('비밀번호를 입력해주세요'),

  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다')
    .required('비밀번호를 한번 더 입력해주세요'),
});

export default passwordSchema;
