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

export default function Home() {
  return (
    <main>
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
      <Button disabled type='button' color='primary' className='w-full'>
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
    </main>
  );
}
