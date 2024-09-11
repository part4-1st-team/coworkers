import Button from '@/components/button/button';
import Input from '@/components/input/input';

function JoinGroup() {
  return (
    <section className='mx-16 tablet:mx-142 desktop:mx-430 mt-132 text-lg text-text-primary'>
      <div className='w-full flex flex-col items-center gap-24'>
        <div className='text-4xl'>팀 참여하기</div>
        <form className='w-full'>
          <div className='mb-40'>
            <div className='mb-12'>팀 링크</div>
            <Input placeholder='팀 링크를 입력해주세요.' />
          </div>
          <Button type='submit' color='primary' size='lg' className='w-full'>
            참여하기
          </Button>
        </form>
        <div>공유받은 팀 링크를 입력해 참여할 수 있어요.</div>
      </div>
    </section>
  );
}
export default JoinGroup;
