import { UserT } from "@/lib/types/usersType";
import { createSlice } from "@reduxjs/toolkit";

const initialState: UserT = {
  id: 0,
  name: "",
  email: "",
};
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export default userSlice.reducer;
