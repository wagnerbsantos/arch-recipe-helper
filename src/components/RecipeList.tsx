import { Grid, HFlow, VFlow } from "bold-ui";
import { Recipe } from "../model/model";
import { RecipeBox } from "./RecipeBox";

export interface RecipeListProps {
   id: string;
   recipeList: Recipe[];
   handleClick: (recipe: Recipe) => void;
}

export const RecipeList = (props: RecipeListProps) => {
   const { id, recipeList, handleClick } = props;
   const list: JSX.Element[] = [];
   recipeList.forEach((recipe, index) =>
      list.push(
         <RecipeBox
            key={id + "-" + index}
            recipe={recipe}
            handleClick={handleClick}
         />
      )
   );

   return <Grid wrap>{list}</Grid>;
};
