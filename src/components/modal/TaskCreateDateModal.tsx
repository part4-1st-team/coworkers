import { IconToggleDown } from '@/assets/IconList';
import clsx from 'clsx';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import ModalDescription from './ModalDescription';
import ModalPortal from './ModalPortal';
import ModalTitle from './ModalTitle';

type FrequencyType = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'ONCE';

interface FormState {
  title: string;
  startDate: string;
  frequencyType: FrequencyType;
  memo: string;
}

function TaskCreateDateModal() {
  const { register, handleSubmit } = useForm<FormState>();

  const [isCalendarShow, setIsCalendarShow] = useState<boolean>(false);
  const [isTimeShow, setIsTimeShow] = useState<boolean>(false);

  const handleTaskCreate: SubmitHandler<FormState> = (data) => {
    // NOTE: 할 일 만들기 로직
    alert(JSON.stringify(data));
  };

  return (
    <ModalPortal>
      <div className='flex flex-col gap-[24px] itmes-center pt-[32px] px-[8px]'>
        <div className='flex flex-col text-center gap-[8px]'>
          <ModalTitle title='할 일 만들기' />
          <ModalDescription description='할 일은 실제로 행동 가능한 작업 중심으로<br/>작성해주시면 좋습니다.' />
        </div>
        <form
          className='flex flex-col gap-[24px]'
          onSubmit={handleSubmit(handleTaskCreate)}
        >
          <div className='flex flex-col  gap-[16px]  mb-[8px]'>
            <span className='text-lg font-medium text-text-primary'>
              할 일 제목
            </span>
            <input
              placeholder='할 일 제목을 입력해주세요'
              className='w-full h-[48px] bg-background-secondary border-solid border-white border rounded-[12px] p-[12px]'
              {...register('title')}
            />
          </div>
          <div className='flex flex-col  mb-[8px]'>
            <span className='text-lg font-medium text-text-primary mb-[16px]'>
              시작 날짜 및 시간
            </span>
            <div className='flex gap-[8px]'>
              <input
                onClick={() => {
                  setIsTimeShow(false);
                  setIsCalendarShow((prev) => !prev);
                }}
                placeholder='2024년 7월 29일'
                className='w-[204px] h-[48px] bg-background-secondary border-solid border-white border rounded-[12px] p-[12px]'
              />
              <input
                onClick={() => {
                  setIsCalendarShow(false);
                  setIsTimeShow((prev) => !prev);
                }}
                placeholder='오후 3:30'
                className='w-[124px] h-[48px] bg-background-secondary border-solid border-white border rounded-[12px] p-[12px]'
              />
            </div>
            <div
              className={clsx(
                'mt-[8px] border border-solid border-brand-primary w-full h-[258px] rounded-[12px]',
                !isCalendarShow && 'hidden',
              )}
            />
            <div
              className={clsx(
                'mt-[8px] border border-solid border-brand-primary w-full h-[126px] rounded-[12px]',
                !isTimeShow && 'hidden',
              )}
            />
          </div>
          <div className='flex flex-col gap-[16px]'>
            <span className='text-lg font-medium text-text-primary'>
              반복 설정
            </span>
            <button
              type='button'
              className='flex gap-[8px] items-center w-[109px] h-[44px] text-md font-medium text-text-secondary bg-background-primary px-[12.5px] py-[10px] rounded-[12px]'
            >
              반복 안함 <IconToggleDown />
            </button>
          </div>
          <div className='flex flex-col  gap-[16px] mb-[8px]'>
            <span className='text-lg font-medium text-text-primary'>
              반복 요일
            </span>
            {/* TODO: 요일 버튼 넣기 / display 처리 */}
          </div>
          <div className='flex flex-col gap-[16px] mb-[8px]'>
            <span className='text-lg font-medium text-text-primary'>
              할 일 메모
            </span>
            <textarea placeholder='메모를 입력해주세요' />
          </div>
          <button type='submit'>만들기</button>
        </form>
      </div>
    </ModalPortal>
  );
}

export default TaskCreateDateModal;
