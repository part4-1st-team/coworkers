// export default function Home() {
//   return <main></main>;
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
import Input from '@/components/input/input';

export default function Home() {
  return (
    <main>
      <Button
        type='button'
        color='primary'
        icon={
          <Image
            src='/svgs/ic_check_white.svg'
            alt='Check Icon'
            width={100} // 원하는 크기 설정
            height={100}
            className='w-full' // 테일윈드로 인라인 블록 스타일 추가
          />
        }
      />
      <Button rounded type='button' color='white' className='w-full '>
        dkdk
      </Button>
      <ArrowButton direction='left' />
      <ArrowButton direction='right' />
      <EditButton size='small' />
      <EnterButton />
      <PickerButton />
      <CalendarButton />
      <RadioButton />
      <FloatingButton type='cancel' className='w-[114px] h-10' />
      <RadioButton />
      <Input fullWidth placeholder='비밀번호를 입력해주세요' className='h-14' />
    </main>
  );
}
