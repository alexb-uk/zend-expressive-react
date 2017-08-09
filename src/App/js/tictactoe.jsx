import React from "react";
import ReactDOM from "react-dom";

import Game from "./components/game.jsx";

$( document ).ready(function() {
    ReactDOM.render(
      <Game />,
      document.getElementById("root")
    );
});
