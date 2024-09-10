import useHalfPageStore from '@/stores/HalfPageStore';
import HalfPortal from './HalfPortal';

function HalfPage() {
  const { halfPage } = useHalfPageStore();

  return <HalfPortal>{halfPage}</HalfPortal>;
}

export default HalfPage;
