import React, {useEffect, useState} from "react";
import Loading from "./components/Loading/Loading";
import TagsFilter from "./components/TagsFilter/TagsFilter";
import NotesList from "./components/NotesList/NotesList";
import AddNoteInput from "./components/AddNoteInput/AddNoteInput";
import data from "./data/data.json";
import {notesSlice} from "./store/reducers/notesReducer";
import {useAppDispatch, useAppSelector} from "./hooks/redux";

const App = () => {
    const dispatch = useAppDispatch();
    const {loading, error, notes, tags} = useAppSelector(state => state.notes);
    const [tagsFilter, setTagsFilter] = useState<string[]>([])

    useEffect(() => {
        try {
            dispatch(notesSlice.actions.fetchData());
            (async () => {
                setTimeout(() => {
                    dispatch(notesSlice.actions.fetchDataSuccess(data.user1.notes));
                }, 1000);
            })();
        } catch (e: any) {
            dispatch(notesSlice.actions.fetchDataError(e));
        }
    }, [dispatch]);

    return (
        <div className="app">
            {loading && <Loading/>}
            {error && <p>{error}</p>}
            <div className="heading">
                <h1>Notes</h1>
                <TagsFilter
                    userTags={tags.map((item: string) => ({label: item, value: item}))}
                    setFilter={setTagsFilter}
                />
            </div>
            <AddNoteInput/>
            <NotesList
                notes={
                    tagsFilter.length > 0 ?
                    notes.filter(el => el.tags.length + tagsFilter.length > new Set([...el.tags, ...tagsFilter]).size) :
                    notes
                }
            />
        </div>
    );
};

export default App;
