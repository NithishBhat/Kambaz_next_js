import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as client from "./client";

// Async thunks
export const fetchModules = createAsyncThunk(
  "modules/fetchModules",
  async (courseId: string) => {
    const modules = await client.fetchModulesForCourse(courseId);
    return modules;
  }
);

export const addModule = createAsyncThunk(
  "modules/addModule",
  async ({ courseId, module }: { courseId: string; module: any }) => {
    const newModule = await client.createModule(courseId, module);
    return newModule;
  }
);

export const deleteModule = createAsyncThunk(
  "modules/deleteModule",
  async (moduleId: string) => {
    await client.deleteModule(moduleId);
    return moduleId;
  }
);

export const updateModule = createAsyncThunk(
  "modules/updateModule",
  async (module: any) => {
    const updatedModule = await client.updateModule(module);
    return updatedModule;
  }
);

const initialState = {
  modules: [] as any[],
  loading: false,
  error: null as string | null,
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    editModule: (state, { payload: moduleId }) => {
      state.modules = state.modules.map((m: any) =>
        m._id === moduleId ? { ...m, editing: true } : m
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch modules
      .addCase(fetchModules.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchModules.fulfilled, (state, action) => {
        state.loading = false;
        state.modules = action.payload;
      })
      .addCase(fetchModules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch modules";
      })
      // Add module
      .addCase(addModule.fulfilled, (state, action) => {
        state.modules = [...state.modules, action.payload];
      })
      // Delete module
      .addCase(deleteModule.fulfilled, (state, action) => {
        state.modules = state.modules.filter((m) => m._id !== action.payload);
      })
      // Update module
      .addCase(updateModule.fulfilled, (state, action) => {
        state.modules = state.modules.map((m) =>
          m._id === action.payload._id ? action.payload : m
        );
      });
  },
});

export const { editModule } = modulesSlice.actions;
export default modulesSlice.reducer;