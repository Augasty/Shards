import { configureStore } from '@reduxjs/toolkit'
import ShardReducer from '../components/Shards/ShardSlice'
import ShardIdTitleReducer from '../components/Shards/ShardIdTitleSlice'

// Configure the store with reducers
const store = configureStore({
  reducer: {
    Shards: ShardReducer,
    ShardIdTitle: ShardIdTitleReducer,
  },
})

// Define the RootState type based on the reducers
export type RootState = ReturnType<typeof store.getState>

// Define the AppDispatch type
export type AppDispatch = typeof store.dispatch

export default store
