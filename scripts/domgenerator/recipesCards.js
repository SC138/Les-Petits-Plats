// Fonction pour générer une carte de recette 
function generateRecipeCard(recipesData) {
    const {id, name, servings, ingredients, time, description, appliance, ustensils} = recipesData;
    
    // Définition du chemin de l'image
    let picture = `assets/pictures/Recette${id}.jpg`;

    // Modification du chemin de l'image si l'ID est inférieur à 10 (pour gérer le formatage des noms de fichiers)
    if(id < 10) {
        picture = `assets/pictures/Recette0${id}.jpg`
    } else {
        picture = `assets/pictures/Recette${id}.jpg`
    }
    

    // Fonction pour créer le HTML de la carte de recette
    function recipeCard(){
        const $article = document.createElement('article');
        
        // Définition du HTML de la carte de recette
        const cardRecipe = `
            <article class="recipe_article">
                <figure class="recipe_card">
                    <img src="${picture}" alt="${name}" class="img_recipe">
                    <span class="time"> ${time}min </span>
                    <dl class="ingredients_section">
                        <dt class="recipe_title"> ${name} </dt>
                        <dt class="description_title"> RECETTE </dt>
                        <dd class="recipe_description"> ${description} </dd>
                        <dt class="ingredients_title"> INGRÉDIENTS </dt>
                        <div class="bloc_ingredients">
                            ${generateIngredientPlace()}
                        </div>
                    </dl>
                </figure>
            </article>
        `
        // Remplissage de l'élément 'article' avec le HTML de la carte
        $article.innerHTML = cardRecipe;

        // Retourne l'élément article complété
        return $article;
    }
    

    // Fonction pour générer le HTML des ingrédients
    function generateIngredientPlace() {
        let ingredientsRecipe = "";

        // Boucle sur chaque ingrédient
        for(let i = 0; i < ingredients.length; i++) {
            // Gestion des différents cas d'affichages
            // si : ingrédients, quantité et unité
            if(ingredients[i].ingredient && ingredients[i].quantity && ingredients[i].unit) {
                ingredientsRecipe += `
                <div class="div_ingredients_bloc">
                    <dt class="ingredients_name">${ingredients[i].ingredient}</dt>
                    <dd><span class="ingredients_unit"> ${ingredients[i].quantity} ${ingredients[i].unit}</span> </dd>
                </div>
                `

                // sinon si : ingrédients, quantité
            } else if(ingredients[i].ingredient && ingredients[i].quantity) {
                ingredientsRecipe += `
                <div class="div_ingredients_bloc">
                    <dt class="ingredients_name">${ingredients[i].ingredient}</dt>
                    <dd><span class="ingredients_unit"> ${ingredients[i].quantity}</span> </dd>
                </div>
                `

                // sinon : ingrédients
            } else {
                ingredientsRecipe += `
                <div class="div_ingredients_bloc">
                    <dt class="ingredients_name">${ingredients[i].ingredient} </dt>
                </div>
                `
            }  
        }

        // Retourne le HTML des ingrédients
        return ingredientsRecipe;
    }

    // Retourne les propriétés de la recette et fonction 'recipeCard'
    return {id, name, servings, ingredients, time, description, appliance, ustensils, recipeCard};
}




// Export de de la fonction 'generateRecipeCard' pour pouvoir l'utiliser ailleurs dans le code
export { generateRecipeCard };