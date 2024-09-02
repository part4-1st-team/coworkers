import { SubmitHandler, useForm } from 'react-hook-form';
import ModalDescription from './ModalDescription';
import ModalPortal from './ModalPortal';
import ModalTitle from './ModalTitle';

interface FormState {
  title: string;
  memo: string;
}

function TaskCreateModalWithMemo() {
  const { register, handleSubmit } = useForm<FormState>();

  const onSubmit: SubmitHandler<FormState> = (data) => {
    // NOTE: 할 일 만드는 함수로 수정
    alert(JSON.stringify(data));
  };

  return (
    <ModalPortal>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='pt-[32px] px-[36px] flex flex-col items-center'
      >
        <div className='mb-[24px] w-full'>
          <div className='flex flex-col items-center text-center'>
            <ModalTitle title='할 일 만들기' />
            <ModalDescription description='할 일은 실제로 행동 가능한 작업 중심으로<br/>작성해주시면 좋습니다.' />
          </div>
          <div className='my-[16px]'>
            <label htmlFor='title' className='text-lg font-medium text-white '>
              할 일 제목
            </label>
            <input
              id='title'
              {...register('title')}
              placeholder='할 일 제목을 입력해주세요.'
              className='w-full h-[48px] mt-[8px]'
            />
          </div>

          <div>
            <label
              htmlFor='memo'
              className='text-lg font-medium text-white mb-[8px]'
            >
              할 일 메모
            </label>
            <input
              id='memo'
              {...register('memo')}
              placeholder='메모 입력해주세요.'
              className='w-full h-[75px] '
            />
          </div>
        </div>
        {/* TODO: input 컴포넌트로 변경 */}

        <button className='bg-brand-primary text-white rounded-[12px] w-[280px] h-[48px]'>
          만들기
        </button>

        {/* TODO: 버튼 컴포넌트로 변경 */}
      </form>
    </ModalPortal>
  );
}

export default TaskCreateModalWithMemo;
