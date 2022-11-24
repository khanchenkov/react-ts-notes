import {configureStore} from "@reduxjs/toolkit";
import notesSlice from "./reducers/notesReducer";

export const store = configureStore({
    reducer: {
        notes: notesSlice
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch