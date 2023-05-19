import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    taskSearch: ''
}

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        searchTask: (state , action) => {
            state.taskSearch = action.payload;
        },
        clearSearchTask: (state) => {
            state.taskSearch = ''
        }
    }
})

const taskReducer = taskSlice.reducer

export default taskReducer

export const {searchTask , clearSearchTask } = taskSlice.actions