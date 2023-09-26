// Importe la fonction 'generateRecipeCard' depuis le fichier 'recipesCards.js' dans le dossier 'domgenerator'
import { generateRecipeCard } from './domgenerator/recipesCards.js';

// Importe la fonction 'displayRecipes' depuis le fichier 'displayRecipes.js' dans le dossier 'features'
import { displayRecipes, searchRecipes, arrayrecipes, clearArrayRecipes } from './features/displayRecipes.js';

import {FiltersTags} from './utils/filters.js';

import { DisplayTags } from './utils/displayTags.js';

import { searchTags } from './features/searchTagsRecipes.js';

// Fonction asynchrone pour récupérer les recettes depuis le fichier JSON
async function getRecipes(){
    // Envoie une requête pour récupérer le fichier 'recipes.json'
    const response = await fetch('../../data/recipes.json');
    
    // Convertit la réponse en format JSON
    const data = await response.json();
    
    // Extrai les recettes depuis les données converties
    var recipes = data.recipes;
    
    // Retourne les recettes extraites
    return recipes;
}

// Sélection des éléments de la search bar et du bouton d'effacement
const searchInput = document.querySelector('.search input');
const btnFilter = document.querySelectorAll('.btn-filter');
// const listFilter = document.querySelectorAll('.filter_ingredients_container, .filter_appareils_container, .filter_ustencils_container')
const erase = document.querySelector('.erase');

function reloadAllRecipes() {
    // Masque le bouton d'effacement
    erase.style.display= 'none';

    clearArrayRecipes();

    // Affiche toutes les recettes
    getRecipes().then(recipes => {
        document.querySelector('.no-recipe-message').textContent = '';  
        displayRecipes(recipes);
    });

}

// Gestion des radius sur les boutons de filtre
btnFilter.forEach((btn) => {
    btn.addEventListener('click', (event) => {
        // Empêche l'événement de propagation jusqu'au DOM
        event.stopPropagation();

        if(btn.classList.contains('close')) {
            btn.classList.remove('close');
            btn.style.borderRadius = "10px";
        } else {
            btn.classList.add('close');
            btn.style.borderRadius = "10px 10px 0 0";
        }
    });
});

// Ajout d'un événement click sur le document pour détecter un clic à l'extérieur
document.addEventListener('click', () => {
    btnFilter.forEach((btn) => {
        if(btn.classList.contains('close')) {
            btn.classList.remove('close');
            btn.style.borderRadius = "10px";
        }
    });
});



// Écouteur d'événements d'entrée sur l'élément de recherche
searchInput.addEventListener('input', async function(event) {
    // Récupère le texte entré dans la search bar et le convertit en minuscules
    const searchText = event.target.value.toLowerCase();

    if(searchText.length === 0) {
        return reloadAllRecipes()
    }

    if (searchText.length < 3) {
        // Si la barre de recherche est vide laisse toutes les recettes affichées
        return;
    }

    // Si au moins 3 caractères dans la search barre
    erase.style.display = 'block';
    // Récupére les recettes
    const recipes = await getRecipes()

    let filteredRecipes = searchRecipes(searchText, recipes);    
    // Si aucune recette ne correspond à la recherche
    if(filteredRecipes.length === 0) {
        const errorMessage = `Aucune recette ne contient '${searchText}'. Vous pouvez chercher "tarte aux pommes", "poisson", etc.`;
        document.querySelector('.no-recipe-message').textContent = errorMessage;
        // Vide la section des recettes
        displayRecipes([]);

        return;
    }

    // Affiche les recettes qui correspondent à la recherche et efface le message d'erreur
    document.querySelector('.no-recipe-message').textContent = '';  
    displayRecipes(filteredRecipes);
    clearArrayRecipes()
    arrayrecipes.push(filteredRecipes);
});

// Ajout d'un écouteur d'événements sur le bouton d'effacement
erase.addEventListener('click', () => {
    // Efface le contenu de la search bar
    searchInput.value = '';
    // Masque le bouton d'effacement
    erase.style.display = 'none';

    clearArrayRecipes();
    
    // Récupération et affichage de toutes les recettes
    getRecipes().then(recipes => {
        document.querySelector('.no-recipe-message').textContent = '';  
        displayRecipes(recipes);
    });
});


// Fonction pour initialiser l'application
async function init() {
    // Appelle la fonction 'getRecipes' pour obtenir les recettes
    const recipes = await getRecipes();

    // Génère des cartes de recettes pour chaque recette
    generateRecipeCard(recipes);

    // Affiche les recettes 
    displayRecipes(recipes);
    
    


    // Envoie le résultat du fetch dans le FiltersTags
    const filters = new FiltersTags(recipes);
    filters.filteredIngredients();
    filters.filteredAppliances();
    filters.filteredUstensils();

    new DisplayTags(recipes);
    searchTags(recipes);
}





// Appelle la fonction 'init' pour démarrer l'application
await init();