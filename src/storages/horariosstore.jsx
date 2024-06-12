import { create } from 'zustand';

const useHorariosStore = create((set) => ({
  selectedDays: [],
  selectedStartTime: '',
  selectedEndTime: '',
  setSelectedDays: (days) => set({ selectedDays: days }),
  setSelectedStartTime: (time) => set({ selectedStartTime: time }),
  setSelectedEndTime: (time) => set({ selectedEndTime: time }),
}));

export default useHorariosStore;
