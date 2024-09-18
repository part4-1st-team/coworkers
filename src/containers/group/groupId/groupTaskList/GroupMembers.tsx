import MemberInfo from '@/components/member/MemberInfo';
import MemberInviteButton from './MemberInviteButton';

function GroupMembers({ Members = [] }: { Members: IMember[] }) {
  const memberCount = Members.length;

  return (
    <section className='w-full mt-64'>
      <div className='w-full flex justify-between'>
        <div className='flex gap-8'>
          <p>멤버</p>
          <p className='text-text-default'>({memberCount}명)</p>
        </div>
        <MemberInviteButton />
      </div>
      <section className='mt-24 grid grid-cols-2 tablet:grid-cols-3 gap-24'>
        {Members.map((item) => (
          <MemberInfo member={item} />
        ))}
      </section>
    </section>
  );
}

export default GroupMembers;
