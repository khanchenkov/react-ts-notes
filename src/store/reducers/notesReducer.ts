import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import {notesReducerState, INote} from "../../types/types";

const initialState: notesReducerState = {
    notes: [],
    tags: [],
    loading: false,
    error: ""
};

export const notesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        fetchData: (state) => {
            state.loading = true;
            state.error = "";
        },
        fetchDataSuccess: (state, action:PayloadAction<INote[]>) => {
            state.notes = action.payload;
            state.tags = Array.from(new Set(action.payload.map((item) => item.tags).flat()));
            state.loading = false;
            state.error = "";
        },
        fetchDataError: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        removeNoteById: (state, action: PayloadAction<number>) => {
            state.notes = state.notes.filter(item => item.id !== action.payload);
            state.tags = Array.from(new Set(state.notes.map((item) => item.tags).flat()));
        },
        createNote: (state, action: PayloadAction<INote>) => {
            state.notes.unshift(action.payload);
            state.tags = Array.from(new Set(state.notes.map((item) => item.tags).flat()));
        },
        updateNote: (state, action: PayloadAction<INote>) => {
            const editedNoteIndex = state.notes.findIndex(item => item.id === action.payload.id)
            state.notes[editedNoteIndex] = action.payload;
        }
    }
});

export default notesSlice.reducer;