import { useContext, useState } from "react";
import CharacterContext from "../context/CharacterContext";
import { CLASS_LIST } from "../consts";
import { Box, Typography } from "@mui/material";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";

const CharacterClass = () => {
  const { attributes } = useContext(CharacterContext);
  const [selectedClass, setSelectedClass] = useState(null);
  const handleClassClick = (characterClass) => {
    setSelectedClass(characterClass);
  };

  const handleCloseModal = () => {
    setSelectedClass(null);
  };
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
              onClick={() => handleClassClick(characterClass)}

            >
              {characterClass}
            </li>
          ))}
        </ul>
      )}

<Dialog open={selectedClass !== null} onClose={handleCloseModal}>
  {selectedClass && (
    <>
      <DialogTitle>{selectedClass}</DialogTitle>
      <DialogContent>
        <Typography>Minimum Required Statistics:</Typography>
        <ul>
          {Object.entries(CLASS_LIST[selectedClass]).map(([key, value]) => (
            <li key={key}>
              {key}: {value}
            </li>
          ))}
        </ul>
      </DialogContent>
    </>
  )}
</Dialog>
    </>
  );
};

export default CharacterClass;
