import { Button, Cell, Grid, HFlow, VFlow } from "bold-ui";
import { useState } from "react";
import { recipeList } from "../constants/Recipe";
import { Recipe } from "../model/model";
import { NeededRecipes } from "./NeededRecipes";
import { RecipeList } from "./RecipeList";

export const Body = () => {
   const [selectedRecipes, setSelectedRecipes] = useState<Recipe[]>([]);
   const [ownedRecipes, setOwnedRecipes] = useState<Recipe[]>([]);
   const handleClickNeeded = (newRecipe: Recipe) => {
      const index = selectedRecipes.findIndex(
         (recipe) => recipe.id === newRecipe.id
      );
      if (index === -1) {
         setSelectedRecipes([...selectedRecipes, newRecipe]);
      } else {
         const temp = [...selectedRecipes];
         temp.splice(index, 1);
         setSelectedRecipes(temp);
      }
   };
   const handleClickOwned = (newRecipe: Recipe) => {
      setOwnedRecipes([...ownedRecipes, newRecipe]);
   };
   const handleRemoveOwned = (newRecipe: Recipe) => {
      const index = ownedRecipes.findIndex(
         (recipe) => recipe.id === newRecipe.id
      );
      const temp = [...ownedRecipes];
      temp.splice(index, 1);
      setOwnedRecipes(temp);
   };
   return (
      <>
         <Grid wrap>
            <Cell size={1}></Cell>
            <Cell size={10}>
               <VFlow>
                  <HFlow>
                     Obtained Archnemesis List (Click to reinsert){" "}
                     <Button
                        size={"small"}
                        onClick={() => {
                           setOwnedRecipes([]);
                        }}
                     >
                        Reset All Owned
                     </Button>
                     <Button
                        size={"small"}
                        onClick={() => {
                           setSelectedRecipes([]);
                        }}
                     >
                        Reset All Selected
                     </Button>
                  </HFlow>
                  <RecipeList
                     recipeList={ownedRecipes}
                     id={"RecipeList"}
                     handleClick={handleRemoveOwned}
                  />
               </VFlow>
            </Cell>
            <Cell size={8}>
               <NeededRecipes
                  ownedRecipes={ownedRecipes}
                  selectedRecipes={selectedRecipes}
                  handleClick={handleClickOwned}
               />
            </Cell>
            <Cell size={3}>
               <RecipeList
                  recipeList={recipeList}
                  id={"RecipeList"}
                  handleClick={handleClickNeeded}
               />
            </Cell>
         </Grid>
      </>
   );
};
