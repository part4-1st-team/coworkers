import useToast from '@/components/toast/useToast';
import useQueryParameter from '@/hooks/useQueryParameter';
import { deleteGroupMember } from '@/services/GroupAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

/**
 *
 * @param self true이면 그룹에서 스스로 나가기 / false면 그룹장이 내보내기
 * @returns
 */
function useMemberDeleteMutation(self?: boolean) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { groupId } = useQueryParameter();
  const router = useRouter();

  return useMutation({
    mutationFn: (memberId: number) => deleteGroupMember(groupId, memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['group', groupId],
      });
      if (self) {
        router.replace('/groups');
        toast('Success', '그룹 탈퇴가 완료되었습니다.');
      } else {
        toast('Success', '해당 사용자를 그룹에서 내보냈습니다.');
      }
    },
  });
}

export default useMemberDeleteMutation;
