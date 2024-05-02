import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const ShardSlice = createSlice({
  name: "Shards",
  initialState,

  reducers: {
    setShardsFromFireBase: (state, action) => {
      return action.payload;
    },
    addSingleShard: (state, action) => {
      state.push(action.payload);
    },

    updateShardProperties: (state, action) => {
      // Find the index of the shard in the state based on its ID or any unique identifier
      const shardIndex = state.findIndex(
        (shard) => shard.id === action.payload.id
      );
      if (shardIndex !== -1) {
        state[shardIndex] = {
          ...state[shardIndex],
          ...action.payload.updatedProperties,
        };
      }
    },

    updateShardsRelatedShards: (state, action) => {
      const shardIndex = state.findIndex(
        (shard) => shard.id === action.payload.id
      );

      // shardIndex, is the index of the shard IN THE ARRAY, NOT IT'S ID OR ANYTHIN
      // WE ARE JUST FINIDNG THE POSITION OF THE SHARD IN THE ARRAY (IF EXISTS)
      if (shardIndex !== -1) {
        console.log(JSON.stringify(state[shardIndex]));
        state[shardIndex][action.payload.relationship] = {
          ...state[shardIndex][action.payload.relationship],
          ...action.payload.updateShardsRelatedShards,
        };

        // console.log(JSON.stringify(state[shardIndex]))
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
