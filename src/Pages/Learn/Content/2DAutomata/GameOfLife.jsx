import React from "react";
import "./GameOfLife.css";
import Automata2D from "../../../../webGl/Automata2D"; // Ensure this path is correct

const GameOfLife = () => {
  // The update rule for Conway's Game of Life
  const updateRule = (currentState, neighbors) => {
    const liveNeighbors = neighbors.filter((n) => n === 1).length;
    if (currentState === 1) {
      return liveNeighbors === 2 || liveNeighbors === 3 ? 1 : 0;
    } else {
      return liveNeighbors === 3 ? 1 : 0;
    }
  };

  return (
    <div className="gameOfLife-body">
      <h1>Conway's Game of Life: A Classic Cellular Automaton</h1>
      <p>
        <span className="bold-text">Conway's Game of Life</span> is a
        fascinating cellular automaton devised by the British mathematician John
        Horton Conway in 1970. It is a zero-player game, meaning that its
        evolution is determined by its initial state, requiring no further input
        from human players. The Game of Life is a classic example of how simple
        rules can lead to complex, emergent behavior.
      </p>

      <h2>How the Game of Life Works</h2>
      <p>
        The Game of Life takes place on a two-dimensional grid where each cell
        can be in one of two states: alive (1) or dead (0). The state of each
        cell in the next generation is determined by the states of its eight
        neighbors according to the following rules:
      </p>
      <ul>
        <li>
          <span className="bold-text">Survival:</span> A living cell with 2 or 3
          live neighbors stays alive in the next generation.
        </li>
        <li>
          <span className="bold-text">Death by Isolation:</span> A living cell
          with fewer than 2 live neighbors dies (as if by underpopulation).
        </li>
        <li>
          <span className="bold-text">Death by Overcrowding:</span> A living
          cell with more than 3 live neighbors dies (as if by overpopulation).
        </li>
        <li>
          <span className="bold-text">Reproduction:</span> A dead cell with
          exactly 3 live neighbors becomes a living cell.
        </li>
      </ul>

      <h2>Emergent Patterns and Infinite Possibilities</h2>
      <p>
        Despite the simplicity of these rules, the Game of Life can produce an
        astonishing variety of patterns, ranging from simple, stable structures
        to complex, oscillating or moving configurations known as "gliders" and
        "spaceships". Some initial states lead to patterns that grow
        indefinitely, while others quickly stabilize or oscillate between a few
        configurations.
      </p>

      <h2>Visualizing the Game of Life</h2>
      <p>
        Below is a live demonstration of Conway's Game of Life. The grid is
        initially populated with random cells, and you can observe how the
        patterns evolve over time according to the rules described above.
      </p>

      <Automata2D
        updateRule={updateRule}
        cellSize={8}
        updateInterval={200} 
      />

      <h2>Further Exploration</h2>
      <p>
        The Game of Life has been widely studied for its applications in various
        fields, including computer science, mathematics, and philosophy. It
        serves as a simple yet profound model of computation and has inspired
        numerous variations and related automata.
      </p>
      <ul>
        <li>
          <a
            href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
            className="style-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Wikipedia Article on Conway's Game of Life
          </a>
        </li>
        <li>
          <a
            href="https://www.conwaylife.com/"
            className="style-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            ConwayLife.com: Extensive Resources and Patterns
          </a>
        </li>
        <li>
          <a
            href="https://www.youtube.com/watch?v=R9Plq-D1gEk"
            className="style-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Video: The Game of Life and Cellular Automata
          </a>
        </li>
      </ul>
      <p>
        Whether you're exploring the mathematical beauty of the Game of Life or
        simply enjoying its visual patterns, there's much to discover and
        appreciate in this classic cellular automaton.
      </p>
    </div>
  );
};

export default GameOfLife;
