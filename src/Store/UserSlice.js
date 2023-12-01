import {createSlice} from '@reduxjs/toolkit'

const UserSlice = createSlice({
    name: 'user',
    initialState: {
        user: false
    },
    reducers: {
        changeUser(state, action){
            state.user = action.payload
        },
        changeStatus(state, action){
            state.user.awardStatus = action.payload
        }
    }
})

export const userActions = UserSlice.actions;

export default UserSlice