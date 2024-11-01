import { create } from "zustand";

type useOpenPrice = {
  id: string | null;
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
};

export const useOpenPrice = create<useOpenPrice>((set) => ({
  id: null,
  isOpen: false,
  onOpen: (id: string) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false, id: null }),
}));
