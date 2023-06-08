import { useContext } from "react";
import CharacterContext from "../context/CharacterContext"; 

const SkillsSection = () => {
    const { attributes, skills, setSkills } = useContext(CharacterContext);
    return(<></>)

}
export default SkillsSection;