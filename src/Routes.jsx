import React from "react";
import { createBrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import Learn from "./Pages/Learn/Learn";
import Error from "./Pages/Error/Error"; // Import the Error component
import ConwaysGameOfLife from "./Pages/Learn/Content/ConwaysGameOfLife.jsx";
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
          { path: "", element: <BasicIntro />, },
          {
            path: "conways-game-of-life",
            element: <ConwaysGameOfLife />,
          },
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
