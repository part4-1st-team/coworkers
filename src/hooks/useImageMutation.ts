import postImageUpload from '@/services/ImageAPI';
import { useMutation } from '@tanstack/react-query';

function useImageMutation() {
  return useMutation({
    mutationFn: (newImage: Blob) => postImageUpload(newImage),
  });
}

export default useImageMutation;
