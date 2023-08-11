// Importe la fonction 'generateRecipeCard' depuis le fichier 'recipesCards.js' dans le dossier 'domgenerator'
import { generateRecipeCard } from './domgenerator/recipesCards.js';

// Importe la fonction 'displayRecipes' depuis le fichier 'displayRecipes.js' dans le dossier 'features'
import { displayRecipes, searchRecipes } from './features/displayRecipes.js';


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

// Zone de recherche : search barre
// Écouteur d'événements d'entrée sur l'élément de recherche
document.querySelector('.search input').addEventListener('input', function(event) {
    // Récupére le texte tapé dans la search barre et le convertir en minuscules
    const searchText = event.target.value.toLowerCase();
    
    // Si la barre de recherche est vide, afficher toutes les recettes
    if (searchText.length === 0) {
        getRecipes().then(recipes => {
            displayRecipes(recipes);
        });
    }
    // Sinon, vérifier si la longueur du texte saisi est d'au moins 3 caractères
    else if (searchText.length >= 3) {
        // Récupére les recettes
        getRecipes().then(recipes => {
            // Filtre les recettes en fonction du texte saisi
            const filteredRecipes = searchRecipes(searchText, recipes);
            // Affiche les recettes filtrées à l'écran
            displayRecipes(filteredRecipes);
        });
    }
});



// Appelle la fonction 'init' pour démarrer l'application
init();


