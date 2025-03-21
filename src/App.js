import React, { useState } from "react";
import "./App.css";
import { LeftMenu } from "./components/LeftMenu";
import { RightMenu } from "./components/RightMenu";
import { MainContainer } from "./components/MainContainer";
import "./Style/LeftMenu.css";
import "./Style/RightMenu.css";
import "./Style/MainContainer.css";
import "./index.css";

function App() {
  const [menuColor, setMenuColor] = useState("rgba(67, 73, 187, 0.6)");

  return (
    <div className="App">
      <LeftMenu menuColor={menuColor} />
      <MainContainer />
      <RightMenu menuColor={menuColor} setMenuColor={setMenuColor} />
      <div className="background"></div>
    </div>
  );
}

export { App };
