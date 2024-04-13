import { createSlice } from "@reduxjs/toolkit"

const initialState = []


const ShardSlice = createSlice({
    name: 'Shards',
    initialState,

    reducers: {
        setShardsFromFireBase:(state,action)=>{
            return action.payload
        },
        addSingleShard: (state, action) => {
            state.push(action.payload);
        },

        updateShardProperties: (state, action) => {
            // Find the index of the shard in the state based on its ID or any unique identifier
            const shardIndex = state.findIndex(shard => shard.id === action.payload.id);
            if (shardIndex !== -1) {
                // Update the properties of the shard
                state[shardIndex] = { ...state[shardIndex], ...action.payload.updatedProperties };
            }
        }
    }
})

export const {setShardsFromFireBase, addSingleShard} = ShardSlice.actions
export default ShardSlice.reducer