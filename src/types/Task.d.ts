// type FrequencyType = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'ONCE';

interface IUser {}

interface IWriter {
  id: number;
  nickname: string;
  image: string;
}

interface ITask {
  id: number;
  name: string;
  description: string;
  date: string;
  doneAt: string | null;
  updatedAt: string;
  user: IUser | null;
  recurringId: number;
  deletedAt: string | null;
  displayIndex: number;
  writer: IWriter;
  doneBy: IUser | null;
  commentCount: number;
  frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'ONCE';
  // TODO 머지하고 타입 수정
}
