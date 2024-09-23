function ErrorLabel({ message }: { message: string }) {
  return <p className='text-md font-medium text-status-danger'>{message}</p>;
}

export default ErrorLabel;
