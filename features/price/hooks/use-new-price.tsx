import { create } from "zustand";

type NewPriceState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewPrice = create<NewPriceState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
