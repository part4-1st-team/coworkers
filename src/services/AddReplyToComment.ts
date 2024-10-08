import {
  collection,
  query,
  addDoc,
  getDocs,
  orderBy,
  serverTimestamp,
  getDoc,
} from 'firebase/firestore';
import fireStore from '@/firebase/firestore';

// 답글 추가 함수
export async function addReplyToComment(
  commentId: string,
  userId: string,
  replyContent: string,
) {
  const repliesRef = collection(fireStore, 'comments', commentId, 'replies');
  const newReply = {
    userId,
    content: replyContent,
    createdAt: serverTimestamp(), // Firestore 서버 타임스탬프
  };

  try {
    // 답글 추가 후, 해당 문서의 데이터를 다시 가져옴
    const replyDocRef = await addDoc(repliesRef, newReply);
    const replyDocSnap = await getDoc(replyDocRef); // Firestore에서 다시 가져오기
    return { id: replyDocSnap.id, ...replyDocSnap.data() }; // 저장된 답글 데이터 반환
  } catch (error) {
    console.error('Error adding reply: ', error);
    throw error;
  }
}
// 특정 댓글에 대한 답글 가져오기 함수
export async function getRepliesForComment(commentId: string) {
  const repliesRef = collection(fireStore, 'comments', commentId, 'replies'); // comments/{commentId}/replies
  const repliesQuery = query(repliesRef, orderBy('createdAt', 'asc')); // 답글을 생성된 순서대로 정렬

  try {
    const querySnapshot = await getDocs(repliesQuery);
    const replies = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return replies;
  } catch (error) {
    console.error('Error fetching replies: ', error);
    throw error;
  }
}
