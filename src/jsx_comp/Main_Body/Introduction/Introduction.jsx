import React from "react";
import "./Introduction.css";
import Tag from "../Tag/Tag";

const Introduction = () => {
  const intro =
    'Cellular automata are fascinating computational models that simulate complex systems through the interaction of simple, discrete units called cells. These cells exist on a grid, where each cell can be in one of a finite number of states—often simply "on" or "off," though more complex states are possible. The grid can be one-dimensional, two-dimensional, or even higher-dimensional, but the most commonly studied cellular automata are two-dimensional. Each cell\'s state is determined by a set of rules that consider the states of neighboring cells. Despite the simplicity of these rules, cellular automata can exhibit incredibly rich and diverse behaviors, ranging from highly predictable and repetitive patterns to chaotic, seemingly random evolutions. This emergent complexity from simple rules has made cellular automata a powerful tool for studying a wide range of phenomena, from biological processes like the growth of patterns on animal skins to theoretical concepts in mathematics and computer science, such as Turing completeness. One of the most famous examples of cellular automata is Conway\'s Game of Life, a zero-player game that illustrates how simple rules can lead to the spontaneous formation of intricate, self-sustaining structures. Beyond their academic applications, cellular automata have also influenced fields such as art and design, inspiring intricate visual patterns and generative artworks. As both a mathematical curiosity and a model for real-world systems, cellular automata offer a unique lens through which to explore the fundamental principles of computation, complexity, and emergence.';

  return (
    <div className="introduction">
      <Tag
        heading={"Cellular Automaton"}
        tagline={"Complicated systems from simple rules"}
      />
      {/* <div className="intro"> */}
      {/*   <p className="intro-text">{intro}</p> */}
      {/* </div> */}
    </div>
  );
};

export default Introduction;
