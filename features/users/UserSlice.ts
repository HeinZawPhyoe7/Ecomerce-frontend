import { UsersState, UserT } from "@/lib/types/usersType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UsersState = {
  newUsers: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUsers: (state, action: PayloadAction<UserT>) => {
      state.newUsers.push(action.payload);
    },
  },
});

export const { addUsers } = userSlice.actions;
export default userSlice.reducer;
