import Button from '@/components/button/button';
import Calendar, { CalendarInput } from '@/components/calendar/Calendar';
import FormFieldSet from '@/components/form/FormFieldset';
import BoxInput from '@/components/input/boxInput';
import Input from '@/components/input/input';
import RepeatDropdown from '@/containers/group/groupId/dropdown/RepeatDropdown';
import WeeklyDatePicker from '@/containers/group/groupId/tasklist/WeeklyDatePicker';
import { postRecurring } from '@/services/TaskAPI';
import useModalStore from '@/stores/ModalStore';
import combineDateTime from '@/utils/combineDateTime';
import getMonthDay from '@/utils/getMonthDay';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
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

  const [weekDays, setWeekDays] = useState<number[]>([]);
  const [monthDay, setMonthDay] = useState<Date>(new Date());

  const queryClient = useQueryClient();

  const { setModalClose } = useModalStore();

  // 할 일 생성하는 mutation 함수
  const TaskCreateMutation = useMutation({
    mutationFn: (data: PostRecurring) =>
      postRecurring(groupId, taskListId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getTasks', groupId, taskListId, getMonthDay(selectedDate)],
      });
      setModalClose();
    },
    onError: () => {},
  });

  // 최종적으로 submit 됐을때 실행하는 함수
  const handleTaskCreate: SubmitHandler<FormState> = (data) => {
    const { title, memo } = data;

    const task: PostRecurring = {
      name: title,
      description: memo,
      startDate: selectedDate,
      frequencyType: frequency,
    };

    if (frequency === 'WEEKLY') task.weekDays = weekDays;
    if (frequency === 'MONTHLY') task.monthDay = monthDay.getDate();

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
        <FormFieldSet id='title' label='할 일 제목'>
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
        </FormFieldSet>

        <FormFieldSet id='calendar' label='시작 날짜 및 시간'>
          <Calendar
            trigger={<CalendarInput />}
            pickDate={selectedDate}
            setPickDate={setSelectedDate}
            min
          />
        </FormFieldSet>
        <FormFieldSet id='frequency' label='반복 설정'>
          <RepeatDropdown frequency={frequency} handleClick={setFrequency} />
        </FormFieldSet>

        <FormFieldSet
          id='frquency-day'
          label='반복 요일'
          className={clsx(frequency === 'WEEKLY' ? 'flex' : 'hidden')}
        >
          <WeeklyDatePicker handleClick={setWeekDays} />
        </FormFieldSet>

        <FormFieldSet
          id='frequency-date'
          label='반복 날짜'
          className={clsx(frequency === 'MONTHLY' ? 'flex' : 'hidden')}
        >
          <Calendar
            trigger={
              <button
                type='button'
                className='w-full h-48 py-10 px-12 rounded-12 border border-border-primary dark:bg-dropdown-button dark:border-none text-text-default text-md font-medium'
              >
                {`매달 ${monthDay.getDate()}일 반복`}
              </button>
            }
            pickDate={monthDay}
            setPickDate={setMonthDay}
          />
        </FormFieldSet>

        <FormFieldSet id='memo' label='할 일 메모'>
          <Controller
            name='memo'
            control={control}
            render={({ field }) => (
              <BoxInput placeholder='메모를 입력해주세요' {...field} />
            )}
          />
        </FormFieldSet>

        <Button type='submit' color='primary' className=''>
          만들기
        </Button>
      </form>
    </div>
  );
}

export default TaskCreateDateModal;
