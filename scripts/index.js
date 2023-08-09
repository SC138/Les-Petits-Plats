// Importe la fonction 'generateRecipeCard' depuis le fichier 'recipesCards.js' dans le dossier 'domgenerator'
import { generateRecipeCard } from './domgenerator/recipesCards.js';

// Importe la fonction 'displayRecipes' depuis le fichier 'displayRecipes.js' dans le dossier 'features'
import { displayRecipes } from './features/displayRecipes.js';

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
    });
}

// Appelle la fonction 'init' pour démarrer l'application
init();


