import { IconSecession } from '@/assets/IconList';
import Input from '@/components/input/input';
import MemberDeleteModal from '@/components/modal/MemberDeleteModal';
import PasswordChangeModal from '@/components/modal/PasswordChangeModal';
import useModalStore from '@/stores/ModalStore';
import { Controller, useForm } from 'react-hook-form';

interface FormState {
  name: string;
  email: string;
  password: string;
}

function AccountSetting() {
  const { control } = useForm<FormState>();

  const { modalId, setModalOpen } = useModalStore();

  return (
    <main className='main-container'>
      <div className='flex flex-col gap-[24px]'>
        <h2 className='text-xl font-bold text-text-primary'>계정 설정</h2>
        <div className='size-[64px] rounded-[50%] bg-background-tertiary text-text-primary flex justify-center items-center'>
          임시
        </div>
        <form className='flex flex-col gap-[24px]'>
          <Controller
            name='name'
            control={control}
            defaultValue='우지은'
            render={({ field }) => (
              <Input label='이름' type='text' {...field} />
            )}
          />
          <Controller
            name='email'
            control={control}
            defaultValue='codeit@codeit.com'
            render={({ field }) => (
              <Input label='이메일' disabled type='text' {...field} />
            )}
          />
          <div className='relative'>
            <Controller
              name='password'
              control={control}
              defaultValue='12341234'
              render={({ field }) => (
                <Input label='비밀번호' type='password' {...field} />
              )}
            />
            <button
              className='absolute right-[10px] bottom-[6px]  bg-brand-primary w-[96px] h-[36px] rounded-xl text-white text-xs'
              type='button'
              onClick={() => setModalOpen('password-change')}
            >
              임시 변경
            </button>
          </div>
          {modalId === 'password-change' && <PasswordChangeModal />}
        </form>
        <button
          type='button'
          onClick={() => setModalOpen('secession')}
          className='text-status-danger flex gap-[8px] items-center'
        >
          <IconSecession /> <span>회원 탈퇴하기</span>
        </button>
        {modalId === 'secession' && <MemberDeleteModal />}
      </div>
    </main>
  );
}

export default AccountSetting;
