export interface Store {
    selectedNotes: Array<string>;
}

export const initialState: Store = {
    selectedNotes: [],
};

export const ADD_NOTE = 'ADD_NOTE';
export const REMOVE_NOTE = 'REMOVE_NOTE';

export const addNoteAction = (note: string) => ({
    type: ADD_NOTE,
    payload: { note },
});

export const removeNoteAction = (note: string) => ({
    type: REMOVE_NOTE,
    payload: { note },
});

export type Actions =
    | ReturnType<typeof addNoteAction>
    | ReturnType<typeof removeNoteAction>;

export const reducer = (state = initialState, action: Actions): Store => {
    switch (action.type) {
        case ADD_NOTE:
            return {
                ...state,
                selectedNotes: [
                    ...state.selectedNotes,
                    action.payload.note,
                ].sort(),
            };
        case REMOVE_NOTE:
            return {
                ...state,
                selectedNotes: state.selectedNotes.filter(
                    (note) => note !== action.payload.note
                ),
            };
        default:
            return state;
    }
};
