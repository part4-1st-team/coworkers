import fireStore from '@/firebase/firestore';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore';

// reaction 생성/제거 함수
export async function postTaskCommentReaction(
  taskId: number,
  commentId: number,
  userId: number,
  type: ReactionType,
  data: TaskCommentReaction,
  action?: 'add' | 'remove',
) {
  const docRef = doc(
    fireStore,
    `task_comment_reaction/${taskId}/${commentId}/${type}/users/${userId}`,
  );

  const docSnap = await getDoc(docRef);

  if (action === 'add' && !docSnap.exists()) {
    await setDoc(docRef, data);
  } else if (action === 'remove' && docSnap.exists()) {
    await deleteDoc(docRef);
  } else if (!action) {
    if (docSnap.exists()) {
      await deleteDoc(docRef);
    } else {
      await setDoc(docRef, data);
    }
  }
}

// 현재 댓글의 리액션 정보를 가져오는 함수
export async function getReaction(
  taskId: number,
  commentId: number,
  type: ReactionType,
) {
  // 하위 컬렉션 참조
  const usersCollectionRef = collection(
    fireStore,
    `task_comment_reaction/${taskId}/${commentId}/${type}/users`,
  );

  const querySnapshot = await getDocs(usersCollectionRef);

  const reactionUserList = querySnapshot.docs.map((tDoc) => ({
    userId: tDoc.id, // 문서의 ID
    ...tDoc.data(), // 문서의 데이터를 스프레드로 추가
  }));

  const { size } = querySnapshot;

  return { reactionUserList, size };
}
