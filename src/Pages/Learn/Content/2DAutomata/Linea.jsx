import React from "react";
import "./Linea.css"; // Ensure this path is correct
import { Link } from "react-router-dom";
import SmoothLife from "../../../../webGl/LineaGL";

const Linea = () => {
  // The update rule for Linea (or your cellular automaton)
  const updateRule = (currentState, neighbors) => {
    const liveNeighbors = neighbors.filter((n) => n === 1).length;
    // Define the rules specific to Linea here
    if (currentState === 1) {
      return liveNeighbors === 2 || liveNeighbors === 3 ? 1 : 0;
    } else {
      return liveNeighbors === 3 ? 1 : 0;
    }
  };

  return (
    <div className="linea-body">
      <h1>Linea: A Fascinating Cellular Automaton</h1>
      <p>
        <span className="bold-text">Linea</span> is an intriguing cellular
        automaton that explores how simple rules can lead to unexpected
        behaviors. Although similar to Conway's Game of Life, Linea introduces
        unique aspects and variations in its evolution, providing rich
        possibilities for exploration.
      </p>

      <h2>How Linea Works</h2>
      <p>
        Like other cellular automata, Linea operates on a two-dimensional grid
        where each cell can either be alive (1) or dead (0). The next state of
        each cell is determined by the states of its neighbors according to a
        set of rules. These rules may vary, but generally follow the structure
        seen in other cellular automata like the Game of Life.
      </p>
      <ul>
        <li>
          <span className="bold-text">Survival:</span> A living cell with 2 or 3
          live neighbors stays alive.
        </li>
        <li>
          <span className="bold-text">Death by Isolation:</span> A living cell
          with fewer than 2 live neighbors dies.
        </li>
        <li>
          <span className="bold-text">Death by Overcrowding:</span> A living
          cell with more than 3 live neighbors dies.
        </li>
        <li>
          <span className="bold-text">Reproduction:</span> A dead cell with
          exactly 3 live neighbors becomes alive.
        </li>
      </ul>

      <h2>Emergent Patterns in Linea</h2>
      <p>
        Despite its simplicity, Linea can generate various fascinating patterns.
        These patterns often exhibit complex and chaotic behaviors that evolve
        over time, depending on the initial configuration of cells.
      </p>

      <h2>Visualizing Linea</h2>
      <p>
        Below is a live demonstration of Linea. The grid will evolve based on
        its initial random configuration, showcasing how the system follows the
        rules and produces different patterns over time.
      </p>

      <SmoothLife />

      <h2>Further Exploration</h2>
      <p>
        Linea, like many cellular automata, has applications in computational
        theory, mathematics, and even art. Its study continues to inspire new
        research in complex systems and emergent behavior.
      </p>
      <ul>
        <li>
          <a
            href="https://en.wikipedia.org/wiki/Linea"
            className="style-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Wikipedia Article on Linea
          </a>
        </li>
        <li>
          <a
            href="https://www.linea.org/"
            className="style-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Linea.org: Resources and Patterns
          </a>
        </li>
        <li>
          <a
            href="https://www.youtube.com/watch?v=exampleVideo"
            className="style-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Video: Exploring Linea and Cellular Automata
          </a>
        </li>

        <li>
          <Link
            to="../linea-patterns"
            className="style-link"
            rel="noopener noreferrer"
          >
            Explore notable patterns in Linea
          </Link>
        </li>
      </ul>
      <p>
        Whether you're interested in the mathematical properties of Linea or
        simply enjoy observing its evolving patterns, there's plenty to discover
        in this dynamic and intriguing system.
      </p>
    </div>
  );
};

export default Linea;
