import React from "react";
import { Link } from "react-router-dom";
import DayNightAutomatonGL from "../../../../webGl/DayNightAutomatonGL";

const DayNightAutomaton = () => {
  return (
    <div className="content-main-body">
      <h1>Day and Night Cellular Automaton: Symmetry in Evolution</h1>
      <p>
        The <span className="bold-text">Day and Night Cellular Automaton</span>
        is a unique type of two-dimensional cellular automaton discovered by
        Nathaniel Johnston in 1997. It gets its name from the behavior that
        "flipping" a configuration between "on" and "off" (black and white)
        results in the same evolutionary behavior, except with inverted colors.
        This symmetry between "day" and "night" is a key feature that sets it
        apart from other well-known automata, such as Conway's Game of Life.
      </p>

      <h2>How the Day and Night Automaton Works</h2>
      <p>
        Like Conway's Game of Life, Day and Night operates on a two-dimensional
        grid of square cells, where each cell can be in one of two states: on
        (black) or off (white). The state of each cell at the next time step is
        determined by the states of its eight neighbors (the Moore neighborhood)
        according to specific rules:
      </p>
      <ul>
        <li>
          A live cell remains alive if it has 3, 6, 7, or 8 live neighbors.
        </li>
        <li>
          A dead cell becomes alive if it has exactly 3, 4, 6, 7, or 8 live
          neighbors.
        </li>
      </ul>
      <p>
        This set of rules is symmetrical for both live and dead cells, which is
        why the automaton exhibits similar behavior whether we invert the
        states.
      </p>

      <h2>Behavior and Patterns</h2>
      <p>
        The Day and Night cellular automaton is known for producing a variety of
        interesting patterns. These range from chaotic behavior to more
        structured, repetitive configurations. Some of the more common pattern
        types include:
      </p>
      <ul>
        <li>
          <span className="bold-text">Oscillators:</span> These are patterns
          that repeat themselves after a certain number of steps. The symmetry
          between "day" and "night" means that an oscillator looks the same
          regardless of whether it's made of live or dead cells.
        </li>
        <li>
          <span className="bold-text">Spaceships:</span> Moving patterns that
          travel across the grid while maintaining their shape. Due to the
          reversible nature of the rules, spaceships can move in different
          directions without being restricted to one orientation.
        </li>
        <li>
          <span className="bold-text">Breeders:</span> These are complex
          patterns that create copies of themselves over time, much like a
          growing population.
        </li>
      </ul>
      <p>
        The diversity of patterns makes Day and Night automaton fascinating to
        study, particularly in its ability to generate both chaotic and ordered
        behavior.
      </p>

      <h2>Visualizing the Day and Night Automaton</h2>
      <p>
        Below is a live visualization of the Day and Night cellular automaton.
        The grid starts with a random configuration of black and white cells.
        Observe how the grid evolves over time, with oscillators, spaceships,
        and other patterns emerging from the initial chaos.
      </p>
      <p>
        The symmetry in the rules ensures that the automaton behaves similarly
        if the colors are inverted, providing an interesting perspective on how
        simple rules can lead to such a wide range of dynamic behavior.
      </p>

      <DayNightAutomatonGL />

      <h2>Applications of the Day and Night Automaton</h2>
      <p>
        While the Day and Night automaton may seem like a simple computational
        experiment, it offers valuable insights into complex systems and
        emergent behavior. Cellular automata like this are used in a variety of
        real-world applications, such as:
      </p>
      <ul>
        <li>
          <span className="bold-text">Modeling biological systems:</span>{" "}
          Cellular automata can simulate the growth patterns of organisms, the
          spread of diseases, or even the movement of populations.
        </li>
        <li>
          <span className="bold-text">Traffic flow simulations:</span> The
          simple rules of cellular automata can be applied to model the behavior
          of traffic, providing insights into how congestion develops and
          disperses.
        </li>
        <li>
          <span className="bold-text">Cryptography:</span> Certain types of
          cellular automata have been explored for their potential to generate
          secure cryptographic systems due to their complex and unpredictable
          behavior.
        </li>
      </ul>

      <h2>Further Reading and Exploration</h2>
      <p>
        For those interested in diving deeper into the world of cellular
        automata and the Day and Night automaton, there are plenty of resources
        and materials available. Some useful links include:
      </p>
      <ul>
        <li>
          <a
            href="https://en.wikipedia.org/wiki/Day_and_Night_(cellular_automaton)"
            className="style-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Wikipedia: Day and Night Cellular Automaton
          </a>
        </li>
        <li>
          <a
            href="https://conwaylife.com/wiki/Day_and_Night"
            className="style-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            LifeWiki: Day and Night Automaton Patterns
          </a>
        </li>
        <li>
          <Link
            to="../cellular-automata-exploration"
            className="style-link"
            rel="noopener noreferrer"
          >
            Explore other Cellular Automata
          </Link>
        </li>
      </ul>

      <h2>Conclusion: Symmetry in Complexity</h2>
      <p>
        The Day and Night automaton showcases how even simple systems can give
        rise to complex and beautiful behavior. Its symmetrical ruleset provides
        a unique perspective on emergent phenomena, highlighting the deep
        connections between computation, mathematics, and nature. Whether you're
        a researcher, student, or just a curious mind, the Day and Night
        automaton offers plenty to explore and enjoy.
      </p>
    </div>
  );
};

export default DayNightAutomaton;
