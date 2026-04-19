import { useContext } from 'react';
import { DataContext } from '../../data/provider';
import { setHoveredChordAction, clearHoveredChordAction } from '../../data/reducer';
import './index.css';

const notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

const getScaleNotes = (rootNote: string, scaleType: 'major' | 'minor' | 'harmonicMinor' | 'dorian' | 'phrygian' | 'lydian' | 'pentatonicMinor'): string[] => {
    const rootIndex = notes.indexOf(rootNote);
    
    const scaleIntervals: Record<string, number[]> = {
        major: [0, 2, 4, 5, 7, 9, 11],
        minor: [0, 2, 3, 5, 7, 8, 10],
        harmonicMinor: [0, 2, 3, 5, 7, 8, 11],
        dorian: [0, 2, 3, 5, 7, 9, 10],
        phrygian: [0, 1, 3, 5, 7, 8, 10],
        lydian: [0, 2, 4, 6, 7, 9, 11],
        pentatonicMinor: [0, 3, 5, 7, 10],
    };
    
    const intervals = scaleIntervals[scaleType] || scaleIntervals.major;
    
    return intervals.map((interval) => notes[(rootIndex + interval) % 12]);
};

const getTriadForScaleDegree = (scaleNotes: string[], degreeIndex: number): string[] => {
    const root = scaleNotes[degreeIndex];
    const third = scaleNotes[(degreeIndex + 2) % scaleNotes.length];
    const fifth = scaleNotes[(degreeIndex + 4) % scaleNotes.length];
    return [root, third, fifth];
};

const getChordQuality = (root: string, third: string): 'major' | 'minor' | 'unknown' => {
    const rootIndex = notes.indexOf(root);
    const thirdIndex = notes.indexOf(third);
    
    const semitoneDiff = (thirdIndex - rootIndex + 12) % 12;
    
    if (semitoneDiff === 4) return 'major';
    if (semitoneDiff === 3) return 'minor';
    return 'unknown';
};

export const ScaleTable = () => {
    const cxt = useContext(DataContext);

    if (!cxt?.state.rootNote) {
        return (
            <div className="scale-table">
                <p>Select a root note to see the scale</p>
            </div>
        );
    }

    const scaleNotes = getScaleNotes(cxt.state.rootNote, cxt.state.scaleType);
    const triads = scaleNotes.map((_, index) => getTriadForScaleDegree(scaleNotes, index));
    const chordQualities = triads.map((triad) => getChordQuality(triad[0], triad[1]));

    const handleRowHover = (triad: string[]) => {
        cxt?.dispatch(setHoveredChordAction(triad));
    };

    const handleRowLeave = () => {
        cxt?.dispatch(clearHoveredChordAction());
    };

    return (
        <div className="scale-table">
            <h3>{cxt.state.rootNote} {cxt.state.scaleType.charAt(0).toUpperCase() + cxt.state.scaleType.slice(1)} Scale</h3>
            <table>
                <thead>
                    <tr>
                        <th>Scale Notes</th>
                        <th>Chord (1-3-5)</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {scaleNotes.map((note, index) => (
                        <tr 
                            key={`${note}-${index}`}
                            onMouseEnter={() => handleRowHover(triads[index])}
                            onMouseLeave={handleRowLeave}
                        >
                            <td className="scale-note">{note}</td>
                            <td className="chord-notes">
                                {triads[index].map((chordNote, idx) => (
                                    <span key={idx} className={`chord-note chord-degree-${idx + 1}`}>
                                        {chordNote}
                                    </span>
                                ))}
                            </td>
                            <td className={`chord-type chord-type--${chordQualities[index]}`}>
                                {chordQualities[index].charAt(0).toUpperCase() + chordQualities[index].slice(1)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
