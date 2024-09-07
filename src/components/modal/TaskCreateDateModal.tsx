import { IconToggleDown } from '@/assets/IconList';
import clsx from 'clsx';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Button from '../button/button';
import BoxInput from '../input/boxInput';
import Input from '../input/input';
import ModalDescription from './ModalDescription';
import ModalTitle from './ModalTitle';

interface FormState {
  title: string;
  startDate: string;
  frequencyType: FrequencyType;
  memo: string;
}

function TaskCreateDateModal() {
  const { control, handleSubmit } = useForm<FormState>();

  const [isCalendarShow, setIsCalendarShow] = useState<boolean>(false);
  const [isTimeShow, setIsTimeShow] = useState<boolean>(false);

  const handleTaskCreate: SubmitHandler<FormState> = (data) => {
    // NOTE: 할 일 만들기 로직
    alert(JSON.stringify(data));
  };

  return (
    <div className='flex flex-col gap-24 itmes-center pt-32 px-8  overflow-y-auto'>
      <div className='flex flex-col text-center gap-8'>
        <ModalTitle title='할 일 만들기' />
        <ModalDescription description='할 일은 실제로 행동 가능한 작업 중심으로<br/>작성해주시면 좋습니다.' />
      </div>
      <form
        className='flex flex-col gap-24'
        onSubmit={handleSubmit(handleTaskCreate)}
      >
        <div className='flex flex-col gap-16 mb-8'>
          <span className='text-lg font-medium text-text-primary'>
            할 일 제목
          </span>

          <Controller
            name='title'
            control={control}
            render={({ field }) => (
              <Input
                placeholder='할 일 제목을 입력해주세요'
                {...field}
                className='w-full h-48 tablet:min-w-280'
              />
            )}
          />
        </div>
        <div className='flex flex-col  mb-8'>
          <span className='text-lg font-medium text-text-primary mb-16'>
            시작 날짜 및 시간
          </span>
          <div className='flex gap-8'>
            <input
              onClick={() => {
                setIsTimeShow(false);
                setIsCalendarShow((prev) => !prev);
              }}
              placeholder='2024년 7월 29일'
              className='w-204 h-48 bg-background-secondary border-solid border-white border rounded-12 p-12'
            />
            <input
              onClick={() => {
                setIsCalendarShow(false);
                setIsTimeShow((prev) => !prev);
              }}
              placeholder='오후 3:30'
              className='w-124 h-48 bg-background-secondary border-solid border-white border rounded-12 p-12'
            />
          </div>
          <div
            className={clsx(
              'mt-8 border border-solid border-brand-primary w-full h-258 rounded-12',
              !isCalendarShow && 'hidden',
            )}
          />
          <div
            className={clsx(
              'mt-8 border border-solid border-brand-primary w-full h-126 rounded-12',
              !isTimeShow && 'hidden',
            )}
          />
        </div>
        <div className='flex flex-col gap-16'>
          <span className='text-lg font-medium text-text-primary'>
            반복 설정
          </span>
          <button
            type='button'
            className='flex gap-8 items-center w-109 h-[44px] text-md font-medium text-text-secondary bg-background-primary px-[12.5px] py-[10px] rounded-[12px]'
          >
            반복 안함 <IconToggleDown />
          </button>
        </div>
        <div className='flex flex-col  gap-16 mb-8'>
          <span className='text-lg font-medium text-text-primary'>
            반복 요일
          </span>
          {/* TODO: 요일 버튼 넣기 / display 처리 */}
        </div>
        <div className='flex flex-col gap-16 mb-8'>
          <span className='text-lg font-medium text-text-primary'>
            할 일 메모
          </span>
          <BoxInput placeholder='메모를 입력해주세요' />
        </div>
        <Button type='submit' color='primary' className=''>
          만들기
        </Button>
      </form>
    </div>
  );
}

export default TaskCreateDateModal;
