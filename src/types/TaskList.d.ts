type FrequencyType = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'ONCE';

interface BaseUser {
  id: number;
  nickname: string;
  image: string | null;
}

interface Writer extends BaseUser {}

interface Task {
  id: number;
  name: string;
  description: string | null;
  date: string;
  doneAt: string | null;
  updatedAt: string;
  frequency: FrequencyType;
  recurringId: number;
  deletedAt: string | null;
  commentCount: number;
  displayIndex: number;
  writer: Writer;
  doneBy: IUser | null;
}

interface TaskListInform {
  displayIndex: number;
  groupId: number;
  updatedAt: string;
  createdAt: string;
  name: 'string';
  id: number;
}

interface TaskList extends TaskListInform {
  tasks: Task[];
}

interface ResponseTaskLists {
  createdAt: string;
  id: number;
  image: string | null;
  members: Member[];
  name: string;
  taskLists: TaskList[];
  teadId: number;
  updatedAt: string;
}
