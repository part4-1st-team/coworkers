import { doc, updateDoc, increment, setDoc, getDoc } from 'firebase/firestore';
import fireStore from '@/firebase/firestore'; // Firestore 인스턴스
import { ToastType } from '@/components/toast/ToastStore';

// 좋아요 추가 함수
export async function likeComment(
  commentId: string,
  userId: string,
  toast: (type: ToastType, message: string) => void,
): Promise<number> {
  const commentRef = doc(fireStore, 'comments', commentId);

  try {
    const userLikeRef = doc(commentRef, 'likes', userId);
    const userLikeSnapshot = await getDoc(userLikeRef);

    // 이미 좋아요를 눌렀는지 확인
    if (!userLikeSnapshot.exists()) {
      await setDoc(userLikeRef, { liked: true });

      // likeCount 증가
      await updateDoc(commentRef, {
        likeCount: increment(1),
      });

      // 현재 likeCount를 가져와서 반환
      const updatedCommentSnapshot = await getDoc(commentRef);
      const updatedLikeCount = updatedCommentSnapshot.data()?.likeCount || 0;
      return updatedLikeCount;
    }

    toast('Error', '이미 좋아요를 눌렀습니다.');
    return 0;
  } catch (error) {
    toast('Error', '좋아요 처리에 실패했습니다.');
    throw error;
  }
}

// 싫어요 추가 함수
export async function dislikeComment(
  commentId: string,
  userId: string,
  toast: (type: ToastType, message: string) => void,
): Promise<number> {
  const commentRef = doc(fireStore, 'comments', commentId);

  try {
    const userDislikeRef = doc(commentRef, 'dislikes', userId);
    const userDislikeSnapshot = await getDoc(userDislikeRef);

    // 이미 싫어요를 눌렀는지 확인
    if (!userDislikeSnapshot.exists()) {
      await setDoc(userDislikeRef, { disliked: true });

      // dislikeCount 증가
      await updateDoc(commentRef, {
        dislikeCount: increment(1),
      });

      // 현재 dislikeCount를 가져와서 반환
      const updatedCommentSnapshot = await getDoc(commentRef);
      const updatedDislikeCount =
        updatedCommentSnapshot.data()?.dislikeCount || 0;
      return updatedDislikeCount;
    }

    toast('Error', '이미 싫어요를 눌렀습니다.');
    return 0;
  } catch (error) {
    toast('Error', '싫어요 처리에 실패했습니다.');
    throw error;
  }
}

// 좋아요와 싫어요 수를 가져오는 함수
export async function getCommentLikeDislikeCount(
  commentId: string,
  toast: (type: ToastType, message: string) => void,
): Promise<{ likeCount: number; dislikeCount: number }> {
  const commentRef = doc(fireStore, 'comments', commentId);

  try {
    const commentSnapshot = await getDoc(commentRef);

    if (commentSnapshot.exists()) {
      const data = commentSnapshot.data();
      const likeCount = data?.likeCount || 0;
      const dislikeCount = data?.dislikeCount || 0;

      return { likeCount, dislikeCount };
    }

    toast('Error', '댓글이 존재하지 않습니다.');
    return { likeCount: 0, dislikeCount: 0 };
  } catch (error) {
    toast('Error', '좋아요/싫어요 수를 가져오는데 실패했습니다.');
    throw error;
  }
}
