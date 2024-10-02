// stores/useLikeStore.ts
import create from 'zustand';

interface LikeStore {
  likedArticles: { [key: number]: boolean };
  likeCounts: { [key: number]: number };
  toggleLike: (articleId: number, isLiked: boolean) => void;
  setLikeCount: (articleId: number, count: number) => void;
}

const useLikeStore = create<LikeStore>((set) => ({
  likedArticles: {},
  likeCounts: {},
  toggleLike: (articleId, isLiked) =>
    set((state) => ({
      likedArticles: {
        ...state.likedArticles,
        [articleId]: isLiked,
      },
    })),
  setLikeCount: (articleId, count) =>
    set((state) => ({
      likeCounts: {
        ...state.likeCounts,
        [articleId]: count,
      },
    })),
}));

export default useLikeStore;
