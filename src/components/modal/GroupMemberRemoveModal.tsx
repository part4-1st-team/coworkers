import useMemberDeleteMutation from '@/mutations/memberDeleteMutation';
import useModalStore from '@/stores/ModalStore';
import Button from '../button/button';
import Modal from './Modal';

function GroupMemberRemoveModal({
  userId,
  userName,
  groupId,
}: {
  userId: number;
  userName: string;
  groupId: number;
}) {
  const { setModalClose } = useModalStore();
  const leaveGroupMutation = useMemberDeleteMutation(groupId);

  const handleRemoveGroupMember = () => {
    leaveGroupMutation.mutate(userId);
    setModalClose();
  };

  return (
    <Modal.Alert>
      <div className='mt-16 mb-24 flex flex-col gap-8 items-center text-center'>
        <Modal.Title title='해당 멤버를 그룹에서 내보내시겠습니까?' />
        <Modal.Description
          description={`멤버 '<b>${userName}</b>' 님은 그룹 활동에 더 이상 참여할 수 없습니다.<br/>정말로 내보내시겠습니까?`}
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
          onClick={handleRemoveGroupMember}
          color='red'
          className='w-full'
        >
          그룹 내보내기
        </Button>
      </Modal.Buttons>
    </Modal.Alert>
  );
}

export default GroupMemberRemoveModal;
