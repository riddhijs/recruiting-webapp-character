import { useState } from "react";
import "./App.css";
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from "./consts.js";
import Attribute from "./wrapper/Attribute";
import CharacterProvider from "./context/CharacterProvider";
import AttributeControl from "./components/AttributeControls";
import CharacterClass from "./components/CharacterClass";
function App() {
  // const [num, setNum] = useState(0);
  return (
    <div className="App">
      <CharacterProvider>
        <AttributeControl />
        <CharacterClass/>
      </CharacterProvider>
    </div>
  );
}

export default App;
