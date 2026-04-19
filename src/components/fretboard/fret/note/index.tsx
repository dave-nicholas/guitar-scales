import { useContext } from 'react';
import ClassNames from 'classnames';
import { DataContext } from '../../../../data/provider';
import { addNoteAction, removeNoteAction, ScaleType } from '../../../../data/reducer';
import './index.css';

interface Props {
    fret: number;
    string: number;
}

const notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

const stringOffSet = [
    7, //E
    2, //B
    10, //G
    5, //D
    0, //A
    7, //E
];

const getScaleDegree = (noteIndex: number, rootIndex: number, scaleType: ScaleType): number => {
    const majorIntervals = [0, 2, 4, 5, 7, 9, 11];
    const minorIntervals = [0, 2, 3, 5, 7, 8, 10];
    const intervals = scaleType === 'major' ? majorIntervals : minorIntervals;
    const semitoneDiff = (noteIndex - rootIndex + 12) % 12;
    const degreeIndex = intervals.indexOf(semitoneDiff);
    return degreeIndex !== -1 ? degreeIndex + 1 : -1;
};

export const Note = ({ fret, string }: Props) => {
    const cxt = useContext(DataContext);

    const noteIndex = (stringOffSet[string] + fret) % notes.length;

    const note = notes[noteIndex];
    const selected = cxt?.state.selectedNotes.includes(note);
    const rootNote = cxt?.state.rootNote || null;
    const scaleType = cxt?.state.scaleType || 'major';
    const hoveredChord = cxt?.state.hoveredChord || [];
    const isRoot = selected && rootNote === note;
    const isHoveredChordNote = hoveredChord.includes(note);
    
    let scaleDegree = -1;
    if (selected && rootNote) {
        const rootIndex = notes.indexOf(rootNote);
        scaleDegree = getScaleDegree(noteIndex, rootIndex, scaleType);
    }

    const classes = ClassNames({
        note: true,
        'note--selected': selected,
        'note--root': isRoot,
        'note--hovered': isHoveredChordNote,
    });

    const actionToDispatch = () => {
        if (selected) {
            cxt?.dispatch(removeNoteAction(note));
        } else {
            cxt?.dispatch(addNoteAction(note));
        }
    };

    return (
        <div className={classes} onClick={() => actionToDispatch()}>
            <span className="note__name">{note}</span>
            {scaleDegree > 0 && <span className="note__degree">{scaleDegree}</span>}
        </div>
    );
};
