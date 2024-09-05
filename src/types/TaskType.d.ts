type FrequencyType = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'ONCE';

interface ITask {
  id: number;
  updatedAt: string;
  date: string;
  doneAt: string;
  recurringId: number;
  name: string;
  description: string;
  frequency: FrequencyType;
  deletedAt: string | null;
  userId: number;
  writerId: number;
  displayIndex: number;
}

interface IHistory {
  date: string;
  tasks: ITask[];
}
