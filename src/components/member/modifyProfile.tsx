import { IconEdit } from '@/assets/IconList';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import ProfileImage from './ProfileImage';

function ModifyProfile({
  preview,
  setImage,
  group,
  setPreview,
}: {
  preview: string | null;
  setImage: Dispatch<SetStateAction<Blob | null>>;
  setPreview: Dispatch<SetStateAction<string | null>>;
  group?: boolean;
}) {
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      const blob = new Blob([file], { type: file.type });

      const url = URL.createObjectURL(file);

      setPreview(url);
      setImage(blob);
    }
  };

  return (
    <label htmlFor='file-input' className='cursor-pointer relative w-fit'>
      <input
        type='file'
        id='file-input'
        className='hidden'
        accept='image/png, image/jpeg, image/jpg'
        onChange={handleImageChange}
      />
      <ProfileImage userImage={preview} size={64} className={'size-64'} />
      <div className='size-20 flex items-center justify-center rounded-full absolute right-0 bottom-0 bg-background-tertiary border-2 border-background-primary'>
        <IconEdit width={8} height={9} />
      </div>
    </label>
  );
}

export default ModifyProfile;
