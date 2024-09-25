import useQueryParameter from '@/hooks/useQueryParameter';
import { deleteGroup } from '@/services/GroupAPI';
import useModalStore from '@/stores/ModalStore';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import Button from '@/components/button/button';
import useToast from '@/components/toast/useToast';
import Modal from './Modal';

function GroupDeleteModal() {
  const { setModalClose } = useModalStore();
  const { groupId } = useQueryParameter();
  const { toast } = useToast();
  const router = useRouter();

  const groupDeleteMutation = useMutation({
    mutationFn: () => deleteGroup(groupId),
    onSuccess: () => {
      router.replace('/groups');
      toast('Success', '그룹이 성공적으로 삭제되었습니다.');
    },
    onError: () => {
      toast('Error', '그룹을 삭제하는데 실패했습니다.');
    },
  });

  const handleGroupDelete = () => {
    groupDeleteMutation.mutate();
  };

  return (
    <Modal.Alert>
      <div className='mt-16 mb-24 flex flex-col gap-8 items-center text-center'>
        <Modal.Title title='그룹을 삭제하시겠습니까?' />
        <Modal.Description description='해당 그룹이 삭제되며,<br/>그룹에 있는 할 일 목록들이 전부 삭제됩니다.' />
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
          onClick={handleGroupDelete}
          color='red'
          className='w-full'
        >
          그룹 삭제
        </Button>
      </Modal.Buttons>
    </Modal.Alert>
  );
}

export default GroupDeleteModal;
