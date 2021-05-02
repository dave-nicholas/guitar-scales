import React from "react";
import "./index.css";
import { Strings } from "./strings";
import { Fret } from "./fret";

const NUMBER_OF_FRETS = 24;

export const FretBoard = () => {
  const frets = [];

  for (let i = 1; i <= NUMBER_OF_FRETS; i++) {
    frets.push(<Fret number={i} />);
  }

  return (
    <div className="fretboard">
      <Strings />
      {frets}
    </div>
  );
};
