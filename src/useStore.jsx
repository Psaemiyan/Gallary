import { create } from "zustand";
import * as THREE from "three";

const loadingBar = document.querySelector('.loading-bar')
console.log(loadingBar)

const useStore = create((set) => ({
  selectedFrame: null,
  zoomedInFrame: null,  
  loading: true,  
  progress: 0,   

  setSelectedFrame: (frameId) => set({ selectedFrame: frameId }),
  toggleZoom: (frameId) => set((state) => ({
    zoomedInFrame: state.zoomedInFrame === frameId ? null : frameId
  })),

  setLoadingState: (loading, progress) => {
    set((state) => ({ ...state, loading, progress })); 
  },
  

  loadingManager: new THREE.LoadingManager(
    () => {
      set({ loading: false, progress: 100 });
    },
    (url, itemsLoaded, itemsTotal) => {
      const progressRatio = itemsLoaded / itemsTotal;
      set({ progress: progressRatio });
    },
    (url) => {
      console.error(`Error loading: ${url}`);
      set({ loading: false });
    }
  )
}));


export default useStore;

