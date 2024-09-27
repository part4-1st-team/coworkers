import Button from '@/components/button/button';
import Input from '@/components/input/input';
import Label from '@/components/form/Label';
import ModifyProfile from '@/components/member/modifyProfile';
import useToast from '@/components/toast/useToast';
import useImageMutation from '@/hooks/useImageMutation';
import useUser from '@/hooks/useUser';
import { patchUser } from '@/services/userAPI';
import { PatchUserType } from '@/types/userAPIType';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import ChangePasswordButton from './ChangePasswordButton';
import UserSecessionButton from './UserSecessionButton';
import FormFieldSet from '@/components/form/FormFieldset';
import Head from 'next/head';
import useUserStore from '@/stores/userStore';
import GoogleIcon from '@/components/icon/Google';
import KakaoIcon from '@/components/icon/Kakao';
import TooltipWrapper from '@/components/tooltip/TooltipWrapper';
import LoginIcon from './LoginIcon';
import AccountSettingForm from './AccountSettingForm';

function AccountSetting() {
  // const { isSocialLogin } = useUserStore();

  const isSocialLogin: 'kakao' | 'google' | null = 'kakao';
  return (
    <>
      <Head>
        <title>계정 설정 페이지</title>
      </Head>
      <main className='auth-container'>
        <div className='flex flex-col gap-24'>
          <h2 className='text-xl font-bold text-text-primary dark:text-text-primary-dark'>
            계정 설정
          </h2>
          <AccountSettingForm />
          <div className='flex justify-between'>
            <UserSecessionButton />
            {!isSocialLogin && <ChangePasswordButton />}
          </div>
        </div>
      </main>
    </>
  );
}

export default AccountSetting;
