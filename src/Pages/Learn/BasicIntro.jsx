import React from "react";
import "./BasicIntro.css";
import Glider from "../../webGl/Glider";

const BasicIntro = () => {
  return (
    <div className="basicIntro-body">
      <h1>Cellular Autmata</h1>
      <p>
        <span className="bold-text">Cellular automatons</span> can be described
        as discrete and abstract computational units that work on simple rules.
        Main goal of Cellular automatons is to show that complicated and
        perplexing behaviors can emerge from simple rules. One such simple and
        very famous example of it is{" "}
        <span className="bold-text">Conway's Game of Life </span>(shown below is
        a special case of Conway's Game of Life k/a 'Glider').
      </p>
      <Glider width={15} height={10} bgColor={[0.008, 0.243, 0.49]} />
      <p>
        In this section we will learn about history, mathematics and many such
        aspects of cellular automaton. We will start straight away with types
        and learn their history, special cases and visualizations along with.
        These visualizations will mostly be done on{" "}
        <span className="bold-text">GPU using WebGL</span>, so if you can't see
        canvas visual, it probably means that your browser doesn't support it.
        So. let's get started
      </p>
      <p>
        Any cellular automaton model works on discrete structures (although
        continuous ones have been described now but traditionally they were
        discrete) called <span className="bold-text">grids </span>and every cell
        in a grid is, well a 'cell'.{" "}
        <span className="bold-text"> Every cell can have some state </span>which
        are defined based upon some set of rules, which dictates how it will
        look.
      </p>
      These rules can result in various types of results, based on these
      results, cellular automatons are divided into 4 categories by{" "}
      <a
        href="https://www.scirp.org/reference/referencespapers?referenceid=1340111"
        className="style-link"
        target="_blank"
      >
        Stephen Wolfram
      </a>{" "}
      :-
      <p></p>
      <ul>
        <li>
          Class 1: Nearly all initial patterns evolve quickly into a stable,
          homogeneous state.
        </li>
        <li>
          Class 2: Nearly all initial patterns evolve quickly into stable or
          oscillating structures. Some of the randomness in the initial pattern
          may filter out, but some remains.
        </li>
        <li>
          Class 3: Nearly all initial patterns evolve in a pseudo-random or
          chaotic manner. Any stable structures that appear are quickly
          destroyed by the surrounding noise.
        </li>
        <li>
          Class 4: Nearly all initial patterns evolve into structures that
          interact in complex and interesting ways, with the formation of local
          structures that are able to survive for long periods of time.
        </li>
      </ul>
    </div>
  );
};

export default BasicIntro;
