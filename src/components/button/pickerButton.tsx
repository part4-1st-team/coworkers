import clsx from 'clsx';

interface PickerProps {
  text: string;
  value: number;
  onClick: (value: number) => void;
  checked?: boolean; // 외부로부터 checked 상태를 받음
  className?: string;
}

function PickerButton({
  text,
  value,
  onClick,
  checked = false,
  className,
}: PickerProps) {
  return (
    <button
      type='button'
      onClick={() => onClick(value)} // 클릭 시 부모 컴포넌트로 값 전달
      value={value}
      className={clsx(
        'w-44 h-48 rounded-12 py-8 px-10 text-md font-medium',
        checked
          ? 'bg-brand-primary text-text-primary' // 선택된 경우 스타일
          : 'bg-button-background text-text-default', // 선택되지 않은 경우 스타일
        className,
      )}
    >
      {text}
    </button>
  );
}

export default PickerButton;
