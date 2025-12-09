import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { enrollments } from "./Database";

interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

interface EnrollmentsState {
  enrollments: Enrollment[];
}

const initialState: EnrollmentsState = {
  enrollments: enrollments,
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    addEnrollment: (state, action: PayloadAction<{ user: string; course: string }>) => {
      const newEnrollment: Enrollment = {
        _id: new Date().getTime().toString(),
        user: action.payload.user,
        course: action.payload.course,
      };
      state.enrollments.push(newEnrollment);
    },
    removeEnrollment: (state, action: PayloadAction<{ user: string; course: string }>) => {
      state.enrollments = state.enrollments.filter(
        (e) => !(e.user === action.payload.user && e.course === action.payload.course)
      );
    },
  },
});

export const { addEnrollment, removeEnrollment } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;