function ProfileDropdown() {
  return (
    <div className='flex flex-col border border-border-primary rounded-12 w-120 h-160 desktop:w-135 desktop:h-184 tablet:w-135 tablet:h-184'>
      <button
        type='button'
        className='text-text-primary h-40 text-14 font-400 desktop:h-47 desktop:text-16 tablet:h-47 tablet:16'
      >
        마이 히스토리
      </button>
      <button
        type='button'
        className='text-text-primary h-40 text-14 font-400 desktop:h-47 desktop:text-16 tablet:h-47 tablet:16'
      >
        계정 설정
      </button>
      <button
        type='button'
        className='text-text-primary h-40 text-14 font-400 desktop:h-47 desktop:text-16 tablet:h-47 tablet:16'
      >
        팀 참여
      </button>
      <button
        type='button'
        className='text-text-primary h-40 text-14 font-400 desktop:h-47 desktop:text-16 tablet:h-47 tablet:16'
      >
        로그아웃
      </button>
    </div>
  );
}
export default ProfileDropdown;
