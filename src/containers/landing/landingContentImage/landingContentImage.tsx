import LandingGroupContentImage from '../componet/landingGroupContentImage';
import LandingTasklistContentImage from '../componet/landingTasklistContentImage';
import LadingMemberContentImage from '../componet/ladingMemberContentImage';

function LandingContentImage() {
  return (
    <div className='flex flex-col gap-24 desktop:gap-80 px-24'>
      <LandingGroupContentImage />
      <LadingMemberContentImage />
      <LandingTasklistContentImage />
    </div>
  );
}

export default LandingContentImage;
