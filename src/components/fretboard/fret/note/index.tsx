import react from 'react';

interface Props {
    fret: number;
    string: number;
}

export const Note = ({fret, string}:Props) => {
    return (<div className="note">{fret},{string}</div>);
}