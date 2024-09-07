// export default function Home() {
//   return <main>main page</main>;
// }

import Button from '@/components/button/button';
import EditButton from '@/components/button/editButton';
import ArrowButton from '@/components/button/arrowButton';
import EnterButton from '@/components/button/enterButton';
import PickerButton from '@/components/button/pickerButton';
import CalendarButton from '@/components/button/calendarButton';
import RadioButton from '@/components/button/radioButton';
import FloatingButton from '@/components/button/floatingButton';
import Image from 'next/image';
import BoxInput from '@/components/input/boxInput';
import InputReply from '@/components/input/replyInput';
import { useState } from 'react';
import AuthInput from '@/components/input/authInput';
import { useForm } from 'react-hook-form';
import Input from '@/components/input/input';
import AccountSettingInputInput from '@/components/input/accountSettingInput';
import EditInput from '@/components/input/editCommentInput';

export default function Home() {
  const [text, setText] = useState(''); // 텍스트 입력 상태

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const { control } = useForm();
  return (
    <main>
      <div className=''>
        <Button
          type='button'
          color='primary'
          icon={
            <Image
              src='/images/img_logo_small.svg'
              alt='Check Icon'
              width={100} // 원하는 크기 설정
              height={100}
              className='w-full' // 테일윈드로 인라인 블록 스타일 추가
            />
          }
        />
        <Button disabled type='button' color='outline' className='w-full'>
          dkdk
        </Button>
        <ArrowButton direction='left' />
        <ArrowButton direction='right' />
        <EditButton size='large' />
        <EnterButton />
        <PickerButton />
        <CalendarButton />
        <RadioButton />
        <FloatingButton type='add' className='w-144 h-10' />
        <RadioButton />
        <div className='w-400 flex flex-col gap-15 items-center mb-10 mb-10'>
          <BoxInput
            value={text}
            onChange={handleTextChange}
            rows={3}
            className='w-235'
          />
          <InputReply
            value={text}
            onChange={handleTextChange}
            rows={1}
            className=''
          />

          <AuthInput
            control={control}
            name='password'
            type='password'
            errorMessage='비밀번호는 필수입니다.'
            className=''
            placeholder='비밀번호를 입력해주세요'
          />

          <AuthInput
            placeholder='자고싶다'
            control={control}
            name='email'
            type='email'
            className=''
          />
          <Input className='py-[10.5px] px-[16px] w-[550px]' />
          <AccountSettingInputInput
            placeholder='비밀번호'
            control={control}
            name='password'
            type='password'
            className=''
          />
          <AccountSettingInputInput
            placeholder='이메일을 입력해주세요.'
            control={control}
            name='email'
            type='email'
            className=''
          />
          <EditInput
            value={text}
            onChange={handleTextChange}
            rows={1}
            className=''
          />
        </div>
      </div>
    </main>
  );
}
