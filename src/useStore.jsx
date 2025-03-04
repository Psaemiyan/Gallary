import { create } from "zustand";

const useStore = create((set) => ({
  selectedFrame: null,
  zoomedInFrame: null,  // Track the frame that is zoomed in
  setSelectedFrame: (frameId) => set({ selectedFrame: frameId }),
  toggleZoom: (frameId) => set((state) => {
    if (state.zoomedInFrame === frameId) {
      // If the same frame is clicked again, zoom out
      return { zoomedInFrame: null }; // Set to null to indicate zoomed out
    } else {
      // If it's a different frame, zoom in and update the state
      return { zoomedInFrame: frameId }; 
    }
  }),
}));

export default useStore;

  