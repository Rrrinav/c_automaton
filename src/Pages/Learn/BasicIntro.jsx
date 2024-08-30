import React from "react";
import "./BasicIntro.css";
import Rule from "../../webGl/Rule";
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
      <h2>Rules</h2>
      <p>
        Some general cellular automatas just depend upon 3 neighbours and have
        two states either on or off (0 or 1), so by this info we can have{" "}
        <span className="bold-text">256 states </span>
        for them, of which any of those can be classified into one of these 4
        classes{" "}
        <a
          href="https://plato.stanford.edu/entries/cellular-automata/supplement.html"
          className="style-link"
          target="_blank"
        >
          (stanford notes)
        </a>
      </p>
      <p>
        Rules are made by converting a number between 1-255 to binary and making
        an array out of it E.g:
      </p>
      <p>
        To construct <span className="bold-text">rule 56</span>
        cellular automata, we convert it to bit representation i.e.{" "}
        <span className="bold-text">10011100 </span>and construct an array out
        of it which will look like rule_array = [1,0,0,1,1,1,0,0] now every
        element represents a rule, as rule_array[0] = 1, rule_array[1] = 0 and
        so on... and these indices can be written as three 0 or 1 (binary
        representation) which can be used as a state. Therefore for state 101
        i.e 5, rule_array[5] = 1. I have created a react component that takes an
        array as a prop and visualizes it, you can see me using it for 156
        below.
      </p>
      <Rule rule={[1, 0, 0, 1, 1, 1, 0, 0]} />
      <p>
        Automatas made like this are 1-D cellular-automata and called{" "}
        <span className="bold-text">Elementary Cellular-automatons</span>
      </p>
      <p>
        Then, there are some 2-D automata like{" "}
        <span className="bold-text"> Game of Life, Langton's ant, </span> some
        continuous automata like
        <span className="bold-text"> Smooth Life </span>
        too.
      </p>
    </div>
  );
};

export default BasicIntro;
