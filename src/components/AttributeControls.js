import { useContext } from "react";
import CharacterContext from "../context/CharacterContext";
import Attribute from "../wrapper/Attribute";
import { Grid, Typography, Box, Button } from "@mui/material";

const AttributeControl = () => {
  const { attributes, incrementAttribute, decrementAttribute } =
    useContext(CharacterContext);

  return (
    <>
      <Grid container spacing={2}>
        {attributes.map((attribute) => {
          const abilityModifier = Math.floor((attribute.value - 10) / 2);
          return (
            <Grid item xs={12} sm={6} md={4} key={attribute.name}>
              <Box
                border={1}
                padding={2}
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h6">{attribute.name}</Typography>
                <Button
                  color="primary"
                  onClick={() => decrementAttribute(attribute.name)}
                  size="small"
                  sx={{ marginRight: 1 }}
                >
                  -
                </Button>
                <Typography>{attribute.value}</Typography>
                <Button
                  color="primary"
                  onClick={() => incrementAttribute(attribute.name)}
                  size="small"
                  sx={{ marginRight: 1 }}
                >
                  +
                </Button>
                <Typography>Ability Modifier: {abilityModifier}</Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default AttributeControl;
