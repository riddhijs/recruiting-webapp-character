import { useState } from "react";
import CharacterContext from "./CharacterContext";
import { ATTRIBUTE_LIST } from "../data/ATTRIBUTE_LIST";

const CharacterProvider = ({ children }) => {
  const [attributes, setAttributes] = useState(
    ATTRIBUTE_LIST.map((attribute) => ({
      name: attribute,
      value: 0,
    }))
  );

  const incrementAttribute = (attributeName) => {
    setAttributes((prevAttribute) =>
      prevAttribute.map((attribute) =>
        attribute.name === attributeName
          ? { ...attribute, value: attribute.value + 1 }
          : attribute
      )
    );
  };

  const decrementAttribute = (attributeName) => {
    setAttributes((prevAttribute) =>
      prevAttribute.map((attribute) =>
        attribute.name === attributeName
          ? { ...attribute, value: attribute.value - 1 }
          : attribute
      )
    );
  };

  return (
    <CharacterContext.Provider
      value={{
        attributes,
        incrementAttribute,
        decrementAttribute,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};


export default CharacterProvider;