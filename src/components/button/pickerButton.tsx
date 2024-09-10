import BaseButton from './baseButton';

function PickerButton() {
  return (
    <BaseButton
      type='button'
      text='일'
      className='w-44 h-48 bg-background-primary text-text-default active:text-text-primary active:bg-brand-primary'
    />
  );
}

export default PickerButton;
