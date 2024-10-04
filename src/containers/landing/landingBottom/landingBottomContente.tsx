import LangindBottomImage from '../componet/landingBottomImg';

function LandingBottomContent() {
  return (
    <div className='h-640 tablet:h-940 desktop:h-1080 relative flex justify-center'>
      <div className='flex flex-col gap-16 items-center mt-123 tablet:mt-176 desktop:mt-230 text-text-primary dark:text-text-primary-dark'>
        <p className='text-2xl tablet:text-4xl font-semibold  '>
          지금 바로 시작해보세요
        </p>
        <div className='flex flex-col items-center tablet:hidden'>
          <p>팀원 모두와 같은 방향,</p>
          <p>같은 속도로 나아가는 가장 쉬운 방법</p>
        </div>
        <p className='hidden tablet:block text-2xl'>
          팀원 모두와 같은 방향, 같은 속도로 나아가는 가장 쉬운 방법
        </p>
      </div>

      <div className='absolute'>
        <LangindBottomImage size='small' />
        <LangindBottomImage size='medium' />
        <LangindBottomImage size='large' />
      </div>
    </div>
  );
}

export default LandingBottomContent;
