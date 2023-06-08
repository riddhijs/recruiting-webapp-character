import { useContext } from "react";
import CharacterContext from "../context/CharacterContext";
import { CLASS_LIST } from "../consts";
import { Typography } from "@mui/material";

const CharacterClass = () => {
  const { attributes } = useContext(CharacterContext);

  const isClassRequirementsMet = (characterClass) => {
    const classAttributes = CLASS_LIST[characterClass];

    return attributes.every((attribute) => {
      return attribute.value >= classAttributes[attribute.name];
    });
  };
  const classKeys = Object.keys(CLASS_LIST);

  return (
    <>
      <Typography variant="h4">Character Class</Typography>
      {classKeys.length > 0 && (
        <ul>
          {classKeys.map((characterClass) => (
            <li
              key={characterClass}
              style={{
                fontWeight: isClassRequirementsMet(characterClass)
                  ? "bold"
                  : "normal",
                color: isClassRequirementsMet(characterClass)
                  ? "blue"
                  : "black",
              }}
            >
              {characterClass}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default CharacterClass;
