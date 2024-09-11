import { IconImg } from '@/assets/IconList';
import Button from '@/components/button/button';
import EditButton from '@/components/button/editButton';
import Input from '@/components/input/input';

function CreateGroup() {
  return (
    <section className='mx-16 tablet:mx-142 desktop:mx-430 mt-132 text-lg text-text-primary'>
      <div className='w-full flex flex-col items-center gap-24'>
        <div className='text-4xl'>팀 생성하기</div>
        <form className='w-full'>
          <div className='w-64 mb-24'>
            <div className='mb-12'>팀 프로필</div>
            <div className='relative w-64 h-64 rounded-full bg-background-secondary border-2 border-border-primary flex justify-center items-center'>
              <IconImg />
              <div className='w-18 h-18 absolute bottom-0 right-0 flex items-center justify-center rounded-full border-2 border-background-primary bg-background-tertiary'>
                <EditButton size='sm' />
              </div>
            </div>
          </div>
          <div className='mb-40'>
            <div className='mb-12'>팀 이름</div>
            <Input placeholder='팀 이름을 입력해주세요.' />
          </div>
          <Button type='submit' color='primary' size='lg' className='w-full'>
            생성하기
          </Button>
        </form>
        <div>팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.</div>
      </div>
    </section>
  );
}
export default CreateGroup;
