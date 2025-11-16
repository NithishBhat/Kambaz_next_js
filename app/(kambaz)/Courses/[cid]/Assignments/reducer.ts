"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as client from "./client"; // Import the new client

// 1. Define the initial state (now empty)
const initialState = {
  assignments: [],
  assignment: {
    title: "New Assignment",
    description: "New Assignment Description",
    points: 100,
    dueDate: "2025-12-31",
    availableFromDate: "2025-01-01",
    availableUntilDate: "2025-12-31",
    course: "",
  },
  status: "idle", // To track loading
};

// 2. Create an async thunk to fetch assignments
export const fetchAssignmentsForCourse = createAsyncThunk(
  "assignments/fetchAssignmentsForCourse",
  async (cid: string) => {
    const assignments = await client.findAssignmentsForCourse(cid);
    return assignments;
  }
);

// 3. Create the slice
const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    // These actions are now "optimistic": we call them *after* the API call succeeds
    addAssignment: (state, action) => {
      state.assignments = [
        ...state.assignments,
        action.payload,
      ] as any;
    },
    deleteAssignment: (state, action) => {
      // action.payload is the assignmentId
      state.assignments = state.assignments.filter(
        (a: any) => a._id !== action.payload
      );
    },
    updateAssignment: (state, action) => {
      // action.payload is the updated assignment
      state.assignments = state.assignments.map((a: any) =>
        a._id === action.payload._id ? action.payload : a
      ) as any;
    },
    setAssignment: (state, action) => {
      state.assignment = action.payload;
    },
  },
  // 4. Handle the async thunk's lifecycle
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssignmentsForCourse.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAssignmentsForCourse.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.assignments = action.payload as any;
      });
  },
});

export const {
  addAssignment,
  deleteAssignment,
  updateAssignment,
  setAssignment,
} = assignmentsSlice.actions;
export default assignmentsSlice.reducer;