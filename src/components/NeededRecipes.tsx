import { Recipe } from "../model/model";
import { RecipeTree } from "./RecipeTree";

export interface NeededRecipesProps {
   selectedRecipes: Recipe[];
   ownedRecipes: Recipe[];
   handleClick: (recipe: Recipe) => void;
}

export const NeededRecipes = (props: NeededRecipesProps) => {
   const { selectedRecipes, ownedRecipes, handleClick } = props;
   //   const neededRecipes = neededBaseCalculator(selectedRecipes, [
   //      ...ownedRecipes,
   //   ]);
   const neededTree = neededTreeCalculator(selectedRecipes, [...ownedRecipes]);
   return (
      <RecipeTree
         recipeList={neededTree}
         id={"NeededRecipes"}
         handleClick={handleClick}
      />
   );
};

const neededTreeCalculator = (
   selectedRecipes: Recipe[],
   ownedRecipes: Recipe[]
): Map<Recipe, Map<any, any>> => {
   var newList = new Map();
   selectedRecipes.forEach((recipe) => {
      const foundIndex = ownedRecipes.findIndex(
         (owned) => owned.id === recipe.id
      );
      if (foundIndex !== -1) {
         console.log("bugou");
         ownedRecipes.splice(foundIndex, 1);
      } else {
         if (recipe.components.length === 0) {
            newList.set(recipe, null);
         } else {
            newList.set(
               recipe,
               neededTreeCalculator(recipe.components, ownedRecipes)
            );
         }
      }
   });
   return newList;
};

const neededBaseCalculator = (
   selectedRecipes: Recipe[],
   ownedRecipes: Recipe[]
): Recipe[] => {
   var newList: Recipe[] = [];
   selectedRecipes.forEach((recipe) => {
      const foundIndex = ownedRecipes.findIndex(
         (owned) => owned.id === recipe.id
      );
      if (foundIndex !== -1) {
         ownedRecipes.splice(foundIndex, 1);
      } else {
         if (recipe.components.length === 0) {
            newList.push(recipe);
         } else {
            newList = neededBaseCalculator(
               recipe.components,
               ownedRecipes
            ).concat(newList);
         }
      }
   });
   return newList;
};
