import React from "react";
import { useRoutes } from "react-router-dom";
import routes from "./routes";
import "./App.css";

function App() {
  const content = useRoutes(routes);

  return <div style={{ height: "100%" }}>{content}</div>;
}

export default App;
