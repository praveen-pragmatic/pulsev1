import useStore from '../store/store';
import { ModalState } from '../types';

export const useModal = () => {
  const { modals, toggleModal } = useStore();
  
  const openModal = (modalName: keyof ModalState) => toggleModal(modalName);
  const closeModal = (modalName: keyof ModalState) => toggleModal(modalName);
  
  return {
    modals,
    openModal,
    closeModal,
  };
};