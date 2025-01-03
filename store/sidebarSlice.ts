import { createSlice } from "@reduxjs/toolkit";

interface SideBarState {
  isOpen: boolean;
}

const initialState: SideBarState = {
  isOpen: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    closeSidebar: (state) => {
      state.isOpen = false;
    },
    openSidebar: (state) => {
      state.isOpen = true;
    },
  },
});

export const { closeSidebar, openSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
