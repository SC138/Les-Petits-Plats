import { FiltersTags} from "./filters.js";
import { arrayrecipes, displayRecipes, updateArrayRecipes } from "../features/displayRecipes.js";
let selectedIngredientTags = [];
let selectedApplianceTags = [];
let selectedUtensilTags = [];
// let selectedIngredientTags = new Set();
export let tagPush = [];

class DisplayTags {
    constructor(recipes) {
        // Stocke les recettes fournies à l'instance de la classe
        this.recipes = recipes;

        // Stocke les tags dans des tableaux appropriés
        this.tags = {
            ingredients: [],
            appareils: [],
            ustencils: []
        };

        // Sélectionne tous les éléments avec la classe .btn-filter
        this.inputs = document.querySelectorAll('.btn-filter');

        // Sélectionne les divs pour les ingrédients, appareils et ustensiles
        this.divIngredients = document.querySelector('.filter_ingredients_container');
        this.divAppareils = document.querySelector('.filter_appareils_container');
        this.divUstencils = document.querySelector('.filter_ustencils_container');

        this.selectedIngredientTags = [];
        this.selectedApplianceTags = [];
        this.selectedUtensilTags = [];

        // Ajoute un écouteur d'événements 'click' à chaque bouton filtré pour appeler 'displayTag'
        // Fait en sorte que 'this' se réfère bien à l'instance de la classe DisplayTags
        this.inputs.forEach(input => {
            // La méthode .bind(this) fait en sorte que this dans displayTag se réfère à DisplayTags 
            // et non à l'élément sur lequel on a cliqué.
            input.addEventListener('click', this.displayTag.bind(this));
        });

        // Écouteur d'event au click sur un élément de la liste
        document.addEventListener('click', this.onTagSelected.bind(this));

        // Écouteur d'event au click en dehors des menus
        document.addEventListener('click', this.closeMenuOnClickOutside.bind(this));
    }


    
    onTagSelected(event) {
        // Vérifie si l'élément clique a bien la class 'elementP'
        if (event.target.matches('.elementP')) {
            // Si oui, ajout du tag à la liste de tag
            const tagName = event.target.innerText;
            // Appelle la focntion addTag pour ajouter ce nopuveau tag
            this.addTag(tagName, event.target);

            // Si l'élément est un ingrédient
            if(event.target.classList.contains('ingredients')){
                // Ajoute le tag d'ingrédient à la liste des tags d'ingrédients sélectionnés
                this.selectedIngredientTags.push(tagName);

                // Filtre les recettes en focntion des ingrédients sélectionnés
                const filteredRecipes = this.recipes.filter(recipe => 
                    // Méthode every() qui permet d'être sur que chaque tag d'appareil sélectionné
                    // est dans au moins une recette
                    this.selectedIngredientTags.every(tag => 
                        // Utilise some() (true ou false) pour vérifier si au moins un ingrédients de la recette
                        // contient le tag recherché
                        recipe.ingredients.some(ingredient => 
                            // Vérifie si le tag est inclus dans le nom de l'ingrédient
                            ingredient.ingredient.toLowerCase().includes(tag.toLowerCase())
                        )
                    )
                );
                displayRecipes(filteredRecipes);
                updateArrayRecipes(filteredRecipes);                
            }
            // Gestion des tags d'appareils
            else if(event.target.classList.contains('appareils')){
                this.selectedApplianceTags.push(tagName);
                // Filtre des recettes par appareil
                const filteredRecipes = this.recipes.filter(recipe => 
                    // Vérifie que les tag sont inclus dans l'appareil de la recette
                    this.selectedApplianceTags.every(tag => 
                        recipe.appliance.toLowerCase().includes(tag.toLowerCase())
                    )
                );
                displayRecipes(filteredRecipes);
                updateArrayRecipes(filteredRecipes);     
            } 
            // Gestion des tags ustensiles 
            else if (event.target.classList.contains('ustencils')){
                this.selectedUtensilTags.push(tagName);
                
                //Filtre les recette par ustensiles
                const filteredRecipes = this.recipes.filter(recipe => 
                    // Vérifie que chaque tag est dans au moins un des ustensiles de la recette
                    this.selectedUtensilTags.every(tag => 
                        recipe.ustensils.some(utensil => 
                            // Vérifie si le tag est dans le nom de l'ustensile
                            utensil.toLowerCase().includes(tag.toLowerCase())
                        )
                    )
                );
                displayRecipes(filteredRecipes);
                updateArrayRecipes(filteredRecipes);     
            }
        }
    }
    

    // Méthode pour ajouter un tag à la liste des tags.
    addTag(ingredientName, clickedElement) {
        let tagContainer;

        // Détermine le bon conteneur de tags en fonction de l'élément cliqué.
        if (clickedElement.closest('.filter_ingredients')) {
            tagContainer = document.querySelector('.filter_ingredients_tags');
            this.divIngredients.style.display = 'none';
            tagPush.push(ingredientName);            
        } else if (clickedElement.closest('.filter_appareils')) {
            tagContainer = document.querySelector('.filter_appareils_tags');
            this.divAppareils.style.display = 'none';
            tagPush.push(ingredientName);
        } else if (clickedElement.closest('.filter_ustencils')) {
            tagContainer = document.querySelector('.filter_ustencils_tags');
            this.divUstencils.style.display = 'none';
            tagPush.push(ingredientName);
        }

        // Création le tag et ajout au conteneur approprié
        if (tagContainer) {
            const tag = document.createElement('div');
            tag.className = 'tag';
            // tag.innerText = ingredientName;
            tag.innerHTML= `
                ${ingredientName}
                <span class="tag-close"><i class="fa-solid fa-xmark"></i></span>
            `;
            //Eviter les doublons d'affichage
            if(!tagContainer.innerHTML.includes(ingredientName)){
                tagContainer.appendChild(tag);
            }

            // Ajout d'un écouteur d'événements pour la suppression du tag ------------------------
            tag.querySelector('.tag-close').addEventListener('click', (e) => {
                e.stopPropagation();
                tagContainer.removeChild(tag);
                const tagType = tagContainer.className.split('_')[1]; 
                const currentSelectedTags = this.tags[tagType];
            
                // Supprimer le tag des tableaux sélectionnés
                const index = currentSelectedTags.indexOf(ingredientName);
                if (index >= 0) {
                    currentSelectedTags.splice(index, 1);
                }
                tagPush.forEach((item, index)=>{
                    if(item.includes(ingredientName)){
                        tagPush.splice(index, 1);
                    }
                })
                console.log("🚀 ~ file: displayTags.js:158 ~ DisplayTags ~ tag.querySelector ~ tagPush:", tagPush)
            
                // Refiltrer les recettes
                const filteredRecipes = this.recipes.filter(recipe => 
                    currentSelectedTags.every(tag => 
                        recipe[tagType].some(item => 
                            item.toLowerCase().includes(tag.toLowerCase())
                        )
                    )
                );
                displayRecipes(filteredRecipes);
                updateArrayRecipes(filteredRecipes);
            });
        }
    }

    // faire une fonction "updateTags" et mettre à jour l'affichage des recettes 

    // // Affiche les tags en fonction de l'élément cliqué 
    displayTag(event) {
        // Récupère l'ID de l'élément cliqué
        const clickedElementId = event.target.id;
        let containerTag;
        // Stocke les éléments filtrés
        let filteredItems = []; 
        let tagType = ''; 
        
        // Instancie la classe FiltersTags
        const filter = new FiltersTags(this.recipes);
        
        // Vérifie l'ID de l'élément cliqué et détermine le type de filtre à appliquer
        // Si l'ID correspond aux ingrédients :
        if (clickedElementId === 'ingredients') {
            // Affecte le container des ingrédients
            containerTag = this.divIngredients;
            tagType ='ingredients';
            // Bascule de la visibilité du div des ingrédients
            this.toggleVisibility(this.divIngredients);
            // Filtrage des ingrédients à partir des recettes
            filteredItems = filter.filteredIngredients();
        } else if (clickedElementId === 'appareils') {
            // Affecte le container des appareils
            containerTag = this.divAppareils;
            tagType = 'appareils';
            // Bascule de la visibilité du div des appareils
            this.toggleVisibility(this.divAppareils);
            // Filtrage des appareils à partir des recettes
            filteredItems = filter.filteredAppliances();
        } else if (clickedElementId === 'ustencils') {
            // Affecte le container des ustensiles
            containerTag = this.divUstencils;
            tagType ='ustencils';
            // Bascule de la visibilité du div des ustensiles
            this.toggleVisibility(this.divUstencils);
            // Filtrage des ustensiles à partir des recettes
            filteredItems = filter.filteredUstensils();
        }

        // Si des éléments sont filtrés et que le conteneur est visible, 
        // alors on crée un champ input et on affiche les éléments filtrés
        if (containerTag.style.display !== 'none') {
            this.createInput(containerTag);
            this.displayElements(containerTag, filteredItems, tagType);
        }
    }
    
    toggleVisibility(element) {
        // Si l'élément est caché ou n'a pas de propriété 'display' définie, 
        // on le rend visible. Sinon, on le cache.
        if (element.style.display === 'none' || element.style.display === '') {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    }
    

    // Création de la search bar pour les tags
    createInput(element){
        const tag = element;

        // Template pour la search bar
        const inputTag = `
        <input class="searchTag" type="text">
        <button class="erase" type="submit">
            <i class="fa-solid fa-xmark"></i>
        </button>
        <img class="img_submit_filters" src="assets/search.png" alt="Loupe de recherche">        
        `
        // Insertion de la search bar dans le menu 
        tag.innerHTML = inputTag;
    }


    // Affiche les éléments filtrés dans le container de tags
    displayElements(tagContainer, elements, type){
        // Boucle sur chaque éléments filtré
        elements.forEach((item) => {
            // Crée un élément <p>
            const elementP = document.createElement('p');
            elementP.classList.add('elementP');
            elementP.classList.add(type);
            // Ajout du texte à l'élément <p>
            elementP.textContent = item;  

            // Ajout de l'élément <p> au conteneur
            tagContainer.appendChild(elementP); 
        });
    }


    // Méthode pour fermer les menus en cliquant ailleurs que sur les menus
    closeMenuOnClickOutside(event) {
        // Si le clic n'est pas sur un menu, fermer le/les menus
        if (!event.target.closest('.filter_ingredients_container') && 
            !event.target.closest('.filter_appareils_container') && 
            !event.target.closest('.filter_ustencils_container') &&
            !event.target.closest('.btn-filter')) {
            // Masque les menus    
            this.divIngredients.style.display = 'none';
            this.divAppareils.style.display = 'none';
            this.divUstencils.style.display = 'none';
        }
    }

}

export { DisplayTags };
