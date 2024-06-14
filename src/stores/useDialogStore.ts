import { create } from 'zustand';

interface DialogData {
  url: string;
}

interface DialogProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  data: DialogData | null;
  setData: (data: DialogData) => void;
}

export const useDialog = create<DialogProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  data: null,
  setData: (data) => set({ data }),
}));
