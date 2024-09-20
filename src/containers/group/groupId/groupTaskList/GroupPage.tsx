// 컴포넌트 import
import MemberInfo from '@/components/member/MemberInfo';
import { useRouter } from 'next/router';
import EmptyGroup from './EmptyGroup';
import GroupBar from './GroupBar';
import GroupTask from './GroupTask';
import GroupReport from './GroupReport';
import GroupMembers from './GroupMembers';

// mock data
const MockGroupTask: MockGroup = {
  name: '나의 그룹',
  id: 771,
  tasklists: [
    {
      id: 7701,
      name: '심화 프로젝트',
      tasks: [
        { id: 77011, name: '마이 페이지', done: false },
        { id: 77012, name: '그룹 페이지', done: false },
        { id: 77013, name: '로그인 페이지', done: true },
      ],
    },
    {
      id: 7702,
      name: '고양이 돌보기',
      tasks: [
        { id: 77021, name: '감자 캐기', done: true },
        { id: 77022, name: '맘마 챙기기', done: true },
        { id: 77023, name: '놀아주기', done: true },
        { id: 77024, name: '털 빗기', done: true },
        { id: 77025, name: '물리기', done: true },
      ],
    },
    {
      id: 7703,
      name: '오늘 하루 힘내기',
      tasks: [
        { id: 77031, name: '힘내기1', done: true },
        { id: 77032, name: '힘내기2', done: true },
        { id: 77033, name: '개수 채우는 데이터', done: true },
        { id: 77034, name: '흐아앙', done: false },
      ],
    },
  ],
  members: [
    {
      id: 11,
      role: 'ADMIN',
      userImage: 'string',
      userEmail: 'admin1@email.com',
      userName: '그룹주인',
    },
    {
      id: 12,
      role: 'MEMBER',
      userImage: 'string',
      userEmail: 'member1@email.com',
      userName: '멤버1',
    },
    {
      id: 13,
      role: 'MEMBER',
      userImage: 'string',
      userEmail: 'member2@email.com',
      userName: '멤버2',
    },
    {
      id: 14,
      role: 'MEMBER',
      userImage: 'string',
      userEmail: 'member3@email.com',
      userName: '멤버3',
    },
    {
      id: 15,
      role: 'MEMBER',
      userImage: 'string',
      userEmail: 'member4@email.com',
      userName: '멤버4',
    },
  ],
};

const { name, id, tasklists, members } = MockGroupTask;

const MockGroupList: MockGroup[] = [MockGroupTask];

function GroupPage() {
  const router = useRouter();
  const { groupId } = router.query;

  return MockGroupList.length === 0 ? (
    <EmptyGroup />
  ) : (
    <div className='w-full h-full bg-background-primary text-text-primary text-lg px-24'>
      <section className='w-full desktop:w-1200 desktop:mx-auto pt-24'>
        {/* TODO 데이터 연동, 설정 클릭 구현 */}
        <GroupBar>{name}</GroupBar>
        <GroupTask groupId={Number(groupId)} Lists={tasklists} />
        <GroupReport doneCount={5} totalCount={20} />
        <GroupMembers Members={members} />
      </section>
    </div>
  );
}
export default GroupPage;
