import { DisplayTags } from "../utils/displayTags.js";
import { displayRecipes, searchRecipes } from "./displayRecipes.js";
import { FiltersTags } from "../utils/filters.js";
import { arrayrecipes } from "../features/displayRecipes.js";

function searchTags(recipes) {
    const containerIngredient = document.querySelector('.filter_ingredients_container');
    const containerAppliances = document.querySelector('.filter_appareils_container');
    const containerUstensils = document.querySelector('.filter_ustencils_container');

    const listIngredients = new FiltersTags(recipes).filteredIngredients();
    const listAppliance = new FiltersTags(recipes).filteredAppliances();
    const listUstensils = new FiltersTags(recipes).filteredUstensils();

    const inputDelete = document.querySelector('.delete');

    

    function attachIngredientListener() {
        const inputIngredients = containerIngredient.querySelector('.ingredients');
        if (inputIngredients) {
            inputIngredients.addEventListener('input', (e) => {
                const searchIngredient = e.target.value.toLowerCase();
    
                if (!searchIngredient) {
                    // Si l'input est vide, réinitialise la liste à son état d'origine et l'affiche
                    new DisplayTags(recipes).displayElements(containerIngredient, listIngredients, 'ingredients');
                    return;
                }
                inputDelete.style.display='none';
                // Filtre les éléments si la longueur du texte est supérieure à 2
                if (searchIngredient.length > 2) {
                    const elementsToDisplay = listIngredients.filter(ingredient => ingredient.toLowerCase().includes(searchIngredient));
                    inputDelete.style.display='block';
                    new DisplayTags(recipes).createInput(containerIngredient);
                    const newInput = containerIngredient.querySelector('.ingredients');
                    newInput.value = searchIngredient;
                    newInput.focus();
    
                    // Vérifie que l'écouteur est attaché au nouvel input
                    attachIngredientListener();
                    new DisplayTags(recipes).displayElements(containerIngredient, elementsToDisplay, 'ingredients');
                }
            });
        }
    }
    
    

    function attachApplianceListener() {
        const inputAppliances = containerAppliances.querySelector('.appareils');
        if (inputAppliances) {
            inputAppliances.addEventListener('input', (e) => {
                const searchAppliance = e.target.value.toLowerCase();
        
                if (!searchAppliance) {
                    new DisplayTags(recipes).displayElements(containerAppliances, listAppliance, 'appareils');
                    return;
                }
        
                if (searchAppliance.length > 2) {
                    const elementsToDisplay = listAppliance.filter(appliance => appliance.toLowerCase().includes(searchAppliance));
    
                    new DisplayTags(recipes).createInput(containerAppliances);
                    const newInput = containerAppliances.querySelector('.appareils');
                    newInput.value = searchAppliance;
                    newInput.focus();
    
                    attachApplianceListener();
                    new DisplayTags(recipes).displayElements(containerAppliances, elementsToDisplay, 'appareils');
                }
            });
        }
    }
    
    function attachUstensilListener() {
        const inputUstensils = containerUstensils.querySelector('.ustencils');
        if (inputUstensils) {
            inputUstensils.addEventListener('input', (e) => {
                const searchUstensil = e.target.value.toLowerCase();
        
                if (!searchUstensil) {
                    new DisplayTags(recipes).displayElements(containerUstensils, listUstensils, 'ustencils');
                    return;
                }
        
                if (searchUstensil.length > 2) {
                    const elementsToDisplay = listUstensils.filter(ustensil => ustensil.toLowerCase().includes(searchUstensil));
    
                    new DisplayTags(recipes).createInput(containerUstensils);
                    const newInput = containerUstensils.querySelector('.ustencils');
                    newInput.value = searchUstensil;
                    newInput.focus();
    
                    attachUstensilListener();
                    new DisplayTags(recipes).displayElements(containerUstensils, elementsToDisplay, 'ustencils');
                }
            });
        }
    }

    attachIngredientListener();
    attachApplianceListener();
    attachUstensilListener();
}

export { searchTags };
