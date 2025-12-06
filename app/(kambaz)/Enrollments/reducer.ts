"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as client from "./client";

// 1. Initial state
const initialState = {
  enrollments: [] as any[],
  status: "idle",
  currentUserId: null as string | null,
};

// 2. Create thunk to fetch enrollments for a user
export const fetchEnrollmentsForUser = createAsyncThunk(
  "enrollments/fetchEnrollmentsForUser",
  async (uid: string) => {
    const enrollments = await client.fetchEnrollments(uid);
    return { enrollments, userId: uid };
  }
);

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    // 3. Sync actions to update state *after* API call succeeds
    addEnrollment: (state, action) => {
      state.enrollments.push(action.payload as any);
    },
    removeEnrollment: (state, action) => {
      const { user, course } = action.payload;
      state.enrollments = state.enrollments.filter(
        (e: any) => !(e.user === user && e.course === course)
      ) as any;
    },
    // Reset enrollments when user changes
    resetEnrollments: (state) => {
      state.enrollments = [];
      state.status = "idle";
      state.currentUserId = null;
    },
  },
  // 4. Handle the lifecycle of the fetch thunk
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnrollmentsForUser.pending, (state, action) => {
        state.status = "loading";
        // Clear old enrollments when fetching for potentially new user
        state.enrollments = [];
      })
      .addCase(fetchEnrollmentsForUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.enrollments = action.payload.enrollments as any;
        state.currentUserId = action.payload.userId;
      })
      .addCase(fetchEnrollmentsForUser.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { addEnrollment, removeEnrollment, resetEnrollments } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;