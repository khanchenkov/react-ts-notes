import React, {useState} from "react";
import "./AddNoteInput.sass";
import {notesSlice} from "../../store/reducers/notesReducer";
import {useAppDispatch} from "../../hooks/redux";

const AddNoteInput = () => {
    const dispatch = useAppDispatch();
    const [noteText, setNoteText] = useState<string>("");
    const [noteTags, setNoteTags] = useState<string[]>([]);

    const removeTag = (tagIndex: number) => {
        setNoteTags(noteTags => noteTags.filter((el, i) => tagIndex !== i))
    };
    const createNoteBlurHandler = (e: any) => {
        const editedText = e.currentTarget.textContent;
        const tagRegExp = /(#[A-Za-zA-Яа-я0-9_]+)/g;
        setNoteText(editedText.replace(tagRegExp, "<span class='note__text-tag'>$1</span>"));
        if (editedText.match(tagRegExp)) {
            setNoteTags(Array.from(new Set(editedText.match(tagRegExp).map((el: string) => el.trim()))));
        } else {
            setNoteTags([])
        }
    };
    const createNote = () => {
        if (!noteText) {
            return null;
        }
        const newNote = {
            id: Number(new Date()),
            text: noteText,
            tags: noteTags
        }
        dispatch(notesSlice.actions.createNote(newNote))
        setNoteText("");
        setNoteTags([]);
    };

    return (
        <div className="add-note-block">
            <div className="new-note__editor">
                <span
                    contentEditable={true}
                    onBlur={(e) => createNoteBlurHandler(e)}
                    dangerouslySetInnerHTML={{__html: noteText}}
                ></span>
                <button onClick={createNote}>
                    <svg className="svg-success" xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 36 36">
                        <path fill="currentColor" d="M18 2a16 16 0 1 0 16 16A16 16 0 0 0 18 2Zm10.45 10.63L15.31 25.76L7.55 18a1.4 1.4 0 0 1 2-2l5.78 5.78l11.14-11.13a1.4 1.4 0 1 1 2 2Z" className="clr-i-solid clr-i-solid-path-1"/>
                    </svg>
                </button>
            </div>
            <div>
                {noteTags && noteTags.map((item, i) => {
                    return <span className="new-note__tag" key={i}>
                    {item}
                        <button onClick={() => removeTag(i)}>
                        <svg className="svg-remove" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16">
                        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                            <path d="m10.25 5.75l-4.5 4.5m0-4.5l4.5 4.5"/><circle cx="8" cy="8" r="6.25"/>
                        </g>
                    </svg>
                    </button>
                </span>
                })}
            </div>
        </div>
    );
};

export default AddNoteInput;
