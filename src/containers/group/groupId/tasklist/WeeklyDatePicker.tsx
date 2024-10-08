import PickerButton from '@/components/button/pickerButton';
import React, { Dispatch, useState } from 'react';

function WeeklyDatePicker({
  handleClick,
}: {
  handleClick: Dispatch<React.SetStateAction<number[]>>;
}) {
  const onClick = (value: number) => {
    handleClick((prev) => {
      if (prev.includes(value)) {
        return prev.filter((day) => day !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  return (
    <div className='flex gap-[4.5px]'>
      <PickerButton text='일' value={0} onClick={onClick} />
      <PickerButton text='월' value={1} onClick={onClick} />
      <PickerButton text='화' value={2} onClick={onClick} />
      <PickerButton text='수' value={3} onClick={onClick} />
      <PickerButton text='목' value={4} onClick={onClick} />
      <PickerButton text='금' value={5} onClick={onClick} />
      <PickerButton text='토' value={6} onClick={onClick} />
    </div>
  );
}

export default WeeklyDatePicker;
