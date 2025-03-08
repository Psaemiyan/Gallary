import { create } from "zustand";
import * as THREE from "three";
const useStore = create((set) => ({
  selectedFrame: null,
  zoomedInFrame: null,  
  loading: true,  
  progress: 0,   

  setSelectedFrame: (frameId) => set({ selectedFrame: frameId }),
  toggleZoom: (frameId) => set((state) => ({
    zoomedInFrame: state.zoomedInFrame === frameId ? null : frameId
  })),

  setLoadingState: (loading, progress) => { set({ loading, progress })},

  loadingManager: new THREE.LoadingManager(
    () => {
      setTimeout(() => set({ loading: false, progress: 100 }), 100); 
    },
    (url, itemsLoaded, itemsTotal) => {
      set({ progress: (itemsLoaded / itemsTotal) * 100 });
    },

    (url) => {
      console.error(`Error loading: ${url}`);
      set({ loading: false })
    }
  ),
}));

export default useStore;
