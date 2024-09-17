import { IconPencil, IconX } from '@/assets/IconList';
import { Dispatch, SetStateAction } from 'react';

interface EditButtonProps {
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

function EditPencilButton({ isEditing, setIsEditing }: EditButtonProps) {
  if (isEditing)
    return (
      <button
        type='button'
        onClick={() => setIsEditing(false)}
        aria-label='제목 수정 취소 버튼'
      >
        <IconX width={24} height={24} />
      </button>
    );

  return (
    <button
      type='button'
      onClick={() => setIsEditing(true)}
      aria-label='제목 수정 버튼'
    >
      <IconPencil className='w-16 h-16 fill-text-default' />
    </button>
  );
}

export default EditPencilButton;
