
// Implement skills. See `SKILL_LIST` for the list of all skills and their attribute modifier 
//   - Characters have 10 + (4 * Intelligence Modifier) points to spend between skills.
//     - There is a minimum of 0, but no maximum aside from the total points available to spend.
//     - for example, if a character has a 1 Intelligence Modifier, they may spend 14 points, and could add 7 to both Acrobatics and Perception (then would have no more to spend on others)
//   - The total value of a skill is the sum of points spent and the skill’s corresponding ability modifier (see `SKILL_LIST` for what ability modifier affects each skill). 
//     - For example. a character with a 2 Dexterity Modifier and spending 3 points on Acrobatics would have a total skill value of 5
//   - Display each skill in a row in a separate section. For example, Acrobatics 
//     - for a character with 12 dexterity may look like `Acrobatics - points: 3 [+] [-] modifier (Dex): 2 total: 5`

import { useState, useEffect } from "react";
import CharacterContext from "./CharacterContext";
import { ATTRIBUTE_LIST } from "../data/ATTRIBUTE_LIST";
import { SKILL_LIST } from "../data/SKILL_LIST";

const CharacterProvider = ({ children }) => {
  const [attributes, setAttributes] = useState(
    ATTRIBUTE_LIST.map((attribute) => ({
      name: attribute,
      value: 0,
    }))
  );
 

  const [skills, setSkills] = useState(
    SKILL_LIST.map((skill) => ({
      name: skill.name,
      attributeModifier: skill.attributeModifier,
      points: 0,
    }))
  );

  const calculateTotalPointsAvailable = () => {
    const intelligenceAttribute = attributes.find((attribute) => attribute.name === 'Intelligence');
    const intelligenceModifier = Math.floor((intelligenceAttribute.value - 10) / 2);
    return 10 + 4 * intelligenceModifier;
  };

  const [totalPointsAvailable, setTotalPointsAvailable] = useState(calculateTotalPointsAvailable());

  useEffect(() => {
    setTotalPointsAvailable(calculateTotalPointsAvailable());
  }, [attributes]);

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
        skills,
        setSkills,
        totalPointsAvailable
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};


export default CharacterProvider;