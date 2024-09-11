import Image from 'next/image';

import TodoImg from '@/assets/images/img_todo.png';
import DoneImg from '@/assets/images/img_done.png';

// 컴포넌트 import
import MemberInfo from '@/components/memberInfo/MemberInfo';
import EmptyGroup from './EmptyGroup';
import GroupBar from './GroupBar';
import GroupTask from './GroupTask';

// mock data
const userGroups: ResponseGroup[] = [];

const MockTaskList: MockGroup[] = [
  {
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
  },
];

function GroupPage() {
  return userGroups.length !== 0 ? (
    <EmptyGroup />
  ) : (
    <div className='w-full h-full bg-background-primary text-text-primary text-lg px-24'>
      <section className='w-full desktop:w-1200 desktop:mx-auto pt-24'>
        {/* TODO 컴포넌트로 변경, 데이터 연동, 설정 클릭 구현 */}
        <GroupBar>현재 팀 이름</GroupBar>
        {MockTaskList.map((item) => (
          <GroupTask Lists={item.tasklists} />
        ))}
        <section className='w-full mt-48 desktop:mt-64'>
          <p className='mb-16'>리포트</p>
          <section className='w-full h-224 bg-background-secondary rounded-12 flex justify-between p-24'>
            <div className='flex gap-64 items-center'>
              {/* TODO 도넛 차트 */}
              <div className='w-140 h-140 rounded-full bg-brand-secondary'>
                <div className='w-full h-full flex flex-col items-center justify-center tablet:hidden '>
                  <p className='text-xs'>오늘</p>
                  {/* TODO 텍스트 그라데이션 적용 */}
                  <p className='text-20 font-bold'>00%</p>
                </div>
              </div>
              <div className='hidden tablet:flex flex-col gap-16'>
                <div className='text-md'>
                  <p>오늘의</p>
                  <p>진행 상황</p>
                </div>
                {/* TODO 텍스트 그라데이션 적용 (text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-tertiary) */}
                <p className='text-[40px] font-[700]'>00%</p>
              </div>
            </div>
            <section className='w-9/20 max-w-400 flex flex-col gap-16'>
              <div className='w-full h-76 rounded-12 bg-background-tertiary p-16 flex justify-between items-center'>
                <div className='flex flex-col gap-6'>
                  <p className='text-xs'>오늘의 할 일</p>
                  <p className='text-24 text-brand-tertiary font-bold'>20개</p>
                </div>
                <div>
                  <Image
                    src={TodoImg}
                    alt='todo image'
                    width={40}
                    height={40}
                  />
                </div>
              </div>
              <div className='w-full h-76 rounded-12 bg-background-tertiary p-16 flex justify-between items-center'>
                <div className='flex flex-col gap-6'>
                  <p className='text-xs'>한 일</p>
                  <p className='text-24 text-brand-tertiary font-bold'>5개</p>
                </div>
                <div>
                  <Image
                    src={DoneImg}
                    alt='done image'
                    width={40}
                    height={40}
                  />
                </div>
              </div>
            </section>
          </section>
        </section>
        <section className='w-full mt-64'>
          <div className='w-full flex justify-between'>
            <div className='flex gap-8'>
              <p>멤버</p>
              <p className='text-text-default'>(6명)</p>
            </div>
            <div className='text-brand-primary'>+ 새로운 멤버 초대하기</div>
          </div>
          {/* TODO 멤버 컴포넌트로 변경, 데이터 연동, 페이지네이션 */}
          <section className='mt-24 grid grid-cols-2 tablet:grid-cols-3 gap-24'>
            {/* NOTE 반응형 크기 적용 필요 */}
            <MemberInfo />
            <MemberInfo />
            <MemberInfo />
            <MemberInfo />
            <MemberInfo />
            <MemberInfo />
          </section>
        </section>
      </section>
    </div>
  );
}
export default GroupPage;
