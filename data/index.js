import {generateRecipeCard} from'../data/domgenerator/recipesCards.js';

async function getRecipes(){
    const response = await fetch ('../../data/recipes.json');
    const data = await response.json();
    const recipes = data.recipes;
    return recipes;
}

async function displayRecipes(recipes){
    const recipesSection = document.querySelector('.recipes_section');

    recipes.forEach((recipe) =>{
        recipesSection.appendChild(generateRecipeCard(recipe));
    })
}

async function init(){
    const recipes = await getRecipes();
    displayRecipes(recipes);
}

init();