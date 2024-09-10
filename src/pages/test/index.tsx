import BaseButton from '@/components/button/baseButton';
import FloatingButton from '@/components/button/floatingButton';
import CircleButton from '@/components/button/CircleButton';
import ArrowButton from '@/components/button/arrowButton';
import CalendarButton from '@/components/button/calendarButton';
import EditButton from '@/components/button/editButton';
import EnterButton from '@/components/button/enterButton';
import PickerButton from '@/components/button/pickerButton';
import RadioButton from '@/components/button/radioButton';

function BoardPage() {
  return (
    <div className='flex flex-col items-center gap-20'>
      <div className='flex items-center gap-10'>
        <BaseButton
          type='button'
          color='bgNon'
          className='w-100 h-55 '
          text='생성하기'
          disabled
        />
        <BaseButton
          type='button'
          color='primary'
          className='w-100 h-55 '
          text='생성하기'
        />
        <BaseButton
          type='button'
          color='primary'
          className='w-100 h-55 '
          text='생성하기'
          disabled
        />
        <BaseButton
          type='button'
          color='outlined'
          className='w-100 h-55 '
          text='생성하기'
        />
        <BaseButton
          type='button'
          color='outlined'
          className='w-100 h-55 '
          text='생성하기'
          disabled
        />
        <BaseButton
          type='button'
          color='red'
          className='w-136 h-55 '
          text='생성하기'
          disabled
        />
      </div>
      <div className='flex flex-col items-center gap-10'>
        <div className='flex items-center gap-10'>
          <FloatingButton
            color='outlined'
            icon='checkGreen'
            text='완료 취소하기'
            className='w-138 h-30'
          />
          <div className='flex items-center gap-10'>
            <FloatingButton
              color='primary'
              icon='checkWhite'
              text='완료하기'
              className='w-115'
            />
            <FloatingButton
              color='primary'
              icon='checkWhite'
              text='완료하기'
              className='w-112'
            />
          </div>
        </div>
      </div>
      <CircleButton text='써클' className='w-30 h-30' />
      <div className='flex items-center gap-10'>
        <ArrowButton direction='left' />
        <ArrowButton direction='right' />
      </div>
      <div className='flex items-center gap-10'>
        <EditButton size='sm' className='w-20 h-20' />
        <EditButton size='lg' className='w-27 h-27' />
      </div>
      <CalendarButton className='bg-background-secondary w-30 h-30' />
      <div className='flex items-center gap-10'>
        <EnterButton />
        <EnterButton />
      </div>
      <div className='flex items-center gap-10'>
        <PickerButton />
        <PickerButton />
      </div>

      <div className='flex items-center gap-10'>
        <RadioButton />
        <RadioButton />
      </div>
    </div>
  );
}

export default BoardPage;
