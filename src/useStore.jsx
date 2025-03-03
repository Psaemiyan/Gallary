import { create } from "zustand";

const useStore = create((set) => ({
  selectedFrame: null,
  setSelectedFrame: (frameId) => set({ selectedFrame: frameId }),
}));

export default useStore;
