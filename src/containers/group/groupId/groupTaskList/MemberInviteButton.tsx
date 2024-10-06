import MemberInviteModal from '@/components/modal/MemberInviteModal';
import { getGroupInvitation } from '@/services/GroupAPI';
import useToast from '@/components/toast/useToast';
import useModalStore from '@/stores/ModalStore';
import { useMutation } from '@tanstack/react-query';

interface MemberInviteButtonProps {
  groupId: number;
}

function MemberInviteButton({ groupId }: MemberInviteButtonProps) {
  const { setModalOpen } = useModalStore();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: () => getGroupInvitation(groupId),
    onSuccess: (data) => {
      setModalOpen(<MemberInviteModal inviteLink={data} />);
    },
    onError: () => {
      toast('Error', '초대 링크 생성에 실패했습니다.');
    },
  });

  const handleInviteClick = () => {
    mutation.mutate();
  };

  return (
    <button
      type='button'
      onClick={handleInviteClick}
      className='text-brand-primary text-md font-normal'
    >
      + 새로운 멤버 초대하기
    </button>
  );
}

export default MemberInviteButton;
