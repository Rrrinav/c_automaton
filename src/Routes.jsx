import React from "react";
import { createBrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import Learn from "./Pages/Learn/Learn";
import Error from "./Pages/Error/Error"; // Import the Error component
import Class1 from "./Pages/Learn/Content/ElementaryAutomata/Class1";
import Class2 from "./Pages/Learn/Content/ElementaryAutomata/Class2";
import Class3 from "./Pages/Learn/Content/ElementaryAutomata/Class3";
import Class4 from "./Pages/Learn/Content/ElementaryAutomata/Class4";
import GameOfLife from "./Pages/Learn/Content/2DAutomata/GameOfLife.jsx";
import Automata2DIntro from "./Pages/Learn/Content/2DAutomata/Automata2DIntro.jsx";
import GOLTypes from "./Pages/Learn/Content/2DAutomata/GOLTypes.jsx";
import BasicIntro from "./Pages/Learn/BasicIntro.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "learn",
        element: <Learn />,
        children: [
          { path: "", element: <BasicIntro /> },
          {
            path: "class-1",
            element: <Class1 />,
          },
          {
            path: "class-2",
            element: <Class2 />,
          },
          {
            path: "class-3",
            element: <Class3 />,
          },
          {
            path: "class-4",
            element: <Class4 />,
          },
          {
            path: "2d-automata",
            element: <Automata2DIntro />,
          },
          {
            path: "game-of-life",
            element: <GameOfLife />,
          },
          {
            path: "game-of-life-patterns",
            element: <GOLTypes />,
          }
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Error />, // This handles any undefined routes
  },
]);

export default router;
