import { useContext, useEffect, useState } from "react";
import CharacterContext from "../context/CharacterContext";
import { SKILL_LIST } from "../data/SKILL_LIST";
import { Typography, Box, Button } from "@mui/material";

const SkillsSection = () => {
    const { attributes, totalPointsAvailable, skills, setSkills } = useContext(CharacterContext);
    const [totalAvailablePoints, setTotalAvailablePoints] = useState(totalPointsAvailable);

    useEffect(() => {
        setTotalAvailablePoints(totalPointsAvailable - skills.reduce((total, skill) => total + skill.points, 0));
      }, [totalPointsAvailable]);
    
      const calculateAbilityModifier = (abilityName) => {
        const attribute = attributes.find((attribute) => attribute.name === abilityName);
        return attribute ? Math.floor((attribute.value - 10) / 2) : 0;
      };
    
   
      const calculateTotalSkillPoint = (skill) => {
        const abilityModifier = calculateAbilityModifier(skill.attributeModifier);
        return skill.points + abilityModifier;
      };

      const incrementSkillPoints = (skillName) => {
    
        const updatedSkills = skills.map((skill) => {
    
          if (skill.name === skillName && totalAvailablePoints > 0) {
            const attribute = attributes.find((attribute) => attribute.name === skill.attributeModifier);
            const abilityModifier = Math.floor((attribute.value - 10) / 2);
            if(attribute.value > 0){
            const updatedPoints = skill.points + 1;
            setTotalAvailablePoints((prev) => prev - 1);
            return { ...skill, points: updatedPoints };}
          }
          return skill;
        });
    
        setSkills(updatedSkills);
      };

      const decrementSkillPoints = (skillName) => {
        const updatedSkills = skills.map((skill) => {
          if (skill.name === skillName && skill.points > 0) {
            const attribute = attributes.find((attribute) => attribute.name === skill.attributeModifier);
            const abilityModifier = Math.floor((attribute.value - 10) / 2);
            const updatedPoints = skill.points - 1;
    
            setTotalAvailablePoints((prev) => prev + 1);
            return { ...skill, points: updatedPoints };
          }
          return skill;
        });
    
        setSkills(updatedSkills);
      };

      return (
        <Box mt={4}>
          <Typography variant="h4">Skills</Typography>
          {skills.map((skill) => (
            <Box
              key={skill.name}
              border={1}
              borderRadius={4}
              borderColor="primary.main"
              padding={2}
              marginBottom={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              bgcolor="background.default"
            >
                <Typography variant="h6">{skill.name}</Typography>
                <Typography sx={{ paddingRight: "30px" }} variant="h6">
              
            </Typography>
            <Typography variant="body2" sx={{ marginLeft: 1 }}>
              {/* Modifier ({skill.attributeModifier}): {skill.abilityModifier}{" "}
              Total: {skill.totalSkillPoint} */}
              Modifier ({skill.attributeModifier}): {calculateAbilityModifier(skill.ability)} Total: {calculateTotalSkillPoint(skill)}

            </Typography>
            <Box display="flex" alignItems="center">
              <Button
                variant="contained"
                color="primary"
                onClick={() => decrementSkillPoints(skill.name)}
                size="small"
                sx={{ marginRight: 1, marginLeft: 5 }}
              >
                -
              </Button>
              <Typography>{skill.points}</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => incrementSkillPoints(skill.name)}
                size="small"
                sx={{ marginLeft: 1 }}
              >
                +
              </Button>
            </Box>
          </Box>          ))}

          </Box>
      )
}

export default SkillsSection