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

      console.log(action.payload);
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
      const { id, relationship, updateShardsRelatedShards } = action.payload;
      if (state[id]) {
        state[id][relationship] = {
          ...state[id][relationship],
          ...updateShardsRelatedShards,
        };
      }
    },
  },
});

export const {
  setShardsFromFireBase,
  addSingleShard,
  updateShardProperties,
  updateShardsRelatedShards,
} = ShardSlice.actions;
export default ShardSlice.reducer;
