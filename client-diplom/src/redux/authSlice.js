import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading: false,
    error: undefined,
    id: localStorage.getItem('id'),
    token: localStorage.getItem('token')
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logOut: (state) => {
            state.loading = false
            state.error = undefined
            state.id = undefined
            state.token = undefined

            localStorage.removeItem("id")
            localStorage.removeItem("token")
        }
    },
    extraReducers: (builder) => {
        builder.addCase(authThunk.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(authThunk.fulfilled, (state, action) => {
            const payload = action.payload
            console.log(payload.message);

            state.message = payload.message
            state.id = payload.user?.id
            state.token = payload.token

            localStorage.setItem("id", payload.user?.id)
            localStorage.setItem("token", payload.token)

            state.error = undefined
            state.loading = false
        })
        builder.addCase(authThunk.rejected, (state, action) => {
            const payload = action.payload

            state.error = payload.message
            state.loading = false
        })
    }
})

export const authThunk = createAsyncThunk('authThunk', async (data, { rejectWithValue }) => {
    try {
        const response = await fetch(`http://localhost:8080/api/users/auth`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const json = await response.json()
        if (response.status == 400) {
            return rejectWithValue(json)
        }
        return json
    } catch (error) {
        console.log(error);
        return rejectWithValue(error)
    }
})

export const { logOut } = authSlice.actions
export default authSlice.reducer