// eslint-disable-next-line
import react, { useContext } from 'react';
import ClassNames from 'classnames';
import { DataContext } from '../../../../data/provider';
import { addNoteAction, removeNoteAction } from '../../../../data/reducer';
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

export const Note = ({ fret, string }: Props) => {
    const cxt = useContext(DataContext);

    const noteIndex = (stringOffSet[string] + fret) % notes.length;

    const note = notes[noteIndex];
    const selected = cxt?.state.selectedNotes.includes(note);

    const classes = ClassNames({
        note: true,
        'note--selected': selected,
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
            {note}
        </div>
    );
};
