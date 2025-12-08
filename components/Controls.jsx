"use client";
import { pause, resume, stop, resetStates } from "../lib/core";

export default function Controls() {
  return (
    <header className="control-header">
      <h1>SortViz</h1>

      <div className="control-group">
        <button onClick={resetStates}>New Array</button>
        <button onClick={pause}>Pause</button>
        <button onClick={resume}>Resume</button>
        <button onClick={stop} className="danger">Stop</button>
      </div>
    </header>
  );
}
