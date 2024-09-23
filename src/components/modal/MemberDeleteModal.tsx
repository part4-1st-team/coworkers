import Button from '@/components/button/button';
import { deleteUser } from '@/services/userAPI';
import useModalStore from '@/stores/ModalStore';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import useToast from '../toast/useToast';
import Modal from './Modal';

function MemberDeleteModal() {
  const { setModalClose } = useModalStore();

  const router = useRouter();
  const { toast } = useToast();

  const secessionMutation = useMutation({
    mutationFn: () => deleteUser(),
    onSuccess: () => {
      setModalClose();
      router.push('/');
      toast('Success', '회원이 성공적으로 탈퇴되었습니다.');
    },
    onError: () => {
      toast('Error', '회원 탈퇴에 실패했습니다.');
    },
  });

  const handleMemberDelete = () => {
    secessionMutation.mutate();
  };

  return (
    <Modal.Alert>
      <div className='mt-16 mb-24 flex flex-col gap-8 items-center text-center'>
        <Modal.Title title='회원 탈퇴를 진행하시겠어요?' />
        <Modal.Description description='그룹장으로 있는 그룹은 자동으로 삭제되고,<br/>모든 그룹에서 나가집니다.' />
      </div>
      <Modal.Buttons>
        <Button
          type='button'
          onClick={setModalClose}
          color='white'
          className='w-full'
        >
          닫기
        </Button>
        <Button
          type='button'
          onClick={handleMemberDelete}
          color='red'
          className='w-full'
        >
          회원 탈퇴
        </Button>
      </Modal.Buttons>
    </Modal.Alert>
  );
}

export default MemberDeleteModal;
