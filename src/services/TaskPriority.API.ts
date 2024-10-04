import fireStore from '@/firebase/firestore';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore';

export async function postTaskPriority(
  groupId: number,
  taskListId: number,
  task: DateTask,
  date: string,
  userId: number,
  type?: 'patch',
  done?: boolean,
) {
  const docRef = doc(
    fireStore,
    `/tasks/${groupId}/${taskListId}/user/${userId}/priority/${date}/${task.id}`,
  );

  const data = { taskId: task.id, task, isDone: !!task.doneAt };

  const docSnap = await getDoc(docRef);

  // 조건 간단하게 되긴 하는데 간단하게 하면 안되길래 여러가지 하다가 정착..
  if (type === 'patch') {
    if (docSnap.exists()) {
      await setDoc(
        docRef,
        {
          isDone: done,
          task: done ? { doneAt: new Date() } : { doneAt: null },
        },
        { merge: true },
      );
    } else {
      console.log('체크 박스 변경');
    }
  } else {
    // eslint-disable-next-line no-lonely-if
    if (!docSnap.exists()) {
      await setDoc(docRef, data);
    } else {
      await deleteDoc(docRef);
    }
  }
}

// 현재 댓글의 리액션 정보를 가져오는 함수
export async function getTaskPriority(
  groupId: number,
  taskListId: number,
  date: string,
  userId: number,
) {
  // 하위 컬렉션 참조
  const priorityCollectionRef = collection(
    fireStore,
    `/tasks/${groupId}/${taskListId}/user/${userId}/priority/${date}`,
  );

  const querySnapshot = await getDocs(priorityCollectionRef);

  const priorityTasks = querySnapshot.docs.map((tDoc) => ({
    taskId: tDoc.id, // 문서의 ID를 taskId로 사용
    ...tDoc.data(),
  })) as PriorityTask[];

  const { size } = querySnapshot; // 문서의 수

  return { priorityTasks, size };
}
