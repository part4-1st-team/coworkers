// group과 관련된 타입 정리

type Roles = 'ADMIN' | 'MEMBER';

interface IMember {
  role: Roles;
  userImage: string | null;
  userEmail: string;
  userName: string;
  groupId: number;
  userId: number;
}
