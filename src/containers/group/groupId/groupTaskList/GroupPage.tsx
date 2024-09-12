import Image from 'next/image';

import TodoImg from '@/assets/images/img_todo.png';
import DoneImg from '@/assets/images/img_done.png';

// 컴포넌트 import
import MemberInfo from '@/components/member/MemberInfo';
import EmptyGroup from './EmptyGroup';
import GroupBar from './GroupBar';
import GroupTaskList from './GroupTaskList';

// mock data
const userGroups: ResponseGroup[] = [];

const taskLists: TaskList[] = [
  {
    displayIndex: 1,
    groupId: 41,
    updatedAt: '2024-09-09T11:44:58.835Z',
    createdAt: '2024-09-09T11:44:58.835Z',
    name: '심화 프로젝트',
    id: 78954,
    tasks: [],
  },
  {
    displayIndex: 1,
    groupId: 41,
    updatedAt: '2024-09-09T11:44:58.835Z',
    createdAt: '2024-09-09T11:44:58.835Z',
    name: '고양이 돌보기',
    id: 78955,
    tasks: [],
  },
  {
    displayIndex: 1,
    groupId: 41,
    updatedAt: '2024-09-09T11:44:58.835Z',
    createdAt: '2024-09-09T11:44:58.835Z',
    name: '지구 정복',
    id: 78956,
    tasks: [],
  },
  {
    displayIndex: 1,
    groupId: 41,
    updatedAt: '2024-09-09T11:44:58.835Z',
    createdAt: '2024-09-09T11:44:58.835Z',
    name: '오늘 하루 힘내기',
    id: 78957,
    tasks: [],
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
        <section className='w-full mt-24 flex flex-col gap-16'>
          <div className='w-full flex justify-between'>
            <div className='flex gap-8'>
              <p>할 일 목록</p>
              <p className='text-text-default'>(4개)</p>
            </div>
            <p className='text-brand-primary '>+ 새로운 목록 추가하기</p>
          </div>
          {/* TODO 데이터 연동, 설정 클릭 구현, 색상 변경 구현 */}
          <div className='flex flex-col gap-16'>
            {taskLists.length === 0 ? (
              <div className='text-14 font-md text-text-default mx-auto mt-64 mb-48 desktop:mb-64'>
                아직 할 일 목록이 없습니다.
              </div>
            ) : (
              taskLists.map((tasklist) => (
                <GroupTaskList
                  key={tasklist.id}
                  doneCount={3}
                  totalCount={5}
                  color='purple'
                  isDone={false}
                >
                  {tasklist.name}
                </GroupTaskList>
              ))
            )}

            <GroupTaskList
              doneCount={3}
              totalCount={5}
              color='point-orange'
              isDone
            >
              리스트 컴포넌트
            </GroupTaskList>
          </div>
        </section>
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
