import Head from 'next/head';
import AccountSettingForm from './AccountSettingForm';
import ChangePasswordButton from './ChangePasswordButton';
import UserSecessionButton from './UserSecessionButton';

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
