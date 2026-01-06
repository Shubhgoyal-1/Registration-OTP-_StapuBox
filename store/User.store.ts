import { create } from "zustand";

interface UserState {
  name: string;
  address: string;
  pinCode: string;
  mobile:string;
  playingStatus: string;
  sport1: string;
  sport2: string;
  feedback: string;

  setField: (key: keyof Omit<UserState, "setField" | "reset">, value: string) => void;
  reset: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  name: "",
  address: "",
  pinCode: "",
  playingStatus: "",
  sport1: "",
  sport2: "",
  feedback: "",
  mobile:"",

  setField: (key, value) =>
    set((state) => ({
      ...state,
      [key]: value,
    })),

  reset: () => ({
    name: "",
    address: "",
    pinCode: "",
    playingStatus: "",
    sport1: "",
    sport2: "",
    feedback: "",
  }),
}));
