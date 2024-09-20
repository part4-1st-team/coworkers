import { IconPencil, IconX } from '@/assets/IconList';
import { Dispatch, SetStateAction } from 'react';

interface EditButtonProps {
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

function EditPencilButton({ isEditing, setIsEditing }: EditButtonProps) {
  return (
    <button
      type='button'
      onClick={() => setIsEditing((prev) => !prev)}
      aria-label={isEditing ? '제목 수정 취소 버튼' : '제목 수정 버튼'}
    >
      {isEditing ? (
        <IconX width={24} height={24} />
      ) : (
        <IconPencil className='w-16 h-16 fill-text-default' />
      )}
    </button>
  );
}

export default EditPencilButton;
