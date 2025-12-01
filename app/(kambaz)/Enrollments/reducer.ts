"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as client from "./client";

// 1. Initial state
const initialState = {
  enrollments: [] as any[],
  status: "idle",
};

// 2. Create thunk to fetch enrollments for a user
export const fetchEnrollmentsForUser = createAsyncThunk(
  "enrollments/fetchEnrollmentsForUser",
  async (uid: string) => {
    // FIXED: Changed 'userId' to 'uid' to match the function argument
    const enrollments = await client.fetchEnrollments(uid);
    return enrollments;
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
  },
  // 4. Handle the lifecycle of the fetch thunk
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnrollmentsForUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEnrollmentsForUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.enrollments = action.payload as any;
      })
      .addCase(fetchEnrollmentsForUser.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { addEnrollment, removeEnrollment } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;