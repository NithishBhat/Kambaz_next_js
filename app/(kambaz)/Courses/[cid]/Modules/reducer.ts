import { createSlice } from "@reduxjs/toolkit";

// 1. Initial state is now empty (we fetch data from the server)
const initialState = {
  modules: [],
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    // 2. NEW: Action to load data fetched from the API
    setModules: (state, action) => {
      state.modules = action.payload;
    },

    // 3. UPDATED: No longer generate IDs locally. 
    // The payload now contains the full module object returned by the server (including the new _id)
    addModule: (state, { payload: module }) => {
      const newModule: any = module;
      state.modules = [...state.modules, newModule] as any;
    },

    deleteModule: (state, { payload: moduleId }) => {
      state.modules = state.modules.filter(
        (m: any) => m._id !== moduleId);
    },
    updateModule: (state, { payload: module }) => {
      state.modules = state.modules.map((m: any) =>
        m._id === module._id ? module : m
      ) as any;
    },
    editModule: (state, { payload: moduleId }) => {
      state.modules = state.modules.map((m: any) =>
        m._id === moduleId ? { ...m, editing: true } : m
      ) as any;
    },
  },
});

// 4. Export setModules so it can be used in page.tsx
export const { addModule, deleteModule, updateModule, editModule, setModules } =
  modulesSlice.actions;
export default modulesSlice.reducer;