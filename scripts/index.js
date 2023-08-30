// Importe la fonction 'generateRecipeCard' depuis le fichier 'recipesCards.js' dans le dossier 'domgenerator'
import { generateRecipeCard } from './domgenerator/recipesCards.js';

// Importe la fonction 'displayRecipes' depuis le fichier 'displayRecipes.js' dans le dossier 'features'
import { displayRecipes, searchRecipes, arrayrecipes, clearArrayRecipes } from './features/displayRecipes.js';

import {FiltersTags} from './utils/filters.js';

import { DisplayTags } from './utils/displayTags.js';



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



// Fonction pour initialiser l'application
function init() {
    // Appelle la fonction 'getRecipes' pour obtenir les recettes
    getRecipes()
    .then((recipes) => { // Une fois les recettes obtenues

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


    });
}

// Sélection des éléments de la search bar et du bouton d'effacement
const searchInput = document.querySelector('.search input');
const erase = document.querySelector('.erase');

// Écouteur d'événements d'entrée sur l'élément de recherche
searchInput.addEventListener('input', function(event) {
    // Récupère le texte entré dans la search bar et le convertit en minuscules
    const searchText = event.target.value.toLowerCase();

    // Si au moins 3 caractères dans la search barre
    if(searchText.length >= 3) {
        erase.style.display = 'block';
        // Récupére les recettes
        getRecipes().then(recipes => {
            let filteredRecipes = searchRecipes(searchText, recipes);
            // console.log(searchText);
            

            // Si aucune recette ne correspond à la recherche
            if(filteredRecipes.length === 0) {
                const errorMessage = `Aucune recette ne contient '${searchText}'. Vous pouvez chercher "tarte aux pommes", "poisson", etc.`;
                document.querySelector('.no-recipe-message').textContent = errorMessage;
                // Vide la section des recettes
                displayRecipes([]);
            } else {
                // Affiche les recettes qui correspondent à la recherche et efface le message d'erreur
                document.querySelector('.no-recipe-message').textContent = '';  
                displayRecipes(filteredRecipes);
                if(arrayrecipes.includes(filteredRecipes)){
                    return;
                }
                arrayrecipes.push(filteredRecipes);

                // console.log(arrayrecipes)
            }
        });
        // Si la barre de recherche est vide affiche toutes les recettes
    } else if(searchText.length === 0) {
        // Masque le bouton d'effacement
        erase.style.display= 'none';

        clearArrayRecipes();

        // Affiche toutes les recettes
        getRecipes().then(recipes => {
            document.querySelector('.no-recipe-message').textContent = '';  
            displayRecipes(recipes);
        });
    }
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


const filtersSection = document.getElementById('filtersSection');
filtersSection.addEventListener('click',(e)=>{
    if(e.target.className == 'btn-filter'){
    }
});


// Appelle la fonction 'init' pour démarrer l'application
init();


