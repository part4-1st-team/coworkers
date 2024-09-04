import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
  fullWidth?: boolean;
  className?: string;
}

function Input({
  label = '',
  errorMessage,
  fullWidth = false,
  className,
  ...props
}: InputProps) {
  return (
    <div className={clsx('flex flex-col', { 'w-full': fullWidth })}>
      {label && (
        <label
          htmlFor={props.id}
          className='text-lg font-semibold text-text-primary mb-2'
        >
          {label}
        </label>
      )}
      <input
        id={props.id}
        disabled={props.disabled}
        className={clsx(
          'p-3.5 rounded-xl bg-gray-100 bg-background-secondary border-background-secondary ',
          'placeholder-text-default text-lg py-3.5 pl-4',
          'focus:border-intersection-focus border focus: outline-none',
          'hover:border-intersection-hover border hover: outline-none',
          {
            '!border-status-danger border ': errorMessage,
            'bg-gray-300 text-gray-500 cursor-not-allowed': props.disabled,
          },
          className,
        )}
        {...props}
      />
      {errorMessage && (
        <p className='text-md font-semibold text-status-danger mt-2'>
          {errorMessage}
        </p>
      )}
    </div>
  );
}

Input.defaultProps = {
  label: '',
  errorMessage: '',
  fullWidth: false,
  className: '',
};

export default Input;
