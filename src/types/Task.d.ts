interface PostTask {
  name: string;
  description: string;
  startDate: Date | string;
  frequencyType: FrequencyType;
  monthDay?: number;
  weekDays?: number[];
}

interface Recurring {
  writerId: number;
  groupId: number;
  taskListId: number;
  monthDay: number | null;
  weekDays: number[] | null;
  frequencyType: FrequencyType;
  startDate: string;
  updatedAt: string;
  createdAt: string;
  description: string;
  name: string;
  id: number;
}

interface TaskRecurring {
  recurring: Recurring;
}

interface IUser {
  user: BaseUser | null;
}

interface DateTask {
  doneBy: IUser | null;
  writer: Writer;
  displayIndex: number;
  commentCount: number;
  deletedAt: string | null;
  recurringId: number;
  frequency: FrequencyType;
  updatedAt: string;
  doneAt: string | null;
  date: string;
  description: string | null;
  name: string;
  id: number;
}

interface PatchTask {
  name?: string;
  description?: string;
  done?: boolean;
}

interface PatchAfterTask {
  displayIndex: number;
  writerId: number;
  userId: number;
  deletedAt: number;
  frequency: FrequencyType;
  description: string;
  name: string;
  recurringId: number;
  doneAt: string;
  date: string;
  updatedAt: string;
  id: number;
}

interface PostRecurring {
  name: string;
  description: string;
  startDate: Date | string;
  frequencyType: FrequencyType;
  monthDay?: number | null;
  weekDays?: number[] | null;
}
