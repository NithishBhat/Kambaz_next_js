"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as client from "./client";

const defaultUser = {
  _id: "",
  username: "newuser",
  password: "password",
  firstName: "New",
  lastName: "User",
  role: "STUDENT",
};

const initialState = {
  users: [],
  user: defaultUser,
  status: "idle",
};

export const fetchUsersForCourse = createAsyncThunk(
  "users/fetchUsersForCourse",
  async (cid: string) => {
    const users = await client.findUsersForCourse(cid);
    return users;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // Sync actions for optimistic updates
    addUser: (state, action) => {
      state.users = [action.payload, ...state.users] as any;
    },
    removeUser: (state, action) => {
      // payload is userId
      state.users = state.users.filter((u: any) => u._id !== action.payload);
    },
    editUser: (state, action) => {
      state.users = state.users.map((u: any) =>
        u._id === action.payload._id ? action.payload : u
      ) as any;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    resetUser: (state) => {
      state.user = defaultUser;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersForCourse.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsersForCourse.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload as any;
      });
  },
});

export const { addUser, removeUser, editUser, setUser, resetUser } =
  usersSlice.actions;
export default usersSlice.reducer;