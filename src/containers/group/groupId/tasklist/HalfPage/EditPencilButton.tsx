import { IconPencil, IconX } from '@/assets/IconList';
import { Dispatch, SetStateAction } from 'react';

interface EditButtonProps {
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

function EditPencilButton({ isEditing, setIsEditing }: EditButtonProps) {
  if (isEditing)
    return (
      <button type='button' onClick={() => setIsEditing(false)}>
        <IconX width={24} height={24} />
      </button>
    );

  return (
    <button type='button' onClick={() => setIsEditing(true)}>
      <IconPencil className='w-16 h-16 fill-text-default' />
    </button>
  );
}

export default EditPencilButton;
