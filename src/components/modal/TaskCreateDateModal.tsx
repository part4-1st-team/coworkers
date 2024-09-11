import RepeatDropdown from '@/containers/group/groupId/dropdown/RepeatDropdown';
import { postTask } from '@/services/TaskAPI';
import useModalStore from '@/stores/ModalStore';
import combineDateTime from '@/utils/combineDateTime';
import getMonthDay from '@/utils/getMonthDay';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Button from '../button/button';
import Calendar from '../calendar/Calendar';
import BoxInput from '../input/boxInput';
import Input from '../input/input';
import TimePicker from '../timeSelect/TimePicker';
import Modal from './Modal';

interface FormState {
  title: string;
  memo: string;
}

function TaskCreateDateModal({
  groupId,
  taskListId,
}: {
  groupId: number;
  taskListId: number;
}) {
  const { control, handleSubmit } = useForm<FormState>();

  // 현재 선택한 시간 (오후/오전 시간)
  const [time, setTime] = useState<string>('12:00');

  // 선택한 날짜
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // 반복 설정 (default: 한 번)
  const [frequency, setFrequency] = useState<FrequencyType>('ONCE');

  const queryClient = useQueryClient();

  const { setModalClose } = useModalStore();

  const TaskCreateMutation = useMutation({
    mutationFn: (data: PostTask) => postTask(groupId, taskListId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getTasks', groupId, taskListId, getMonthDay(selectedDate)],
      });
      setModalClose();
    },
    onError: () => {},
  });

  const handleTaskCreate: SubmitHandler<FormState> = (data) => {
    const { title, memo } = data;

    const task: PostTask = {
      name: title,
      description: memo,
      startDate: combineDateTime(selectedDate, time),
      frequencyType: frequency,
    };

    TaskCreateMutation.mutate(task);
  };

  return (
    <div className='flex flex-col gap-24 itmes-center pt-32 px-8 overflow-y-auto'>
      <div className='flex flex-col text-center gap-8'>
        <Modal.Title title='할 일 만들기' />
        <Modal.Description description='할 일은 실제로 행동 가능한 작업 중심으로<br/>작성해주시면 좋습니다.' />
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
          <div className='flex'>
            <Calendar date={selectedDate} setDate={setSelectedDate} />
            <TimePicker setTime={setTime} />
          </div>
        </div>
        <div className='flex flex-col gap-16'>
          <span className='text-lg font-medium text-text-primary'>
            반복 설정
          </span>
          <RepeatDropdown frequency={frequency} handleClick={setFrequency} />
        </div>
        <div
          className={clsx(
            'flex flex-col gap-16 mb-8',
            frequency === 'WEEKLY' ? 'block' : 'hidden',
          )}
        >
          <span className='text-lg font-medium text-text-primary'>
            반복 요일
          </span>
          {/* TODO: 요일 버튼 넣기 / display 처리 */}
        </div>
        <div className='flex flex-col gap-16 mb-8'>
          <span className='text-lg font-medium text-text-primary'>
            할 일 메모
          </span>

          <Controller
            name='memo'
            control={control}
            render={({ field }) => (
              <BoxInput placeholder='메모를 입력해주세요' {...field} />
            )}
          />
        </div>
        <Button type='submit' color='primary' className=''>
          만들기
        </Button>
      </form>
    </div>
  );
}

export default TaskCreateDateModal;
