import { reactive } from 'vue';

type ModalState = {
  settings: boolean;
  changelog: boolean;
};

const state = reactive<ModalState>({
  settings: false,
  changelog: false,
});

export function useModalStore() {
  const openModal = (name: keyof ModalState) => {
    state[name] = true;
  };
  const closeModal = (name: keyof ModalState) => {
    state[name] = false;
  };
  const toggleModal = (name: keyof ModalState) => {
    state[name] = !state[name];
  };

  return {
    modals: state,
    openModal,
    closeModal,
    toggleModal,
  };
}
