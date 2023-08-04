const generateRecipeCard = (oneRecipe)=>{
    const {id, name, servings, ingredients, time, description, appliance, ustensils} = oneRecipe;

    function recipeCard(){
        const picture = `assets/pictures/${recette}`;



        const article = document.createElement('article');
        article.classList.add('recipeCard');
        
        const imgRecipe = document.createElement('img');
        imgRecipe.classList.add('imgRecipe');
        imgRecipe.setAttribute('src', picture);
        imgRecipe.alt='Photo de recette';

        const getId = document.createElement('div');
        getId.setAttribute('div', `index.html?id=${id}`);

        const recipeName = document.createElement('h3');
        recipeName.classList.add('recipeName');
        recipeName.textContent = name
    }
}

export{generateRecipeCard};