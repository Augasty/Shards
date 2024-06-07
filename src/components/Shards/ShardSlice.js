import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const ShardSlice = createSlice({
  name: "Shards",
  initialState,

  reducers: {
    setShardsFromFireBase: (state, action) => {
      // Assuming action.payload is an object with ids as keys
      return { ...action.payload };
    },
    addSingleShard: (state, action) => {
      state[action.payload.id] = action.payload;

      // console.log(action.payload);
    },

    updateShardProperties: (state, action) => {
      const { id, updatedProperties } = action.payload;
      if (state[id]) {
        state[id] = {
          ...state[id],
          ...updatedProperties,
        };
      }
    },

    updateShardsRelatedShards: (state, action) => {
      // check why this is not working

      if (state[action.payload.id]) {
        state[action.payload.id][action.payload.relationship] = {
          ...state[action.payload.id][action.payload.relationship],
          ...action.payload.updateShardsRelatedShards,
        };
      }
    },

    deleteSingleShard: (state, action) => {
      const { id } = action.payload;
      if (state[id]) {
        delete state[id];
      }
    },
  },
});

export const {
  setShardsFromFireBase,
  addSingleShard,
  updateShardProperties,
  updateShardsRelatedShards,
  deleteSingleShard
} = ShardSlice.actions;
export default ShardSlice.reducer;
