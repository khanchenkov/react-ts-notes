export interface notesReducerState {
    notes: INote[]
    tags: string[]
    loading: boolean
    error: string
}
export interface INote {
    id: number
    text: string
    tags: string[]
}
export interface INotes{
    notes: INote[]
}
export interface TagOption {
    readonly value: string;
    readonly label: string;
}
export interface TagsFilterProps {
    userTags: TagOption[]
    setFilter: any
}