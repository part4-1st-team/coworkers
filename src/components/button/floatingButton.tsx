/* eslint-disable react/button-has-type */
/* eslint-disable react/require-default-props */
// // /* eslint-disable react/require-default-props */
// /* eslint-disable react/require-default-props */
// import Button from '@/components/button/button';
// import clsx from 'clsx';
// import {
//   IconPlus,
//   IconCheckWhite,
//   IconCheckGray,
//   IconCheckGreen,
// } from '@/assets/IconList';

// type FloatingButtonType = 'add' | 'complete' | 'cancel';
// type ColorType = 'primary' | 'white';

// interface FloatingButtonProps {
//   type: FloatingButtonType;
//   disabled?: boolean;
//   className?: string;
//   text?: string; // 외부에서 커스텀 가능한 텍스트 prop 추가
// }

// /**
//  * 버튼의 유형을 정의합니다.
//  * - `'add'`: 할 일을 추가하는 버튼
//  * - `'complete'`: 완료하는 버튼
//  * - `'cancel'`: 취소하는 버튼
//  */

// const iconMap: Record<
//   FloatingButtonType,
//   {
//     icon: React.ReactNode;
//     color: ColorType;
//     text: string;
//     size: string;
//     disabledIcon?: React.ReactNode;
//   }
// > = {
//   add: {
//     icon: <IconPlus width={16} height={16} />,
//     color: 'primary',
//     text: '할 일 추가',
//     size: 'h-48',
//   },
//   complete: {
//     icon: <IconCheckWhite className='text-text-inverse' />,
//     color: 'primary',
//     text: '완료하기',
//     size: 'w-auto h-40',
//   },
//   cancel: {
//     icon: <IconCheckGreen />,
//     color: 'white',
//     text: '완료 취소하기',
//     size: 'h-40',
//     disabledIcon: <IconCheckGray />,
//   },
// };

// function FloatingButton({
//   type,
//   disabled = false,
//   className,
//   text, // 외부에서 전달받을 text prop
// }: FloatingButtonProps) {
//   const {
//     icon,
//     color,
//     text: defaultText,
//     size,
//     disabledIcon,
//   } = iconMap[type] || {
//     icon: <IconCheckWhite />,
//     color: 'primary',
//     text: '할 일 추가',
//     size: 'h-10',
//   };

//   // 외부에서 전달된 text가 있으면 그 값을 사용하고, 없으면 기본 text를 사용
//   const buttonText = text || defaultText;

//   const iconNode = disabled && disabledIcon ? disabledIcon : icon;

//   return (
//     <Button
//       type='button'
//       rounded
//       color={color}
//       disabled={disabled}
//       icon={iconNode}
//       className={clsx(size, className)}
//     >
//       {buttonText}
//     </Button>
//   );
// }

// export default FloatingButton;

import clsx from 'clsx';
import {
  IconPlus,
  IconCheckWhite,
  IconCheckGray,
  IconCheckGreen,
} from '@/assets/IconList';

type ColorType = 'primary' | 'outlined';
type ButtonType = 'button' | 'submit' | 'reset';
type IconType = 'plus' | 'checkWhite' | 'checkGray' | 'checkGreen';

interface FloatingButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  color?: ColorType;
  disabled?: boolean;
  type?: ButtonType;
  text?: string;
  icon?: IconType;
  className?: string;
}

function FloatingButton({
  color = 'primary',
  text,
  type = 'button',
  disabled = false,
  icon,
  className,
  ...props
}: FloatingButtonProps) {
  const baseButton =
    'w-full text-md font-semibold text-text-inverse px-21 py-11 rounded-full flex items-center justify-center ';

  const colorStyle = {
    primary:
      'bg-brand-primary hover:bg-interaction-hover focus:outline-none focus:bg-interaction-pressed disabled:bg-interaction-inactive',
    outlined:
      'bg-background-inverse text-point-blue border border-brand-primary hover:text-interaction-hover hover:border-interaction-hover focus:border-interaction-pressed focus:text-interaction-pressed disabled:border-interaction-inactive disabled:text-interaction-inactive',
    //  text-brand-secondary text-brand-primary  둘다 먹지 않습니다. 이유를 모르겠습니다.......
    // 임시로 text-point-blue 사용 했습니다.
  };

  // 아이콘 컴포넌트 매핑
  const iconComponents = {
    plus: <IconPlus className='w-16 h-16' />,
    checkWhite: <IconCheckWhite className='w-16 h-16' />,
    checkGray: <IconCheckGray className='w-16 h-16' />,
    checkGreen: <IconCheckGreen className='w-16 h-16 ' />,
  };

  // 아이콘이 있을 경우 텍스트와 아이콘을 함께 렌더링
  const buttonContent = (
    <div className='flex items-center gap-4'>
      {icon &&
        (disabled && icon === 'checkGreen'
          ? iconComponents.checkGray
          : iconComponents[icon])}
      {text && <span>{text}</span>}
    </div>
  );

  const buttonClass = clsx(baseButton, colorStyle[color], className);

  return (
    <button type={type} disabled={disabled} className={buttonClass} {...props}>
      {buttonContent}
    </button>
  );
}

FloatingButton.defaultProps = {
  color: 'primary',
  disabled: false,
  type: 'button',
  className: '',
};

export default FloatingButton;
