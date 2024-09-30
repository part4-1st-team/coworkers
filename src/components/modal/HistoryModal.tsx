import Button from '@/components/button/button';
import useModalStore from '@/stores/ModalStore';
import getDate from '@/utils/getDate';
import Modal from './Modal';

function HistoryModal({ history }: { history: DoneTask }) {
  const { setModalClose } = useModalStore();
  const { name, doneAt, description, deletedAt } = history;
  const isDeleted = !!deletedAt;

  return (
    <Modal.Close>
      <div className='px-36 pt-32 flex flex-col space-y-20 items-center w-full'>
        <Modal.Title
          title={`'<b>${name}</b>' 일정 ${isDeleted ? '(삭제됨)' : ''}`}
        />
        <div className='flex flex-col gap-2 text-center'>
          {!isDeleted && (
            <Modal.Description
              description={
                description ? `내용 : ${description}` : '(내용 없음)'
              }
            />
          )}
          <Modal.Description description={`완료일 : ${getDate(doneAt)}`} />
          {isDeleted && (
            <Modal.Description
              description={`삭제일 : ${getDate(deletedAt)} `}
            />
          )}
        </div>

        <Button
          type='button'
          onClick={setModalClose}
          className='w-full'
          color='primary'
        >
          확인
        </Button>
      </div>
    </Modal.Close>
  );
}

export default HistoryModal;
