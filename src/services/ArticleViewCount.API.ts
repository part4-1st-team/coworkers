import { doc, setDoc, getDoc, increment, updateDoc } from 'firebase/firestore';
import fireStore from '@/firebase/firestore';
import { ToastType } from '@/components/toast/ToastStore';

// 조회수를 1 증가시키는 함수 (POST)
export async function postArticleViewCount(
  boardId: number,
  toast: (type: ToastType, message: string) => void,
): Promise<void> {
  const articleRef = doc(fireStore, 'articles', boardId.toString());
  try {
    // 문서가 존재하는지 확인
    const articleSnapshot = await getDoc(articleRef);
    if (articleSnapshot.exists()) {
      // 문서가 있으면 조회수를 증가시킴
      await updateDoc(articleRef, {
        views: increment(1),
      });
    } else {
      // 문서가 없으면 새로 생성하고 조회수를 1로 설정
      await setDoc(articleRef, { views: 1 });
    }
  } catch (error) {
    toast('Error', '조회수 등록에 실패했습니다.');
  }
}

// 조회수를 가져오는 함수 (GET)
export async function getArticleViewCount(
  boardId: number,
  toast: (type: ToastType, message: string) => void,
): Promise<number | null> {
  const articleRef = doc(fireStore, 'articles', boardId.toString());
  try {
    const articleSnapshot = await getDoc(articleRef);
    if (articleSnapshot.exists()) {
      const data = articleSnapshot.data();
      return data.views || 0;
    }
    toast('Error', '해당 게시글이 존재하지 않습니다.');
    return null;
  } catch (error) {
    toast('Error', '조회수 가져오는데 실패했습니다.');
    return null;
  }
}
