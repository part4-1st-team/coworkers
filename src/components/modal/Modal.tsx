import useModalStore from '@/stores/ModalStore';
import ButtonWrapper from './ButtonWrapper';
import CloseWrapper from './CloseWrapper';
import ModalDescription from './ModalDescription';
import ModalPortal from './ModalPortal';
import ModalTitle from './ModalTitle';

function Modal() {
  const { modal } = useModalStore();

  return <ModalPortal>{modal}</ModalPortal>;
}

Modal.Title = ModalTitle;
Modal.Description = ModalDescription;
Modal.Close = CloseWrapper;
Modal.Buttons = ButtonWrapper;

export default Modal;
