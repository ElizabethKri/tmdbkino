import type {RequestStatus} from "@/common/types"
import {createSlice, isFulfilled, isPending, isRejected} from "@reduxjs/toolkit"


export const appSlice = createSlice({
  name: "app",
  initialState: {
    themeMode: "light" as ThemeMode,
    status: "idle" as RequestStatus,
    error: null as string | null,
    isLoggedIn: false,

  },
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectAppError: (state) => state.error,
  },
  reducers: (create) => ({
    changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),

    setAppErrorAC: create.reducer<{ error: string | null }>((state, action) => {
      state.error = action.payload.error
    }),

  }),
  extraReducers: (builder) => {
    builder
        .addMatcher(isPending,
        (state, _action) => {

          // if(
          //     todolistsApi.endpoints.fetchTodolists.matchPending(action) ||
          //     tasksApi.endpoints.getTasks.matchPending(action)
          // ){
          //   return
          // }

          state.status = 'loading'

    })
        .addMatcher(isFulfilled,
            (state) => {
              state.status = 'succeeded'

            })
        .addMatcher(isRejected,
            (state) => {
              state.status = 'failed'
            })
  }
})

export const { selectThemeMode, selectAppError} = appSlice.selectors
export const { changeThemeModeAC, setAppErrorAC} = appSlice.actions
export const appReducer = appSlice.reducer

export type ThemeMode = "dark" | "light"
