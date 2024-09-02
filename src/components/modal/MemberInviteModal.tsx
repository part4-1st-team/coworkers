import { IconX } from '@/assets/IconList';
import useModalStore from '@/stores/ModalStore';
import CloseWrapper from './CloseWrapper';
import ModalDescription from './ModalDescription';
import ModalPortal from './ModalPortal';
import ModalTitle from './ModalTitle';

function MemberInviteModal() {
  const handleLinkCopy = () => {
    // NOTE: 링크 복사하는 핸들러 함수 작성하기
  };

  return (
    <ModalPortal>
      <CloseWrapper>
        <div className='px-[36px] pt-[32px] flex flex-col items-center '>
          <ModalTitle title='멤버 초대' />
          <ModalDescription description='그룹에 참여할 수 있는 링크를 복사합니다.' />
          <button
            onClick={handleLinkCopy}
            className='mt-[40px] w-[280px] h-[47px] rounded-[12px] bg-brand-primary text-white'
          >
            링크 복사하기
          </button>
          {/* TODO: 버튼 공통 컴포넌트로 수정하기 */}
        </div>
      </CloseWrapper>
    </ModalPortal>
  );
}

export default MemberInviteModal;
