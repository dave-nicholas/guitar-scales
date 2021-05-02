// eslint-disable-next-line: no-unused-vars
import React from 'react';
import ClassNames from 'classnames';
import './index.css';
import { Note } from './note';

const NUMBER_OF_STRINGS = 6;

interface Props {
    number: number;
}

const singleDotFrets = [3,5,7,15,17,19,21];
const doubleDotFrets = [0,12];

export const Fret = ({ number }: Props) => {
    
    const notes = [];

    const isSingleDot = singleDotFrets.includes(number);
    const isDoubleDot = doubleDotFrets.includes(number);
    
    const classes =  ClassNames({
      "fret":true,
      "fret--normal": !isSingleDot && !isDoubleDot,
      "fret--single-dot": isSingleDot,
      "fret--double-dot": isDoubleDot,
    });

    for (let i = 0; i < NUMBER_OF_STRINGS; i++) {
        notes.push(<Note key={`${i}-${number}`} fret={number} string={i} />);
    }
    return <div className={classes}>{notes}</div>;
};
