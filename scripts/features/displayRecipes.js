// Importation de la fonction qui génère une carte de recette
import { generateRecipeCard } from "../../scripts/domgenerator/recipesCards.js";

// Fonction pour mettre à jour le compte des recettes affichées
function updateRecipeCount() {
    // Sélectionne tous les articles de recettes présents dans la section des recettes
    const recipes = document.querySelectorAll('.recipes_section .recipe_article');
    // Sélectionne le span où le compte des recettes est affiché
    const countSpan = document.querySelector('#recipeCount');
    
    let recipeWord;
    // Détermine le mot à utiliser (pluriel ou singulier) en fonction du nombre de recettes
    if (recipes.length > 1) {
        recipeWord = "recettes";
    } else {
        recipeWord = "recette";
    }

    // Met à jour le texte de la span avec le compte des recettes
    countSpan.textContent = `${recipes.length} ${recipeWord}`;
}


// Fonction pour afficher les recettes sur la page
function displayRecipes(recipes) {
    // Sélectionne la section où les recettes doivent être affichées
    const recipesSection = document.querySelector('.recipes_section');

    // Boucle sur chaque recette dans la liste fournie
    recipes.forEach((recipe) => {
        // Utilise la fonction importée pour générer le modèle de la recette
        const recipeModel = generateRecipeCard(recipe);
        // Crée un élément DOM pour cette recette
        const recipeDOM = recipeModel.recipeCard();
        // Ajoute cet élément à la section des recettes
        recipesSection.appendChild(recipeDOM);
    });

    // Met à jour le compte des recettes après les avoir toutes ajoutées
    updateRecipeCount();
}

// Export de de la fonction 'displayRecipes' pour pouvoir l'utiliser ailleurs dans le code
export { displayRecipes };
