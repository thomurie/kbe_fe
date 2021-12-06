import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { useQuery, gql } from "@apollo/client";

// export const USER = gql`
//   query Query($email: String!) {
//     user(email: $email) {
//       email
//       first_name
//       last_name
//     }
//   }
// `;

const initialState = {
  info: {},
  status: "idle",
  error: null,
};

// export const fetchUser = createAsyncThunk("anime/fetchTrending", async () => {
//   // localStorage.getItem("user");
//   const { loading, error, data } = await useQuery(USER, {
//     variables: { email: "test0user@aol.com" },
//   });
//   return data || false;
// });

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.info = {
        ...action.payload,
        listings: action.payload.listings?.map((b) => b.bike_id),
        favorites: action.payload.favorites?.map((b) => b.bike_id),
      };
    },
    removeUser: (state) => {
      console.log("here");
      state.info = {};
    },
  },
  // extraReducers(builder) {
  //   builder
  //     .addCase(fetchUser.pending, (state, action) => {
  //       state.status = "loading";
  //     })
  //     .addCase(fetchUser.fulfilled, (state, action) => {
  //       state.status = "succeeded";
  //       state.user = { ...action.payload };
  //     })
  //     .addCase(fetchUser.rejected, (state, action) => {
  //       state.status = "failed";
  //       state.error = action.error.message;
  //     });
  // },
});

export const { addUser, removeUser, addAuth } = userSlice.actions;

export const currentUserName = (state) =>
  `${state.user.info.first_name} ${state.user.info.last_name}.`;

export const currentUser = (state) => state.user.info;

export default userSlice.reducer;
