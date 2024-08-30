import React from "react";
import "./Class2.css";
import Rule from "../../../../webGl/Rule"; // Assuming you have or will create a Rule4 component

const Class2 = () => {
  return (
    <div className="class2Intro-body">
      <h1>Class 2 Cellular Automata: Oscillating and Periodic Patterns</h1>

      <p>
        <span className="bold-text">Class 2 Cellular Automata</span> are known
        for their ability to evolve into stable or periodic structures after a
        certain number of iterations. Unlike Class 1 automata, which settle into
        a homogeneous state, Class 2 automata display regular, repeating
        patterns. These patterns can be either static or oscillatory, meaning
        they either remain the same or repeat over time.
      </p>

      <h2>Characteristics of Class 2 Cellular Automata</h2>
      <p>
        Cellular automata in this class exhibit several key characteristics:
      </p>
      <ul>
        <li>
          <span className="bold-text">Periodic Behavior:</span> The most
          distinguishing feature of Class 2 automata is their periodic behavior,
          where patterns repeat after a certain number of generations.
        </li>
        <li>
          <span className="bold-text">Localized Structures:</span> Unlike
          chaotic Class 3 automata, the patterns in Class 2 automata are
          localized and predictable.
        </li>
        <li>
          <span className="bold-text">Stable Configurations:</span> Some initial
          conditions lead to configurations that do not change over time,
          representing stable end states.
        </li>
      </ul>

      <p>
        Class 2 automata are particularly interesting in the study of
        computational systems because they represent a middle ground between
        stability and chaos, offering insights into how simple rules can lead to
        complex, yet predictable, behaviors.
      </p>

      <h2>Rule 4: A Simple Yet Telling Example</h2>
      <p>
        <span className="bold-text">Rule 4</span> is a classic example of a
        Class 2 cellular automaton. It is known for its simple set of rules that
        nonetheless produce regular, repeating patterns. Rule 4's behavior is
        easy to predict, making it an excellent representative of Class 2
        automata.
      </p>

      <h3>Understanding Rule 4</h3>
      <p>
        Rule 4 operates on a one-dimensional binary grid, where each cell can be
        in one of two states: 0 (off) or 1 (on). The state of each cell in the
        next generation is determined by its current state and the states of its
        immediate neighbors (one to the left and one to the right). The update
        rules for Rule 4 are as follows:
      </p>
      <ul>
        <li>
          If a cell and its two neighbors are in the configuration 111, the next
          state of the cell is 0.
        </li>
        <li>
          If a cell and its two neighbors are in the configuration 110, the next
          state of the cell is 0.
        </li>
        <li>
          If a cell and its two neighbors are in the configuration 101, the next
          state of the cell is 0.
        </li>
        <li>
          If a cell and its two neighbors are in the configuration 100, the next
          state of the cell is 0.
        </li>
        <li>
          If a cell and its two neighbors are in the configuration 011, the next
          state of the cell is 0.
        </li>
        <li>
          If a cell and its two neighbors are in the configuration 010, the next
          state of the cell is 1.
        </li>
        <li>
          If a cell and its two neighbors are in the configuration 001, the next
          state of the cell is 1.
        </li>
        <li>
          If a cell and its two neighbors are in the configuration 000, the next
          state of the cell is 0.
        </li>
      </ul>
      <p>
        The simplicity of Rule 4's rules leads to predictable and stable
        patterns. These patterns either stabilize or repeat over time,
        demonstrating the periodic behavior typical of Class 2 automata.
      </p>

      <h3>Significance of Rule 4 in the Study of Cellular Automata</h3>
      <p>Rule 4 is significant for several reasons:</p>
      <ul>
        <li>
          <span className="bold-text">Predictable Behavior:</span> Rule 4
          showcases how simple rules can lead to predictable, repeating
          patterns, making it an excellent tool for studying the dynamics of
          periodic systems.
        </li>
        <li>
          <span className="bold-text">Educational Value:</span> Due to its
          simplicity and clear behavior, Rule 4 is often used in educational
          settings to teach the basic principles of cellular automata and
          periodic behavior.
        </li>
        <li>
          <span className="bold-text">Insights into Stability:</span> Rule 4
          provides insights into how stable and localized structures can emerge
          from simple initial conditions, offering a window into the balance
          between stability and complexity.
        </li>
      </ul>

      <h2>Visualizing Rule 4: A Live Demonstration</h2>
      <p>
        To fully appreciate the behavior of Rule 4, it's helpful to see it in
        action. Below is a visualization that demonstrates how Rule 4 evolves
        over time, starting from an initial configuration. Watch as the pattern
        either stabilizes or repeats in a predictable manner.
      </p>
      <Rule />
      <p>
        As you observe the evolution, note how the periodic patterns emerge.
        This is the hallmark of Class 2 behavior: regularity and predictability
        arising from simple rules.
      </p>

      <h2>Further Exploration and Resources</h2>
      <p>
        If you're interested in learning more about Class 2 Cellular Automata,
        Rule 4, and the broader field of cellular automata, the following
        resources are highly recommended:
      </p>
      <ul>
        <li>
          <a
            href="https://www.wolframscience.com/nksonline/page-20010707.htm"
            className="style-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Stephen Wolfram's A New Kind of Science: Exploration of Periodic
            Behavior in Cellular Automata
          </a>
        </li>
        <li>
          <a
            href="https://en.wikipedia.org/wiki/Elementary_cellular_automaton"
            className="style-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Wikipedia Article on Elementary Cellular Automata: Detailed Overview
            and Examples
          </a>
        </li>
        <li>
          <a
            href="https://mathworld.wolfram.com/Rule4.html"
            className="style-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Wolfram MathWorld: In-depth Analysis of Rule 4 and Its Properties
          </a>
        </li>
      </ul>
      <p>
        By exploring these resources, you can deepen your understanding of how
        cellular automata operate and the various classes of behavior they
        exhibit. Whether you're interested in the theoretical aspects or
        practical applications, there's a wealth of information available to
        expand your knowledge.
      </p>
    </div>
  );
};

export default Class2;
