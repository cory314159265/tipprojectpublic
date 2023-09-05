import create from "zustand";

interface UserState {
  userId: string;
  setUserId: (name: string) => void;
  
}

const useStore = create<UserState>((set) => ({
    userId: "",
    setUserId: (userId) =>
    set((state) => ({
      ...state,
      userId
    })),
    
}));

export default useStore;