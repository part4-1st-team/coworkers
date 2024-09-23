import Button from '@/components/button/button';
import PasswordChangeForm from '@/components/PasswordChangeForm';

// 비밀번호 재설정 페이지 내용
function PasswordChangeContent() {
  return (
    <main className='auth-container'>
      <div className='mb-80 text-center'>
        <h2 className='text-4xl font-medium text-text-primary'>
          비밀번호 재설정
        </h2>
      </div>
      <PasswordChangeForm
        type='page'
        submitButton={
          <Button color='primary' type='submit' className='w-full'>
            비밀번호 변경
          </Button>
        }
      />
    </main>
  );
}

export default PasswordChangeContent;
