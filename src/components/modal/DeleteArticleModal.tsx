import { IconAlert } from '@/assets/IconList';
import useModalStore from '@/stores/ModalStore';
import Button from '../button/button';
import Modal from './Modal';

interface DeleteArticleModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

function DeleteArticleModal({ onConfirm, onCancel }: DeleteArticleModalProps) {
  const { setModalClose } = useModalStore();

  return (
    <div className='flex flex-col items-center px-36 pt-24'>
      <IconAlert />
      <div className='mt-16 mb-24 flex flex-col gap-8 items-center text-center'>
        <Modal.Title title='게시글 삭제 확인' />
        <Modal.Description description='정말 이 게시글을 삭제하시겠습니까?' />
      </div>

      <Modal.Buttons>
        <Button
          type='button'
          color='white'
          onClick={() => {
            setModalClose();
            onCancel();
          }}
          className='w-full'
        >
          닫기
        </Button>
        <Button
          type='button'
          color='red'
          onClick={() => {
            setModalClose();
            onConfirm();
          }}
          className='w-full'
        >
          삭제하기
        </Button>
      </Modal.Buttons>
    </div>
  );
}

export default DeleteArticleModal;
