import clsx from 'clsx';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  color:
    | 'primary'
    | 'alert'
    | 'outline'
    | 'disabled'
    | 'main-top'
    | 'main-bottom';
  textSize?: 'small' | 'large' | 'x-large';
  buttonSize?: ''
  defaultPadding?: boolean;
  fullWidth?: boolean;
  className?: string;
  plusIcon?: React.ReactNode;
}



const colors = {
  Primary: "text-red-600",
  black: "text-black",
};

const buttonSize = {

};