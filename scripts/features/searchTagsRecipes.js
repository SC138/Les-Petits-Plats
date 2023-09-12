import { DisplayTags } from "../utils/displayTags.js";
import { displayRecipes, searchRecipes } from "./displayRecipes.js";
import { FiltersTags } from "../utils/filters.js";
import { arrayrecipes } from "../features/displayRecipes.js";

function searchTags(recipes) {
    const containerIngredient = document.querySelector('.filter_ingredients_container');
    const containerAppliances = document.querySelector('.filter_appareils_container');
    const containerUstensils = document.querySelector('.filter_ustencils_container');

    const inputIngredients = document.querySelector('.ingredients');
    const inputAppliances = document.querySelector('.appareils');
    const inputUstensils = document.querySelector('.ustencils');

    const listIngredients = new FiltersTags(recipes).filteredIngredients();
    const listAppliance = new FiltersTags(recipes).filteredAppliances();
    const listUstensils = new FiltersTags(recipes).filteredUstensils();

    // Écouteur d'événement pour inputIngredients
    if (inputIngredients) {
        inputIngredients.addEventListener('input', (e) => {
            const searchIngredient = e.target.value.toLowerCase();
            const filteredIngredient = listIngredients.filter(ingredient => ingredient.toLowerCase().includes(searchIngredient));
            if (searchIngredient.length > 2) {
                new DisplayTags(recipes).createInput(containerIngredient);
                new DisplayTags(recipes).displayElements(containerIngredient, filteredIngredient, 'ingredients');
            }
        });
    }

    // Écouteur d'événement pour inputAppliances
    if (inputAppliances) {
        inputAppliances.addEventListener('input', (e) => {
            const searchAppliance = e.target.value.toLowerCase();
            const filteredAppliance = listAppliance.filter(appliance => appliance.toLowerCase().includes(searchAppliance));
            if (searchAppliance.length > 2) {
                new DisplayTags(recipes).createInput(containerAppliances);
                new DisplayTags(recipes).displayElements(containerAppliances, filteredAppliance, 'appliances');
            }
        });
    }

    // Écouteur d'événement pour inputUstensils
    if (inputUstensils) {
        inputUstensils.addEventListener('input', (e) => {
            const searchUstensil = e.target.value.toLowerCase();
            const filteredUstensil = listUstensils.filter(ustensil => ustensil.toLowerCase().includes(searchUstensil));
            if (searchUstensil.length > 2) {
                new DisplayTags(recipes).createInput(containerUstensils);
                new DisplayTags(recipes).displayElements(containerUstensils, filteredUstensil, 'ustensils');
            }
        });
    }
}

export { searchTags };

