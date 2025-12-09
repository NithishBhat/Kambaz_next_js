import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as client from "./client";

// Async thunks
export const fetchCourses = createAsyncThunk("courses/fetchCourses", async () => {
  const courses = await client.fetchAllCourses();
  return courses;
});

export const addNewCourse = createAsyncThunk("courses/addNewCourse", async (course: any) => {
  const newCourse = await client.createCourse(course);
  return newCourse;
});

export const deleteCourse = createAsyncThunk("courses/deleteCourse", async (courseId: string) => {
  await client.deleteCourse(courseId);
  return courseId;
});

export const updateCourse = createAsyncThunk("courses/updateCourse", async (course: any) => {
  const updatedCourse = await client.updateCourse(course);
  return updatedCourse;
});

const initialState = {
  courses: [] as any[],
  loading: false,
  error: null as string | null,
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, { payload: courses }) => {
      state.courses = courses;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch courses
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch courses";
      })
      // Add course
      .addCase(addNewCourse.fulfilled, (state, action) => {
        state.courses = [...state.courses, action.payload];
      })
      // Delete course
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.courses = state.courses.filter((c) => c._id !== action.payload);
      })
      // Update course
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.courses = state.courses.map((c) =>
          c._id === action.payload._id ? action.payload : c
        );
      });
  },
});

export const { setCourses } = coursesSlice.actions;
export default coursesSlice.reducer;