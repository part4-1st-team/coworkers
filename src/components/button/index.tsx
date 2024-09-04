/* eslint-disable react/function-component-definition */
/* eslint-disable react/require-default-props */
// import clsx from 'clsx';

// type ColorType =
//   | 'primary'
//   | 'hover'
//   | 'disabled'
//   | 'danger'
//   | 'outline'
//   | 'outlineDisabled'
//   | '';
// type SizeType = 'square' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | '';
// type ButtonType = 'bar' | 'fullRounded' | 'circle';

// interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
//   type?: ButtonType;
//   color?: ColorType;
//   size?: SizeType;
//   fullWidth?: boolean;
//   className?: string;
//   icon?: boolean;
// }

// const baseButton =
//   'inline-flex items-center justify-center text-text-inverse py-';

// const buttonKind = {
//   bar: 'rounded-xl',
//   fullRounded: 'rounded-full',
//   circle: 'rounded-full',
// };

// const colorMap = {
//   primary: 'bg-brand-primary  ',
//   hover: 'bg-intersection-hover ',
//   disabled: 'bg-intersection-inactive',
//   danger: 'bg-status-danger',
//   outline:
//     'bg-background-tertiary border-border-primary border text-text-primary',
//   outlineDisabled:
//     'bg-background-tertiary border-border-secondary  border text-text-inverse',
//   '': '',
// };

// const sizeMap = {
//   XXL: 'w-[460px] h-[47px]',
//   XL: 'w-[343px] h-[47px]',
//   L: 'w-[280px] h-[47px]',
//   M: 'w-[186px] h-[48px]',
//   S: 'w-[184px] h-[48px]',
//   XS: 'w-[136px] h-[47px]',
//   square: 'w-[24px] h-[24px] py-0',
//   '': '',
// };

// const fullWidthMap = 'w-full';

// // const Button = ({
// //   children,
// //   type = 'bar',
// //   color = '',
// //   size = '',
// //   fullWidth = false,
// //   className,
// //   icon = false,
// //   ...rest
// // }: ButtonProps) => {
// //   const buttonClass = clsx(
// //     baseButton,
// //     buttonKind[type],
// //     colorMap[color],
// //     sizeMap[size],
// //     fullWidth && fullWidthMap,
// //     icon && 'gap-2',
// //     className,
// //   );

// const Button = ({
//   children,
//   type = 'bar',
//   color = '',
//   size = '',
//   fullWidth = false,
//   className,
//   icon = false,
//   ...rest
// }: ButtonProps) => {
//   const buttonClass = clsx(
//     baseButton,
//     buttonKind[type],
//     colorMap[color],
//     sizeMap[size],
//     fullWidth && fullWidthMap,
//     icon && 'gap-2',
//     className,
//   );

//   // 사용 예시

//   // <Button
//   //   icon   --> 아이콘의 존재 유무
//   //   color='primary'   --> 컬러 설정
//   //   type='fullRounded'  --> 버튼 종류 설정
//   //   className='w-[138px] h-[40px]'
//   //   ㄴ> 커스텀 내용  사이즈를 따로 커스텀 할 경우 size 프롭을 추가하지않고
//   //       클레스 네임에서 사이즈 처리
//   // >
//   //   <Button.Icon icon={<Check_White />} />   --> 아이콘 컴포넌트 아이콘 사용하지 않으면 지우면 됩니다.
//   //   <Button.Text className='text-text-inverse'>완료취소하기</Button.Text>
//   //   ㄴ> 텍스트 컴포넌트 텍스트가 필요한 경우 추가
//   //   ㄴ> 클레스 네임으로 커스텀 가능  폰트 사이즈 , 텍스트 색상 변경 등등
//   // </Button>;

//   return (
//     <button type="button" {...rest} className={buttonClass}>
//       {children}
//     </button>
//   );
// };

// Button.Icon = ({ icon }: { icon: React.ReactNode }) => {
//   return <span>{icon}</span>;
// };

// // 아이콘 하위 컴포넌트

// Button.Text = ({
//   children,
//   className,
// }: {
//   children: React.ReactNode;
//   className?: string;
// }) => {
//   return <span className={clsx('', className)}>{children}</span>;
// };

// // 텍스트 하위 컴포넌트

// export default Button;

import clsx from 'clsx';

type ColorType =
  | 'primary'
  | 'hover'
  | 'disabled'
  | 'danger'
  | 'outline'
  | 'outlineDisabled'
  | '';
type SizeType = 'square' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | '';
type ButtonType = 'bar' | 'fullRounded' | 'circle';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  type?: ButtonType;
  color?: ColorType;
  size?: SizeType;
  fullWidth?: boolean;
  className?: string;
  icon?: boolean;
}

const baseButton =
  'inline-flex items-center justify-center text-text-inverse py-';

const buttonKind = {
  bar: 'rounded-xl',
  fullRounded: 'rounded-full',
  circle: 'rounded-full',
};

const colorMap = {
  primary: 'bg-brand-primary',
  hover: 'bg-intersection-hover',
  disabled: 'bg-intersection-inactive',
  danger: 'bg-status-danger',
  outline:
    'bg-background-tertiary border-border-primary border text-text-primary',
  outlineDisabled:
    'bg-background-tertiary border-border-secondary border text-text-inverse',
  '': '',
};

const sizeMap = {
  XXL: 'w-[460px] h-[47px]',
  XL: 'w-[343px] h-[47px]',
  L: 'w-[280px] h-[47px]',
  M: 'w-[186px] h-[48px]',
  S: 'w-[184px] h-[48px]',
  XS: 'w-[136px] h-[47px]',
  square: 'w-[24px] h-[24px] py-0',
  '': '',
};

const fullWidthMap = 'w-full';

// Button 컴포넌트 함수 선언식
function Button({
  children,
  type = 'bar',
  color = '',
  size = '',
  fullWidth = false,
  className,
  icon = false,
  ...rest
}: ButtonProps) {
  const buttonClass = clsx(
    baseButton,
    buttonKind[type],
    colorMap[color],
    sizeMap[size],
    fullWidth && fullWidthMap,
    icon && 'gap-2',
    className,
  );

  return (
    <button type='button' {...rest} className={buttonClass}>
      {children}
    </button>
  );
}

// Button.Icon 하위 컴포넌트 정의
Button.Icon = function Icon({ icon }: { icon: React.ReactNode }) {
  return <span>{icon}</span>;
};

// Button.Text 하위 컴포넌트 정의
Button.Text = function Text({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <span className={className}>{children}</span>;
};

export default Button;
