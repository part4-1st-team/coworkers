import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Button from '../button/button';
import Input from '../input/input';
import Modal from './Modal';

interface FormState {
  title: string;
  memo: string;
}

function TaskCreateModalWithMemo() {
  const { control, handleSubmit } = useForm<FormState>();

  const onSubmit: SubmitHandler<FormState> = (data) => {
    // NOTE: 할 일 만드는 함수로 수정
    alert(JSON.stringify(data));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='pt-32 px-36 flex flex-col items-center'
    >
      <div className='mb-24 w-full'>
        <div className='flex flex-col items-center text-center'>
          <Modal.Title title='할 일 만들기' />
          <Modal.Description description='할 일은 실제로 행동 가능한 작업 중심으로<br/>작성해주시면 좋습니다.' />
        </div>
        <div className='my-16'>
          <span className='text-lg font-medium text-white '>할 일 제목</span>

          <Controller
            name='title'
            control={control}
            render={({ field }) => (
              <Input
                placeholder='할 일 제목을 입력해주세요.'
                {...field}
                className='w-full h-48 tablet:min-w-280 mt-8'
              />
            )}
          />
        </div>

        <div>
          <span className='text-lg font-medium text-white mb-8'>
            할 일 메모
          </span>

          <Controller
            name='memo'
            control={control}
            render={({ field }) => (
              <Input
                placeholder='메모를 입력해주세요.'
                {...field}
                className='w-full h-48 tablet:min-w-280'
              />
            )}
          />
        </div>
      </div>

      <Button type='submit' className='w-full' color='primary'>
        만들기
      </Button>
    </form>
  );
}

export default TaskCreateModalWithMemo;
