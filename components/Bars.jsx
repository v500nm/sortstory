"use client";
import { resetStates } from "../lib/core";

export default function Bars() {

  function newArray() {
    resetStates();
    const barBox = document.getElementById("bars");
    barBox.innerHTML = "";

    const count = 60;
    document.documentElement.style.setProperty("--bar-count", count);

    for (let i = 0; i < count; i++) {
      const h = Math.floor(Math.random() * 300) + 40;
      const bar = document.createElement("div");
      bar.className = "bar";
      bar.style.height = `${h}px`;
      barBox.appendChild(bar);
    }
  }

  return <section id="bars" onLoad={newArray()} className="bars-wrapper" />;
}
