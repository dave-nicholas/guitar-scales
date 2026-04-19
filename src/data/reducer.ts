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

const notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

const scaleIntervals: Record<ScaleType, number[]> = {
    major: [0, 2, 4, 5, 7, 9, 11],
    minor: [0, 2, 3, 5, 7, 8, 10],
    harmonicMinor: [0, 2, 3, 5, 7, 8, 11],
    dorian: [0, 2, 3, 5, 7, 9, 10],
    phrygian: [0, 1, 3, 5, 7, 8, 10],
    lydian: [0, 2, 4, 6, 7, 9, 11],
    pentatonicMinor: [0, 3, 5, 7, 10],
};

const getScaleNotes = (rootNote: string, scaleType: ScaleType): string[] => {
    const rootIndex = notes.indexOf(rootNote);
    if (rootIndex === -1) return [];
    
    const intervals = scaleIntervals[scaleType];
    return intervals.map(interval => notes[(rootIndex + interval) % notes.length]);
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
            const newNote = addAction.payload.note;
            const isFirstNote = state.rootNote === null;
            
            if (isFirstNote) {
                // When selecting the first note (root), select all notes in the current scale
                const scaleNotes = getScaleNotes(newNote, state.scaleType);
                return {
                    ...state,
                    selectedNotes: scaleNotes,
                    rootNote: newNote,
                };
            } else {
                // Otherwise, just add the note if not already selected
                if (state.selectedNotes.includes(newNote)) {
                    return state;
                }
                const newSelectedNotes = [...state.selectedNotes, newNote];
                return {
                    ...state,
                    selectedNotes: newSelectedNotes,
                };
            }
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
            const newScaleType = scaleAction.payload.scaleType;
            
            // If a root note exists, update selected notes to match the new scale
            if (state.rootNote) {
                const scaleNotes = getScaleNotes(state.rootNote, newScaleType);
                return {
                    ...state,
                    scaleType: newScaleType,
                    selectedNotes: scaleNotes,
                };
            }
            
            return {
                ...state,
                scaleType: newScaleType,
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
