import { DisplayTags } from "../utils/displayTags.js";
import { FiltersTags } from "../utils/filters.js";

// Fonction pour gérer la recherche par tags dans les recettes
function searchTags(recipes) {
    // Sélection des conteneurs pour les ingrédients, appareils et ustensiles
    const containerIngredient = document.querySelector('.filter_ingredients_container');
    const containerAppliances = document.querySelector('.filter_appareils_container');
    const containerUstensils = document.querySelector('.filter_ustencils_container');

    // Utilisation de la classe FiltersTags pour obtenir les listes filtrées des ingrédients, appareils et ustensiles
    const listIngredients = new FiltersTags(recipes).filteredIngredients();
    const listAppliance = new FiltersTags(recipes).filteredAppliances();
    const listUstensils = new FiltersTags(recipes).filteredUstensils();




    // Fonction pour attacher un écouteur d'événements à l'input des ingrédients
    function attachIngredientListener() {
        // Sélection de l'input dans le conteneur d'ingrédients
        const inputIngredients = containerIngredient.querySelector('.ingredients');
        // Si l'input existe
        if (inputIngredients) {
            // Attache un écouteur d'événements qui réagit lorsqu'on tape dedans
            inputIngredients.addEventListener('input', (e) => {
                // Convertit la valeur entrée en minuscules 
                const searchIngredient = e.target.value.toLowerCase();
    
                if (!searchIngredient) {
                    // Si l'input est vide, réinitialise la liste à son état d'origine et l'affiche
                    new DisplayTags(recipes).displayElements(containerIngredient, listIngredients, 'ingredients');
                    return;
                }

                // Filtre les éléments si la longueur du texte est supérieure à 2
                if (searchIngredient.length > 2) {
                    // Filtre les ingrédients basés sur la valeur entrée
                    const elementsToDisplay = listIngredients.filter(ingredient => ingredient.toLowerCase().includes(searchIngredient));

                    // Crée un nouvel input et y insère la valeur recherchée
                    new DisplayTags(recipes).createInput(containerIngredient);
                    const newInput = containerIngredient.querySelector('.ingredients');
                    newInput.value = searchIngredient;
                    newInput.focus();
    
                    // Vérifie que l'écouteur est attaché au nouvel input
                    attachIngredientListener();
                    // Affiche la liste filtrée des ingrédients
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
