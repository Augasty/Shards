import { configureStore } from '@reduxjs/toolkit'
import ShardReducer from '../components/Shards/ShardSlice'

const store = configureStore({
    reducer:{
        Shards:ShardReducer,
    }
})

export default store