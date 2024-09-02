import { SubmitHandler, useForm } from 'react-hook-form';
import CloseWrapper from './CloseWrapper';
import ModalDescription from './ModalDescription';
import ModalPortal from './ModalPortal';
import ModalTitle from './ModalTitle';

interface FormState {
  list: string;
}

function TaskCreateModal() {
  const { handleSubmit, register } = useForm<FormState>();

  const onSubmit: SubmitHandler<FormState> = (data) => {
    // NOTE: alert 지우고 할 일 만드는 함수 구현하기
    alert(JSON.stringify(data));
  };

  return (
    <ModalPortal>
      <CloseWrapper>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='px-[36px] pt-[32px] flex flex-col gap-[24px] items-center'
        >
          <div className=' flex flex-col items-center gap-[16px] '>
            <ModalTitle title='할 일 목록' />
            <input
              placeholder='목록 명을 입력해주세요'
              className='w-[280px] h-[48px]'
              {...register('list')}
            />
          </div>
          <button className='bg-brand-primary text-white rounded-[12px] w-[280px] h-[48px]'>
            만들기
          </button>
        </form>
      </CloseWrapper>
    </ModalPortal>
  );
}

export default TaskCreateModal;
