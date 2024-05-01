import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const ShardIdTitleSlice = createSlice({
  name: 'ShardIdTitle',
  initialState,
  reducers: {
    setAllShardIdTitles: (state, action) => {
      return action.payload;
    },
    updateSingleShardIdTitle: (state, action) => {
      const { id, title } = action.payload;
      state[id] = title;
      console.log(id,title)

      // console.log('single update list',action.payload)
    }
  }
});

export const { setAllShardIdTitles, updateSingleShardIdTitle } = ShardIdTitleSlice.actions;
export default ShardIdTitleSlice.reducer;
