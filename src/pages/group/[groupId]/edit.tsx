// 컴포넌트 import
import Input from '@/components/input/input';
import Button from '@/components/button/button';

function GroupEditPage() {
  return (
    <div className='w-full h-full bg-background-primary text-text-primary text-lg px-16 pt-56 font-medium'>
      <section className='w-full flex flex-col gap-24 tablet:w-460 mx-auto'>
        <div className='w-full text-center text-24'>팀 수정하기</div>
        <section>
          <div className='mb-12'>팀 프로필</div>
          {/* TODO 이미지 컴포넌트 적용 */}
          <div>이미지 컴포넌트</div>
        </section>
        <section>
          <div className='mb-12'>팀 이름</div>
          {/* TODO focus 적용 */}
          <Input placeholder='현재 팀 이름' />
        </section>
        {/* TODO 수정 제출 기능 구현 */}
        <Button type='submit' color='primary' className='py-14 mt-40'>
          수정하기
        </Button>
        <section className='w-full text-center font-normal'>
          팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.
        </section>
      </section>
    </div>
  );
}

export default GroupEditPage;
