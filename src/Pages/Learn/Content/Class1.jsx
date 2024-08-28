import React from "react";
import "./Class1.css";
import Rule110 from "../../../webGl/Rule110";

const Class1 = () => {
  return (
    <div className="class1Intro-body">
      <h1>Class 1 Cellular Automata: Rule 110</h1>
      <p>
        <span className="bold-text">Class 1 Cellular Automata</span> are a
        subset of cellular automata that evolve from almost any initial pattern
        into a stable, homogeneous state. These automata are characterized by
        their rapid convergence to a single, uniform state, exhibiting very
        predictable behavior.
      </p>
      <p>
        <span className="bold-text">Rule 110</span> is a well-known example of a
        one-dimensional cellular automaton that, despite its apparent
        simplicity, can exhibit complex behavior. It is classified as Class 1
        because it eventually stabilizes into a repeating pattern, though its
        behavior can be intricate in the intermediate stages.
      </p>
      <p>
        In Rule 110, each cell in the automaton updates its state based on the
        state of itself and its immediate neighbors according to a set of rules.
        Specifically, Rule 110 uses the following rule set:
      </p>
      <ul>
        <li>
          If a cell and its immediate neighbors are all in state 1, the cell
          becomes 0.
        </li>
        <li>
          If a cell and its immediate neighbors are in the configuration 010,
          the cell becomes 1.
        </li>
        <li>
          If a cell and its immediate neighbors are in the configuration 101,
          the cell becomes 1.
        </li>
        <li>
          In all other cases, the cell remains in its current state or
          transitions to state 0.
        </li>
      </ul>
      <p>
        This simple set of rules generates a complex pattern, and despite its
        tendency to stabilize, Rule 110 demonstrates how cellular automata can
        produce complex and seemingly chaotic behavior from simple initial
        conditions.
      </p>
      <p>
        Below is a demonstration of Rule 110, showcasing how the initial
        configuration evolves over time. The visualization demonstrates the
        gradual formation of stable patterns and the complexity of Rule 110's
        behavior.
      </p>
      <Rule110/>
      <p>
        For further reading on cellular automata, including Rule 110 and its
        significance in the study of complex systems, you can refer to resources
        such as:
      </p>
      <ul>
        <li>
          <a
            href="https://www.wolframscience.com/nksonline/page-20010902.htm"
            className="style-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Stephen Wolfram's A New Kind of Science
          </a>
        </li>
        <li>
          <a
            href="https://en.wikipedia.org/wiki/Rule_110"
            className="style-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Wikipedia Article on Rule 110
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Class1;
