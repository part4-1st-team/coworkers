function Header({ title }: { title: string }) {
  return (
    <div className='text-2lg tablet:text-2xl font-bold text-text-primary dark:text-text-primary-dark'>
      {title}
    </div>
  );
}

export default Header;
