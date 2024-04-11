import { createSlice } from "@reduxjs/toolkit"

const initialState = []


const ShardSlice = createSlice({
    name: 'Shards',
    initialState,

    reducers: {
        setShardsFromFireBase:(state,action)=>{
            return action.payload
        }
    }
})

export const {setShardsFromFireBase, addSingleShard} = ShardSlice.actions
export default ShardSlice.reducer