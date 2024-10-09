import useModalStore from '@/stores/ModalStore';
import Button from '../button/button';
import PasswordChangeForm from '../PasswordChangeForm';
import Modal from './Modal';

function PasswordChangeModal() {
  const { setModalClose } = useModalStore();

  return (
    <section className='pt-32 px-36'>
      <div className='mb-16 text-center'>
        <Modal.Title title='비밀번호 변경하기' />
      </div>

      <PasswordChangeForm
        type='modal'
        submitButton={
          <Modal.Buttons className='w-full tablet:w-320'>
            <Button
              type='button'
              color='white'
              onClick={setModalClose}
              className='w-136 flex-1'
            >
              닫기
            </Button>
            <Button type='submit' color='primary' className='w-136 flex-1'>
              변경하기
            </Button>
          </Modal.Buttons>
        }
      />
    </section>
  );
}

export default PasswordChangeModal;
