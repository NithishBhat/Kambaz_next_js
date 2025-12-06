import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./Courses/reducer";
import modulesReducer from "./Courses/[cid]/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentsReducer from "./Courses/[cid]/Assignments/reducer";
import enrollmentsReducer from "./Enrollments/reducer";
import usersReducer from "./Users/reducer"; // 1. Import new reducer
import quizzesReducer from "./Courses/[cid]/Quizzes/reducer";
const store = configureStore({
  reducer: {
    coursesReducer,
    modulesReducer,
    accountReducer,
    assignmentsReducer,
    enrollmentsReducer,
    usersReducer, // 2. Add new reducer
    quizzes: quizzesReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;