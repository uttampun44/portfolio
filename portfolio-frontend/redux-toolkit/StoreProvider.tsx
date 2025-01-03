import { createSlice } from "@reduxjs/toolkit"

interface toggles {
  toggle:boolean,
  active:boolean
}
const initialState:toggles = {
    toggle: false,
    active: false,
}

export const storeSlice = createSlice({
    name: "togglesFunc",
    initialState,
    reducers: {
       toggle: (state) =>{
            state.toggle =  !state.toggle
       },

       active: (state) =>{
         state.active = !state.active
       }
    }
})

export const {toggle, active} = storeSlice.actions

export default storeSlice.reducer