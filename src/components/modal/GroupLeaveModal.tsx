import Button from '@/components/button/button';
import useMemberDeleteMutation from '@/mutations/memberDeleteMutation';
import useModalStore from '@/stores/ModalStore';
import Modal from './Modal';

function GroupLeaveModal({ groupName }: { groupName: string }) {
  const { setModalClose } = useModalStore();
  const leaveGroupMutation = useMemberDeleteMutation(true);

  const user = JSON.parse(localStorage.getItem('User')!);

  const handleLeaveGroup = () => {
    leaveGroupMutation.mutate(user.id);
  };

  return (
    <Modal.Alert>
      <div className='mt-16 mb-24 flex flex-col gap-8 items-center text-center'>
        <Modal.Title title='그룹에서 나가시겠습니까?' />
        <Modal.Description
          description={`그룹에서 나가면 더 이상 '<b>${groupName}</b>' 에서 활동할 수 없으며,<br/>다시 참여하려면 초대가 필요합니다.`}
        />
      </div>
      <Modal.Buttons>
        <Button
          type='button'
          onClick={setModalClose}
          color='white'
          className='w-full'
        >
          취소
        </Button>
        <Button
          type='button'
          onClick={handleLeaveGroup}
          color='red'
          className='w-full'
        >
          그룹 나가기
        </Button>
      </Modal.Buttons>
    </Modal.Alert>
  );
}

export default GroupLeaveModal;
