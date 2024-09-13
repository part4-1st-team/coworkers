/* eslint-disable react/button-has-type */
/* eslint-disable react/require-default-props */
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

/**
 * FloatingButton 컴포넌트는 원형 버튼으로, 아이콘과 텍스트를 지원하며, 색상과 비활성화 상태를 조정할 수 있습니다.
 *
 * @component
 * @example
 * <FloatingButton
 *   color="primary"
 *   text="Click me"
 *   type="button"
 *   disabled={false}
 *   icon="plus"
 *   className="my-custom-class"
 * />
 *
 * @param {Object} props - 컴포넌트의 속성입니다.
 * @param {'primary' | 'outlined'} [props.color='primary'] - 버튼의 색상을 결정합니다. 'primary'는 기본 색상, 'outlined'는 테두리만 있는 스타일을 나타냅니다.
 * @param {boolean} [props.disabled=false] - 버튼의 비활성화 상태를 설정합니다. true일 경우 버튼이 비활성화됩니다.
 * @param {'button' | 'submit' | 'reset'} [props.type='button'] - 버튼의 HTML 타입을 설정합니다. 'button', 'submit', 또는 'reset'이 가능합니다.
 * @param {string} [props.text] - 버튼에 표시할 텍스트입니다.
 * @param {'plus' | 'checkWhite' | 'checkGray' | 'checkGreen'} [props.icon] - 버튼에 표시할 아이콘을 결정합니다. 'plus', 'checkWhite', 'checkGray', 'checkGreen' 중 하나입니다.
 * @param {string} [props.className] - 버튼에 적용할 선택적인 추가 클래스 이름입니다.
 * @param {React.ButtonHTMLAttributes<HTMLButtonElement>} [props] - 기타 HTML 버튼 요소의 기본 속성입니다.
 *
 * @returns {JSX.Element} 주어진 스타일과 속성을 적용한 원형 버튼을 반환합니다. 아이콘과 텍스트를 함께 사용할 수 있으며, 비활성화 상태에 따라 버튼의 외관이 변경됩니다.
 */
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
    'text-md font-semibold text-text-inverse px-18 py-11 rounded-full flex items-center justify-center ';

  const colorStyle = {
    primary:
      'bg-brand-primary hover:bg-interaction-hover focus:outline-none focus:bg-interaction-pressed disabled:bg-interaction-inactive',
    outlined:
      'bg-background-inverse text-point-blue border border-brand-primary hover:text-interaction-hover hover:border-interaction-hover focus:border-interaction-pressed focus:text-interaction-pressed disabled:border-interaction-inactive disabled:text-interaction-inactive',
    //  text-brand-secondary text-brand-primary  둘다 먹지 않습니다. 이유를 모르겠습니다.......
    // 임시로 text-point-blue 사용 했습니다.
  };

  const iconComponents = {
    plus: <IconPlus className='w-16 h-16' />,
    checkWhite: <IconCheckWhite className='w-16 h-16' />,
    checkGray: <IconCheckGray className='w-16 h-16' />,
    checkGreen: <IconCheckGreen className='w-16 h-16 ' />,
  };

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
