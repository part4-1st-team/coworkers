import {
  IconArrowLeft,
  IconArrowRight,
  IconCalendar,
  IconPlus,
} from '@/assets/IconList';
import TaskCreateDateModal from '@/components/modal/TaskCreateDateModal';
import TaskCreateModal from '@/components/modal/TaskCreateModal';
import useModalStore from '@/stores/ModalStore';
import Link from 'next/link';
import List from './List';

const tasks: DateTask[] = [
  {
    id: 7949,
    name: '응원하기',
    description: '',
    date: '2024-09-05T09:00:00+09:00',
    doneAt: null,
    updatedAt: '2024-09-05T10:54:25+09:00',
    recurringId: 1082,
    deletedAt: null,
    displayIndex: 0,
    writer: {
      id: 22,
      nickname: '지현이',
      image:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/22/mulddungkitty.jpeg',
    },
    doneBy: null,
    commentCount: 0,
    frequency: 'DAILY',
  },
  {
    id: 7950,
    name: '져도 화내지 않기',
    description: '',
    date: '2024-09-05T09:00:00+09:00',
    doneAt: null,
    updatedAt: '2024-09-05T10:54:25+09:00',
    recurringId: 1083,
    deletedAt: null,
    displayIndex: 1,
    writer: {
      id: 22,
      nickname: '지현이',
      image:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/22/mulddungkitty.jpeg',
    },
    doneBy: null,
    commentCount: 0,
    frequency: 'DAILY',
  },
];

const taskLists = [
  {
    id: 1300,
    name: '할일',
    createdAt: '2024-09-04T15:27:01+09:00',
    updatedAt: '2024-09-05T10:38:01+09:00',
    groupId: 816,
    displayIndex: 0,
    tasks: [],
  },
  {
    id: 1301,
    name: '추가',
    createdAt: '2024-09-04T15:27:05+09:00',
    updatedAt: '2024-09-05T10:38:01+09:00',
    groupId: 816,
    displayIndex: 0,
    tasks: [],
  },
  {
    id: 1303,
    name: 'ㅇㄴㄹ',
    createdAt: '2024-09-05T11:06:43+09:00',
    updatedAt: '2024-09-05T11:06:43+09:00',
    groupId: 816,
    displayIndex: 2,
    tasks: [],
  },
];

function TaskList() {
  const { isModalOpen, setModalOpen } = useModalStore();

  return (
    <main className='main-container '>
      <div className='flex flex-col gap-[24px]'>
        <h2 className='text-xl font-bold text-text-primary'>할 일</h2>
        <div className='flex justify-between items-center'>
          <div className='flex gap-[12px] items-center'>
            <span className='text-lg font-medium text-text-primary'>
              5월 18일 (월)
            </span>
            <div>
              <button type='button' aria-label='이전 날짜'>
                <IconArrowLeft />
              </button>
              <button type='button' aria-label='다음 날짜'>
                <IconArrowRight />
              </button>
            </div>
            <button type='button' aria-label='캘린더'>
              <IconCalendar />
            </button>
            {/* TODO 버튼들 수정하기 */}
          </div>
          <button
            type='button'
            onClick={() => setModalOpen('add-task')}
            className='text-brand-primary'
          >
            + 새로운 목록 추가하기
          </button>
          {isModalOpen && <TaskCreateModal />}
        </div>
        <div className='flex flex-col gap-[16px]'>
          <div className='flex items-center gap-[12px]'>
            {taskLists.map((taskList) => (
              <Link
                key={taskList.id}
                href={`/group/816/tasklist/${taskList.id}`}
                className=''
              >
                {/* TODO href 주소 수정, active 시 스타일 수정 */}
                {taskList.name}
              </Link>
            ))}
          </div>
          <div className='flex flex-col gap-[16px]'>
            {tasks.map((task: DateTask) => (
              <List task={task} key={task.id} />
            ))}
          </div>
        </div>
      </div>
      <button
        type='button'
        onClick={() => setModalOpen('add-task-date')}
        className='absolute right-[24px] bottom-[24px] tablet:bottom-[25px] desktop:right-[328px] desktop:bottom-[49px] bg-brand-primary flex gap-[4px] items-center px-[21px] py-[14px] rounded-[40px]'
      >
        <IconPlus /> <span className='text-white'>할 일 추가</span>
      </button>
      {isModalOpen && <TaskCreateDateModal />}
    </main>
  );
}

export default TaskList;
