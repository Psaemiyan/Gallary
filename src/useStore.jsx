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

  setLoadingState: (loading, progress) => {
    console.log("Updating loading state:", { loading, progress });
    set((state) => ({ ...state, loading, progress })); // Ensure React registers change
  },
  

  loadingManager: new THREE.LoadingManager(
    () => {
      console.log("All assets loaded - setting loading to false");
      set({ loading: false, progress: 100 });
    },
    (url, itemsLoaded, itemsTotal) => {
      const newProgress = (itemsLoaded / itemsTotal) * 100;
      console.log(`Loading progress: ${newProgress}%`);
      set({ progress: newProgress });
    },
    (url) => {
      console.error(`Error loading: ${url}`);
      set({ loading: false });
    }
  )
}));


export default useStore;

