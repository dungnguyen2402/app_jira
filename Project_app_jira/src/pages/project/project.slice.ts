import { createSlice } from '@reduxjs/toolkit'

interface ProjectState {
    projectId: string
}

const initialState: ProjectState = {
    projectId: ''
}

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {}
})

const projectReducer = projectSlice.reducer

export default projectReducer