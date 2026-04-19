export type ScaleType = 'major' | 'minor' | 'harmonicMinor' | 'dorian' | 'phrygian' | 'lydian' | 'pentatonicMinor';

export interface Store {
    selectedNotes: Array<string>;
    rootNote: string | null;
    scaleType: ScaleType;
    hoveredChord: string[] | null;
}

export const initialState: Store = {
    selectedNotes: [],
    rootNote: null,
    scaleType: 'major',
    hoveredChord: null,
};

export const ADD_NOTE = 'ADD_NOTE';
export const REMOVE_NOTE = 'REMOVE_NOTE';
export const CLEAR_STATE = 'CLEAR_STATE';
export const SET_SCALE_TYPE = 'SET_SCALE_TYPE';
export const SET_HOVERED_CHORD = 'SET_HOVERED_CHORD';
export const CLEAR_HOVERED_CHORD = 'CLEAR_HOVERED_CHORD';

export const addNoteAction = (note: string) => ({
    type: ADD_NOTE,
    payload: { note },
});

export const removeNoteAction = (note: string) => ({
    type: REMOVE_NOTE,
    payload: { note },
});

export const clearStateAction = () => ({
    type: CLEAR_STATE,
});

export const setScaleTypeAction = (scaleType: ScaleType) => ({
    type: SET_SCALE_TYPE,
    payload: { scaleType },
});

export const setHoveredChordAction = (chord: string[]) => ({
    type: SET_HOVERED_CHORD,
    payload: { chord },
});

export const clearHoveredChordAction = () => ({
    type: CLEAR_HOVERED_CHORD,
});

export type Actions =
    | ReturnType<typeof addNoteAction>
    | ReturnType<typeof removeNoteAction>
    | ReturnType<typeof clearStateAction>
    | ReturnType<typeof setScaleTypeAction>
    | ReturnType<typeof setHoveredChordAction>
    | ReturnType<typeof clearHoveredChordAction>;

export const reducer = (state = initialState, action: Actions): Store => {
    switch (action.type) {
        case ADD_NOTE: {
            const addAction = action as ReturnType<typeof addNoteAction>;
            const newSelectedNotes = [...state.selectedNotes, addAction.payload.note];
            return {
                ...state,
                selectedNotes: newSelectedNotes,
                rootNote: state.rootNote || addAction.payload.note,
            };
        }
        case REMOVE_NOTE: {
            const removeAction = action as ReturnType<typeof removeNoteAction>;
            const updatedNotes = state.selectedNotes.filter(
                (note) => note !== removeAction.payload.note
            );
            return {
                ...state,
                selectedNotes: updatedNotes,
                rootNote: updatedNotes.length === 0 ? null : state.rootNote,
            };
        }
        case CLEAR_STATE:
            return initialState;
        case SET_SCALE_TYPE: {
            const scaleAction = action as ReturnType<typeof setScaleTypeAction>;
            return {
                ...state,
                scaleType: scaleAction.payload.scaleType,
            };
        }
        case SET_HOVERED_CHORD: {
            const chordAction = action as ReturnType<typeof setHoveredChordAction>;
            return {
                ...state,
                hoveredChord: chordAction.payload.chord,
            };
        }
        case CLEAR_HOVERED_CHORD:
            return {
                ...state,
                hoveredChord: null,
            };
        default:
            return state;
    }
};
