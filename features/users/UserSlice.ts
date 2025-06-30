import { UsersState, UserT } from "@/lib/types/usersType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UsersState = {
  newUsers: {
    id: 0,
    name: "",
    email: "",
  },
  accessToken: "",
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUsers: (state, action: PayloadAction<UsersState>) => {
      state.newUsers = action.payload.newUsers;
      state.accessToken = action.payload.accessToken;
    },
  },
});

export const { addUsers } = userSlice.actions;
export default userSlice.reducer;
