import Image from 'next/image';

// NOTE 절대 경로 루트가 뭔가 이상함
import TodoImg from '../../../../public/images/img_todo.png';
import DoneImg from '../../../../public/images/img_done.png';

// TODO 반응형 작업

function JoinGroupPage() {
  return (
    // NOTE h 사이즈 full 적용되도록 수정
    <div className='w-[full] h-[calc(100vh-60px)] bg-background-primary text-text-primary text-lg'>
      <section className='w-[1200px] mx-[auto] pt-[24px]'>
        {/* TODO 컴포넌트로 변경, 데이터 연동, 설정 클릭 구현 */}
        <section className='w-[full] h-[64px] bg-border-primary rounded-[12px] font-medium p-[24px]'>
          현재 팀/설정 컴포넌트
        </section>
        <section className='w-[full] mt-[24px] flex flex-col gap-[16px]'>
          <div className='w-[full] flex justify-between'>
            <div className='flex gap-[8px]'>
              <p>할 일 목록</p>
              <p className='text-text-default'>(4개)</p>
            </div>
            <p className='text-brand-primary '>+ 새로운 목록 추가하기</p>
          </div>
          {/* TODO 컴포넌트로 변경, 데이터 연동, 설정 클릭 구현 */}
          <div className='flex flex-col gap-[16px]'>
            <p className='w-[full] h-[40px] rounded-[12px] bg-background-secondary p-[12px]'>
              리스트 컴포넌트
            </p>
            <p className='w-[full] h-[40px] rounded-[12px] bg-background-secondary p-[12px]'>
              리스트 컴포넌트
            </p>
            <p className='w-[full] h-[40px] rounded-[12px] bg-background-secondary p-[12px]'>
              리스트 컴포넌트
            </p>
          </div>
        </section>
        {/* TODO 관리자 상태에서만 리포트 보이도록 적용 */}
        <section className='w-[full] mt-[48px]'>
          <p className='mb-[16px]'>리포트</p>
          <section className='w-[full] h-[224px] bg-background-secondary rounded-[12px] flex justify-between pl-[48px] pr-[24px] pt-[24px] pb-[24px]'>
            <div className='flex gap-[64px] items-center'>
              {/* TODO 도넛 차트 */}
              <div className='w-[140px] h-[140px] rounded-[9999px] bg-brand-secondary'>
                chart
              </div>
              <div className='flex flex-col gap-[16px]'>
                <div className='text-md'>
                  <p>오늘의</p>
                  <p>진행 상황</p>
                </div>
                {/* TODO 텍스트 그라데이션 적용 (text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-tertiary) */}
                <p className='text-[40px] font-[700]'>00%</p>
              </div>
            </div>
            <section className='flex flex-col gap-[16px]'>
              <div className='w-[400px] h-[76px] rounded-[12px] bg-background-tertiary  p-[16px] flex justify-between items-center'>
                <div className='flex flex-col gap-[6px]'>
                  <p className='text-xs'>오늘의 할 일</p>
                  <p className='text-[24px] text-brand-tertiary font-bold'>
                    20개
                  </p>
                </div>
                <div>
                  <Image
                    src={TodoImg}
                    alt='todo image'
                    width={40}
                    height={40}
                  />
                </div>
              </div>
              <div className='w-[400px] h-[76px] rounded-[12px] bg-background-tertiary p-[16px] flex justify-between items-center'>
                <div className='flex flex-col gap-[6px]'>
                  <p className='text-xs'>한 일</p>
                  <p className='text-[24px] text-brand-tertiary font-bold'>
                    5개
                  </p>
                </div>
                <div>
                  <Image
                    src={DoneImg}
                    alt='done image'
                    width={40}
                    height={40}
                  />
                </div>
              </div>
            </section>
          </section>
        </section>
        <section className='w-[full] mt-[64px]'>
          <div className='w-[full] flex justify-between'>
            <div className='flex gap-[8px]'>
              <p>멤버</p>
              <p className='text-text-default'>(6명)</p>
            </div>
            <div className='text-brand-primary'>+ 새로운 멤버 초대하기</div>
          </div>
          {/* TODO 멤버 컴포넌트로 변경, 데이터 연동, 페이지네이션 */}
          <section className='mt-[24px] grid grid-cols-3 gap-[24px]'>
            <div className='bg-background-secondary'>멤버 컴포넌트</div>
            <div className='bg-background-secondary'>멤버 컴포넌트</div>
            <div className='bg-background-secondary'>멤버 컴포넌트</div>
          </section>
        </section>
      </section>
    </div>
  );
}
export default JoinGroupPage;
