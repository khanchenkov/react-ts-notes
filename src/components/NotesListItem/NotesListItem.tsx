import React, {FC, useEffect, useState} from "react";
import {INote} from "../../types/types";
import {notesSlice} from "../../store/reducers/notesReducer";
import "./NotesListItem.sass";
import {useAppDispatch} from "../../hooks/redux";

const NotesListItem: FC<INote> = ({id, text, tags}) => {
    const dispatch = useAppDispatch();
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [noteText, setNoteText] = useState<string>(text);
    const [noteTags, setNoteTags] = useState<string[]>(tags)

    const editNoteBlurHandler = (e: any) => {
        const editedText = e.currentTarget.textContent;
        const tagRegExp = /(#[A-Za-zA-Яа-я0-9_]+\s{0})/g;
        setNoteText(editedText.replace(tagRegExp, "<span class='note__text-tag'>$1</span>"));
        if (editedText.match(tagRegExp)) {
            setNoteTags(Array.from(new Set(editedText.match(tagRegExp).map((el: string) => el.trim()))));
        } else {
            setNoteTags([])
        }
    }
    const removeNote = (noteId: number) => {
        dispatch(notesSlice.actions.removeNoteById(noteId))
    }
    const removeTag = (tagIndex: number) => {
        setNoteTags(noteTags => noteTags.filter((el, i) => tagIndex !== i))
    }
    const finishEditing = () => {
        setIsEditing(false);
        if (!noteText) {
            removeNote(id);
        }
        const editedNote = {
            id: id,
            text: noteText,
            tags: noteTags
        };
        dispatch(notesSlice.actions.updateNote(editedNote));
    }
    useEffect(() => {
        const tagRegExp = /(#[A-Za-zA-Яа-я0-9_-]+\s{0})/g;
        setNoteText(noteText => noteText.replace(tagRegExp, "<span class='note__text-tag'>$1</span>"));
    }, [id, text, isEditing]);

    return (
        <div className="note">
            {
                !isEditing ?
                    <>
                        <div className="note__show">
                            <span id={`noteId_${id}`} dangerouslySetInnerHTML={{__html: noteText}}></span>
                            <div>
                                <button onClick={() => setIsEditing(true)}>
                                    <svg className="svg-edit"  xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                        <path d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75L3 17.25Z"/>
                                    </svg>
                                </button>
                                <button onClick={() => removeNote(id)}>
                                    <svg className="svg-remove" xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16">
                                        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                                            <path d="m10.25 5.75l-4.5 4.5m0-4.5l4.5 4.5"/><circle cx="8" cy="8" r="6.25"/>
                                        </g>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="note__tags">
                            {noteTags && noteTags.map((item, i) => <span className="note__tag" key={i}>{item}</span>)}
                        </div>
                    </>
                :
                    <>
                        <div className="note__edit">
                            <span
                                id={`noteId_${id}`}
                                className="note__editor"
                                contentEditable={true}
                                onBlur={(e) => editNoteBlurHandler(e)}
                                dangerouslySetInnerHTML={{__html: noteText}}
                            ></span>
                            <button onClick={finishEditing}>
                                <svg className="svg-success" xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 36 36">
                                    <path fill="currentColor" d="M18 2a16 16 0 1 0 16 16A16 16 0 0 0 18 2Zm10.45 10.63L15.31 25.76L7.55 18a1.4 1.4 0 0 1 2-2l5.78 5.78l11.14-11.13a1.4 1.4 0 1 1 2 2Z" className="clr-i-solid clr-i-solid-path-1"/>
                                </svg>
                            </button>
                        </div>
                        <div>
                            {noteTags && noteTags.map((item, i) => {
                                return <span className="note__tag" key={i}>
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
                    </>
            }
        </div>
    );
};

export default NotesListItem;
