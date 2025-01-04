import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface toggles {
  token:string | null,
}
const initialState:toggles = {
   token:null,
}

export const authSlice = createSlice({
    name: "authFunc",
    initialState,
    reducers: {
       setToken: (state, action: PayloadAction<string>) => {
        state.token = action.payload
      },
      clearToken: (state) => {
        state.token = null
      }
    }
})

export const {setToken, clearToken} = authSlice.actions

export default authSlice.reducer