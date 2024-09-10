interface Member {
  role: Role;
  userImage: string;
  userEmail: string;
  userName: string;
  groupId: number;
  userId: number;
}

// interface TaskList {
//   displayIndex: number;
//   groupId: number;
//   updatedAt: string;
//   createdAt: string;
//   name: string;
//   id: number;
//   tasks: string[];
// }

interface Group {
  teamId: string;
  updatedAt: string;
  createdAt: string;
  image: string;
  name: string;
  id: number;
  members: Member[];
  taskLists: TaskList[];
}

interface PatchGroup {
  name?: string;
  image?: string | null;
}

interface PostGroupRequest {
  name: string;
  image?: string | null;
}

interface PostGroupResponse {
  name: string;
  image: string;
  updatedAt: string;
  createdAt: string;
  id: number;
}

interface AcceptInvitation {
  userEmail: string;
  token: string;
}

interface InvitedGroup {
  groupId: number;
}

interface PostGroupMember {
  userEmail: string;
}
