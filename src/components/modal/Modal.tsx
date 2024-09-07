import useModalStore from '@/stores/ModalStore';
import ModalPortal from './ModalPortal';

function Modal() {
  const { modal } = useModalStore();

  return <ModalPortal>{modal}</ModalPortal>;
}

export default Modal;
