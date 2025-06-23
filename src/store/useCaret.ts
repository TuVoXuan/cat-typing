import { CaretStyle, Dimension, Position } from "@/types";
import { create } from "zustand";

interface ICaretState {
  position: Position| null;
  dimension: Dimension | null;
  style: CaretStyle;
  setPosition: (position: Position | null) => void;
  setStyle: (style: CaretStyle) => void;
  setDimension: (dimension: Dimension | null) => void;
}

const useCaretStore = create<ICaretState>()((set) => ({
  position: null,
  style: 'default',
  dimension: null,
  setDimension: (dimension) => set({ dimension }),
  setPosition: (position) => set({ position }),
  setStyle: (style) => set({ style }),
}));

export default useCaretStore;