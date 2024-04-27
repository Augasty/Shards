import { configureStore } from '@reduxjs/toolkit'
import ShardReducer from '../components/Shards/ShardSlice'
import ShardIdNameReducer from '../components/Shards/ShardIdNameSlice'

const store = configureStore({
    reducer:{
        Shards:ShardReducer,
        ShardIdName:ShardIdNameReducer
    }
})

export default store