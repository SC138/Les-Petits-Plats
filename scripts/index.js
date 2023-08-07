import { generateRecipeCard } from './domgenerator/recipesCards.js';
import { displayRecipes } from'./features/displayRecipes.js'

async function getRecipes(){
    const response = await fetch ('../../data/recipes.json'); 
    const data = await response.json();
    var recipes = data.recipes;
    return recipes;
}

function init() {
    getRecipes()
    .then((recipes) => {
        generateRecipeCard(recipes);
        displayRecipes(recipes);
    });
}

init();

