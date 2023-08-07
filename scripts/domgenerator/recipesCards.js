function generateRecipeCard(recipesData) {
    const {id, name, servings, ingredients, time, description, appliance, ustensils} = recipesData;
    
    
    
    let picture = `assets/pictures/Recette${id}.jpg`;
    if(id < 10) {
        picture = `assets/pictures/Recette0${id}.jpg`
    } else {
        picture = `assets/pictures/Recette${id}.jpg`
    }
    function recipeCard(){

        const article = document.createElement('article');
        article.classList.add('recipe_article');

        const figure = document.createElement('figure');
        figure.classList.add('recipe_card');

        const img = document.createElement('img');
        img.classList.add('img_recipe');
        img.setAttribute('src', `${picture}`);
        img.setAttribute('alt', `${name}`);

        const span = document.createElement('span');
        span.classList.add('time');
        span.innerHTML = `${time} min`;

        const ingredients_section = document.createElement('dl');
        ingredients_section.classList.add('ingredients_section');

        const recipe_title = document.createElement('dt');
        recipe_title.classList.add('recipe_title');
        recipe_title.innerHTML = `${name}`;

        const description_title = document.createElement('dt');
        description_title.classList.add('description_title');
        description_title.innerHTML = "RECETTE";

        const recipe_description = document.createElement('dd');
        recipe_description.classList.add('recipe_description');
        recipe_description.innerHTML = `${description}`;

        const ingredients_title = document.createElement('dt');
        ingredients_title.classList.add('ingredients_title');
        ingredients_title.innerHTML = "INGRÉDIENTS";


        article.appendChild(figure);
        figure.appendChild(img);
        figure.appendChild(span);
        figure.appendChild(ingredients_section);
        ingredients_section.appendChild(recipe_title);
        ingredients_section.appendChild(description_title);
        ingredients_section.appendChild(recipe_description);
        ingredients_section.appendChild(ingredients_title);
        for(let i = 0; i< ingredients.length; i++){
            const ingredients_name = document.createElement('dt');
            ingredients_name.classList.add('ingredients_name');
            const ingredients_unit = document.createElement('dd');
            ingredients_unit.classList.add('ingredients_unit');
            
            if(ingredients[i].ingredient && ingredients[i].quantity && ingredients[i].unit){
                ingredients_name.innerHTML = `${ingredients[i].ingredient}`;
                ingredients_unit.innerHTML = `${ingredients[i].quantity} ${ingredients[i].unit}`;             
            } else if(ingredients[i].ingredient && ingredients[i].quantity){
                ingredients_name.innerHTML = `${ingredients[i].ingredient}`;
                ingredients_unit.innerHTML = `${ingredients[i].quantity}`;
            } else {
                ingredients_name.innerHTML = `${ingredients[i].ingredient}`;
            }
            ingredients_section.appendChild(ingredients_name);
            ingredients_section.appendChild(ingredients_unit);

        }
        
        return article;
    }; 
    
    return { id, name, servings, ingredients, time, description, appliance, ustensils, recipeCard };
}
export { generateRecipeCard };
