// mock data
interface MockMember {
  id: number;
  role: string; // ADMIN | MEMBER
  userImage: string;
  userEmail: string;
  userName: string;
}
interface MockTasks {
  id: number;
  name: string;
  done: boolean;
}
interface MockTaskLists {
  id: number;
  name: string;
  tasks: MockTasks[];
}
interface MockGroup {
  name: string;
  id: number;
  tasklists: MockTaskLists[];
  members: MockMember[];
}
