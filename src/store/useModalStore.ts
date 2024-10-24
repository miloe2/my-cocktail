import { create } from 'zustand';

// Zustand store 정의
interface ModalStore {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const useModalStore = create<ModalStore>((set) => ({
  isModalOpen: false,
  openModal: () => {
    // 모달을 열고 body overflow를 hidden으로 설정
    set(() => {
      document.body.style.overflow = 'hidden';
      return { isModalOpen: true };
    });
  },
  closeModal: () => {
    // 모달을 닫고 body overflow를 auto로 설정
    set(() => {
      document.body.style.overflow = 'auto';
      return { isModalOpen: false };
    });
  },
}));

export default useModalStore;

