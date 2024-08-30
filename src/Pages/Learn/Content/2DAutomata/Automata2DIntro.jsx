import React, { useState } from "react";
import Automata2DInitial from "../../../../webGl/Automata2DInitial";
import patterns from "../../../../Data/golPatterns";
// const patterns = {
//   glider: {
//     pattern: [
//       [0, 1, 0],
//       [0, 0, 1],
//       [1, 1, 1],
//     ],
//     startPos: { x: 1, y: 1 },
//     factor: 1,
//   },
//   block: {
//     pattern: [
//       [1, 1],
//       [1, 1],
//     ],
//     startPos: { x: 19, y: 4 },
//     factor: 1,
//   },
//   blinker: {
//     pattern: [
//       [0, 1, 0],
//       [0, 1, 0],
//       [0, 1, 0],
//     ],
//     startPos: { x: 19, y: 4 },
//     factor: 1,
//   },
//   toad: {
//     pattern: [
//       [0, 1, 1, 1],
//       [1, 1, 1, 0],
//     ],
//     startPos: { x: 19, y: 4 },
//     factor: 1,
//   },
// };
//
const Automata2DIntro = () => {
  const [selectedPattern, setSelectedPattern] = useState("glider");

  const updateRule = (currentState, neighbors) => {
    const liveNeighbors = neighbors.filter((n) => n === 1).length;
    if (currentState === 1) {
      return liveNeighbors === 2 || liveNeighbors === 3 ? 1 : 0;
    } else {
      return liveNeighbors === 3 ? 1 : 0;
    }
  };

  const createInitialState = (pattern, width, height, startPos) => {
    console.log("width: ", width, "height: ", height);
    const state = new Array(width * height).fill(0);
    const startX = startPos.x;
    const startY = startPos.y;

    pattern.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (startY + y >= height || startX + x >= width) {
          return;
        }
        const index = (startY + y) * width + (startX + x);
        state[index] = cell;
      });
    });

    return state;
  };

  const { pattern, startPos, factor } = patterns[selectedPattern];
  console.log("factor: ", factor);
  const width = 40 * factor;
  const height = 10 * factor;
  const initialState = createInitialState(pattern, width, height, startPos);

  return (
    <div>
      <div>
        <label htmlFor="pattern-select">Select Pattern:</label>
        <select
          id="pattern-select"
          value={selectedPattern}
          onChange={(e) => setSelectedPattern(e.target.value)}
        >
          {Object.keys(patterns).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>
      <Automata2DInitial
        updateRule={updateRule}
        initialState={initialState}
        width={width}
        height={height}
        updateInterval={100}
      />
    </div>
  );
};

export default Automata2DIntro;
