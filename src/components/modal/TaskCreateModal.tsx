import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Button from '../button/button';
import Input from '../input/input';

import Modal from './Modal';
import ModalTitle from './ModalTitle';

interface FormState {
  list: string;
}

function TaskCreateModal() {
  const { handleSubmit, control } = useForm<FormState>();

  const onSubmit: SubmitHandler<FormState> = (data) => {
    // NOTE: alert 지우고 할 일 만드는 함수 구현하기
    alert(JSON.stringify(data));
  };

  return (
    <Modal.Close>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='px-36 pt-32 flex flex-col gap-24 items-center w-full'
      >
        <div className='flex flex-col items-center gap-16 w-full'>
          <ModalTitle title='할 일 목록' />
          <Controller
            name='list'
            control={control}
            render={({ field }) => (
              <Input
                placeholder='목록 명을 입력해주세요'
                {...field}
                className='w-full h-48'
              />
            )}
          />
        </div>

        <Button type='submit' className='w-full' color='primary'>
          만들기
        </Button>
      </form>
    </Modal.Close>
  );
}

export default TaskCreateModal;
