import Input from '@/components/input/input';

export default function Home() {
  return (
    <main>
      <div className='grid grid-m-8 gap-10 p-20'>
        <Input
          type='text'
          id='email'
          placeholder='테스트'
          // errorMessage='에러있음'
        />
        <Input
          label='이메일'
          id='email'
          placeholder='이메일을 입력해 주세요'
          disabled
          // errorMessage='에러있음'
        />
        <Input
          type='password'
          label='비밀번호 '
          id='password'
          placeholder='비밀번호를 입력해주세요'
          // errorMessage='비밀번호가 틀렸습니다.'
          disabled
        />
      </div>
    </main>
  );
}
