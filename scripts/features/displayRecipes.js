import { generateRecipeCard } from "../../scripts/domgenerator/recipesCards.js";

function displayRecipes(recipes) {
    const recipesSection = document.querySelector('.recipes_section');

    recipes.forEach((recipe) => {
        const recipeModel = generateRecipeCard(recipe);
        const recipeDOM = recipeModel.recipeCard();
        recipesSection.appendChild(recipeDOM);
    });
}

export { displayRecipes };