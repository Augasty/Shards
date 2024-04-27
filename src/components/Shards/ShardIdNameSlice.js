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
      const { id, name } = action.payload;
      state[id] = name;

      // console.log('single update list',action.payload)
    }
  }
});

export const { setAllShardIdNames, updateSingleShardIdName } = ShardIdNameSlice.actions;
export default ShardIdNameSlice.reducer;
