import React from "react";
import "./index.css";
import { Note } from "./note";

const NUMBER_OF_STRINGS = 6;

interface Props {
  number: number;
}

export const Fret = ({ number }: Props) => {
  const notes = [];
  for (let i = 1; i <= NUMBER_OF_STRINGS; i++) {
    notes.push(<Note fret={number} string={i} />);
  }
  return <div className="fret">{notes}</div>;
};
