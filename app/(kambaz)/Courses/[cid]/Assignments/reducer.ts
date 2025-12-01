"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as client from "./client";

const initialState = {
  assignments: [] as any[],
  status: "idle",
  error: null as string | null,
};

// Async Thunk to fetch assignments from API
export const fetchAssignmentsForCourse = createAsyncThunk(
  "assignments/fetchAssignmentsForCourse",
  async (cid: string) => {
    const assignments = await client.findAssignmentsForCourse(cid);
    return assignments;
  }
);

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    // Manually set assignments (if needed)
    setAssignments: (state, action) => {
      state.assignments = action.payload;
    },
    // Update state after successful API creation
    addAssignment: (state, { payload: assignment }) => {
      state.assignments.push(assignment);
    },
    // Update state after successful API deletion
    deleteAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter(
        (a: any) => a._id !== assignmentId
      );
    },
    // Update state after successful API update
    updateAssignment: (state, { payload: assignment }) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === assignment._id ? assignment : a
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssignmentsForCourse.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAssignmentsForCourse.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.assignments = action.payload;
      })
      .addCase(fetchAssignmentsForCourse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch assignments";
      });
  },
});

export const {
  addAssignment,
  deleteAssignment,
  updateAssignment,
  setAssignments,
} = assignmentsSlice.actions;
export default assignmentsSlice.reducer;