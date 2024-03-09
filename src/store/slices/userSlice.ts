import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

import { User } from "../../interface/interface";




type UserCurent = {
    user: User;
    loading: boolean;
    userStatus:boolean;
};

const initialValue: UserCurent = {
    user: {
        id: '',
        name: '',
        email: '',
        posts: [],
        created: '',
    },
    loading: false,
    userStatus:false,
};

export const setValueAsync = createAsyncThunk(
    "user/currentUser",
    async (value: User) => {
        return await value
    }
)

const userSlice = createSlice({
    name: "user",
    initialState: initialValue,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(setValueAsync.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.userStatus = true
        });

        builder.addCase(setValueAsync.rejected, (state) => {
            state.user = initialValue.user
            state.loading = false;
             state.userStatus = false
        });

        builder.addCase(setValueAsync.pending, (state) => {
            state.loading = true;
             state.userStatus = false
        });
    },
})

export const { } = userSlice.actions;
export const userReducer = (store: RootState) => store.userReducer;
export default userSlice.reducer;