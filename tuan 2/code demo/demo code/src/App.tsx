import React from "react";
import Hello from "./components/Hello";

function App() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Demo React TypeScript</h1>
      <Hello name="Hoàn" age={21} />
      <Hello name="React TypeScript" />
    </div>
  );
}

export default App;
