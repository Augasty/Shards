import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const ShardIdNameSlice = createSlice({
  name: 'ShardIdName',
  initialState,
  reducers: {
    setAllShardIdNames: (state, action) => {
      return action.payload;
    },
    updateSingleShardIdName: (state, action) => {
      const { id, title } = action.payload;
      state[id] = title;
      console.log(id,title)

      // console.log('single update list',action.payload)
    }
  }
});

export const { setAllShardIdNames, updateSingleShardIdName } = ShardIdNameSlice.actions;
export default ShardIdNameSlice.reducer;
