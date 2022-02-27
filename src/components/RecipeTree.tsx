import { Cell, Grid, VFlow } from "bold-ui";
import { Recipe } from "../model/model";
import { RecipeBox } from "./RecipeBox";

export interface RecipeListProps {
   id: string;
   recipeList: Map<Recipe, any>;
   handleClick: (recipe: Recipe) => void;
}

export const RecipeTree = (props: RecipeListProps) => {
   const { id, recipeList, handleClick } = props;
   const list: JSX.Element[] = [];

   const count = 1;
   const treeMaking = (
      recipeList: Map<Recipe, any>,
      count: number
   ): JSX.Element[] => {
      var componentList = new Map();
      const list: JSX.Element[] = [];
      recipeList.forEach((components, recipe) => {
         if (components && components.size > 0) {
            componentList = new Map([...componentList, ...components]);
         }
         list.push(
            <RecipeBox
               recipe={recipe}
               handleClick={handleClick}
               key={id + count + recipe.id}
            />
         );
      });
      return componentList.size > 0
         ? [
              ...treeMaking(componentList, count + 1),
              <Cell size={2} key={id + count}>
                 <Grid wrap>{list}</Grid>
              </Cell>,
           ]
         : [
              <Cell size={2} key={id + count}>
                 <Grid wrap>{list}</Grid>
              </Cell>,
           ];
   };

   recipeList.forEach((components, recipe) => {
      var local = [];
      local.push(
         <Cell size={2} key={recipe.id + "-" + count}>
            <RecipeBox recipe={recipe} handleClick={handleClick} />
         </Cell>
      );
      if (components && components.size > 0) {
         local = [treeMaking(components, count + 1), ...local];
      }
      list.push(
         <Cell key={id + count + recipe.id}>
            <Grid wrap>{local}</Grid>
         </Cell>
      );
   });

   /*
  recipeList.forEach((components, recipe) =>
    list.push(
      <Grid>
        <Cell size={3}>{recipe.name}</Cell>
        {treeMaking(components)}
      </Grid>
    )
  )
*/
   return <VFlow>{list}</VFlow>;
};

export const createStyles = () => ({
   cell: {
      padding: "2px",
   },
});
