function generateRecipeCard(recipesData) {
    const {id, name, servings, ingredients, time, description, appliance, ustensils} = recipesData;
    
    let picture = `assets/pictures/Recette${id}.jpg`;
    if(id < 10) {
        picture = `assets/pictures/Recette0${id}.jpg`
    } else {
        picture = `assets/pictures/Recette${id}.jpg`
    }
    

    function recipeCard(){
        const $article = document.createElement('article');
        
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
        $article.innerHTML = cardRecipe;
        return $article;
    }
    

    function generateIngredientPlace() {
        let ingredientsRecipe = "";
        for(let i = 0; i < ingredients.length; i++) {
            if(ingredients[i].ingredient && ingredients[i].quantity && ingredients[i].unit) {
                ingredientsRecipe += `
                <div class="div_ingredients_bloc">
                    <dt class="ingredients_name">${ingredients[i].ingredient}</dt>
                    <dd><span class="ingredients_unit"> ${ingredients[i].quantity} ${ingredients[i].unit}</span> </dd>
                </div>
                `
            } else if(ingredients[i].ingredient && ingredients[i].quantity) {
                ingredientsRecipe += `
                <div class="div_ingredients_bloc">
                    <dt class="ingredients_name">${ingredients[i].ingredient}</dt>
                    <dd><span class="ingredients_unit"> ${ingredients[i].quantity}</span> </dd>
                </div>
                `
            } else {
                ingredientsRecipe += `
                <div class="div_ingredients_bloc">
                    <dt class="ingredients_name">${ingredients[i].ingredient} </dt>
                </div>
                `
            }  
        }
        return ingredientsRecipe;
    }

    return {id, name, servings, ingredients, time, description, appliance, ustensils, recipeCard};
}

export { generateRecipeCard };