import EmptyGroup from '@/containers/group/groupId/groupTaskList/EmptyGroup';

// 유저 정보 확인 후 그룹 유무에 따라 그룹 목록 or 빈 페이지
// 그룹 목록 클릭 or 헤더 드롭다운 클릭 시 groupId 할당

function Groups() {
  return <EmptyGroup />;
}
export default Groups;
