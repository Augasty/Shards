import { configureStore } from '@reduxjs/toolkit'
import ShardReducer from '../components/Shards/ShardSlice'
import ShardIdTitleReducer from '../components/Shards/ShardIdTitleSlice'

const store = configureStore({
    reducer:{
        Shards:ShardReducer,
        ShardIdTitle:ShardIdTitleReducer
    }
})

export default store