import { useState } from 'react';
import { useRouter } from 'next/router';
import useToast from '@/components/toast/useToast';
import Button from '@/components/button/button';

function Terms() {
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked); // 체크 박스 상태 업데이트
  };

  const handleSubmit = () => {
    if (isChecked) {
      // 약관 동의 시 회원가입 페이지로 이동
      router.push('/auth/signup');
    } else {
      // 약관 미동의 시 알림 출력
      toast('Error', '약관에 동의해야 합니다.');
    }
  };

  return (
    <div className='flex justify-center items-center bg-background-primary dark:bg-background-primary-dark text-text-primary dark:text-text-primary-dark tablet:mx-142 tablet:mt-160 desktop:mx-430 desktop:mt-160 mt-84'>
      <div className='w-500'>
        <span className='block text-30 font-bold text-brand-primary'>
          coworkers
        </span>
        <h1 className='block font-extrabold text-20'>약관에 동의해 주세요.</h1>
        <div className='mt-30'>
          <div className='flex'>
            <input
              type='checkbox'
              className='mr-10'
              onChange={handleCheckboxChange}
            />
            <p>개인정보 수집/이용(필수)</p>
          </div>
          <div className='h-300 overflow-scroll my-15'>
            <p>
              1. 개인정보 수집 항목 : 회사는 서비스 제공을 위해 다음과 같은
              개인정보를 수집합니다: 필수항목: 이름, 이메일 주소, 전화번호,
              생년월일 <br />
              <br />
              2. 개인정보 수집 및 이용 목적 : 수집된 개인정보는 다음 목적을 위해
              사용됩니다: 회원 가입 및 관리: 본인 확인, 계정 관리 서비스 제공:
              서비스 이용 및 관련 문의 처리 마케팅 및 광고: 이벤트 정보 제공,
              맞춤형 광고 제공 <br />
              <br />
              3. 개인정보 보유 및 이용 기간 : 회사는 원칙적으로 개인정보 수집 및
              이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단,
              법령에 따라 보관이 필요한 경우에는 다음과 같이 개인정보를
              보관합니다: 회원 탈퇴 시: 1년간 보관 법적 분쟁 및 민원 해결을 위한
              기록: 3년간 보관 <br />
              <br />
              4. 개인정보 제3자 제공 : 회사는 이용자의 동의 없이 개인정보를
              제3자에게 제공하지 않습니다. 다만, 다음의 경우에는 예외로 합니다:
              법령의 규정에 의한 경우 이용자가 사전에 동의한 경우
              <br />
              <br /> 5. 개인정보 처리 위탁 : 회사는 서비스 이행을 위해 외부
              업체에 개인정보 처리를 위탁할 수 있으며, 위탁하는 업무의 내용은
              다음과 같습니다: 위탁받는 자: [coworkers] 위탁 업무 내용: 데이터
              저장 및 처리, 결제 대행 등<br />
              <br />
              6. 개인정보의 파기 절차 및 방법 : 회사는 개인정보 보유 기간이
              경과하거나 처리 목적이 달성된 경우, 해당 정보를 지체 없이
              파기합니다. 파기 방법은 다음과 같습니다: 전자적 파일: 복구
              불가능한 방법으로 삭제 서면 자료: 분쇄기로 분쇄하거나 소각
              <br />
              <br />
              7. 개인정보 제공 동의 거부 권리 : 이용자는 개인정보 수집 및 이용
              동의를 거부할 권리가 있습니다. 다만, 필수항목에 대한 동의를 거부할
              경우 서비스 이용에 제한이 있을 수 있습니다.
            </p>
          </div>
        </div>
        <Button
          type='submit'
          color='primary'
          size='lg'
          className='w-full'
          onClick={handleSubmit}
        >
          동의
        </Button>
      </div>
    </div>
  );
}

export default Terms;
