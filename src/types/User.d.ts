type Role = 'ADMIN' | 'MEMBER';

interface Group {
  teamId: string;
  updatedAt: string;
  createdAt: string;
  image: string;
  name: string;
  id: number;
}

interface Membership {
  group: Group;
  role: Role;
  userImage: string;
  userEmail: string;
  userName: string;
  groupId: number;
  userId: number;
}

interface User {
  teamId: string;
  image: string;
  nickname: string;
  updatedAt: string;
  createdAt: string;
  email: string;
  id: number;
  memberships: Membership[];
}

interface Message {
  message: string;
}

interface DoneTask {
  displayIndex: number;
  writerId: number;
  userId: number;
  deletedAt: string;
  frequency: FrequencyType;
  description: string;
  name: string;
  recurringId: number;
  doneAt: string;
  date: string;
  updatedAt: string;
  id: number;
}

interface History {
  tasksDone: DoneTask[];
}
