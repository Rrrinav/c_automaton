import React from "react";
import { createBrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import Learn from "./Pages/Learn/Learn";
import Error from "./Pages/Error/Error"; // Import the Error component
import Class1 from "./Pages/Learn/Content/Class1";
import Class2 from "./Pages/Learn/Content/Class2";
import Class3 from "./Pages/Learn/Content/Class3";
import Class4 from "./Pages/Learn/Content/Class4";
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
