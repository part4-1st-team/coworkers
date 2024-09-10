import useHalfPageStore from '@/stores/HalfPageStore';
import HalfPortal from './HalfPortal';

function HalfPage() {
  const { HalfPage } = useHalfPageStore();

  return <HalfPortal>{HalfPage}</HalfPortal>;
}

export default HalfPage;
