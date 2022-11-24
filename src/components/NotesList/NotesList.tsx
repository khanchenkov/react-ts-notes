import React, {FC} from "react";
import NotesListItem from "../NotesListItem/NotesListItem";
import {INotes} from "../../types/types";

const NotesList: FC<INotes> = ({notes}) => {
    return (
        <div>
            {notes && notes.map((item) => <NotesListItem key={item.id} {...item} />)}
        </div>
    );
};

export default NotesList;
