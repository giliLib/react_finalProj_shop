import { createSlice, current } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: { currentUser: null },
    reducers: {
        userIn: (state, action) => {
            state.currentUser = action.payload;
            localStorage.setItem("currentUser", JSON.stringify(state.currentUser));

        },
        userOut: (state) => {
            state.currentUser = null;
            localStorage.removeItem("currentUser");
        }
    }
});
export const { userIn, userOut } = userSlice.actions;

export default userSlice.reducer;