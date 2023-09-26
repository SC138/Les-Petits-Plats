import { FiltersTags} from "./filters.js";
import { displayRecipes, updateArrayRecipes } from "../features/displayRecipes.js";
import { searchTags } from "../features/searchTagsRecipes.js";
// let selectedIngredientTags = [];
// let selectedApplianceTags = [];
// let selectedUtensilTags = [];
export let tagPush = [];

class DisplayTags {
    constructor(recipes) {
        // Stocke les recettes fournies à l'instance de la classe
        this.recipes = recipes;
        this.recipesAll = recipes;

        // Stocke les tags dans des tableaux appropriés
        this.tags = {
            ingredients: [],
            appareils: [],
            ustencils: []
        };

        // Sélectionne tous les éléments avec la classe .btn-filter
        this.containerInputs = document.querySelectorAll('.btn-filter');
        

        // Sélectionne les divs pour les ingrédients, appareils et ustensiles
        this.divIngredients = document.querySelector('.filter_ingredients_container');
        this.divAppareils = document.querySelector('.filter_appareils_container');
        this.divUstencils = document.querySelector('.filter_ustencils_container');

        this.selectedIngredientTags = [];
        this.selectedApplianceTags = [];
        this.selectedUtensilTags = [];

        // Ajoute un écouteur d'événements 'click' à chaque bouton filtré pour appeler 'displayTag'
        // Fait en sorte que 'this' se réfère bien à l'instance de la classe DisplayTags
        this.containerInputs.forEach(container => {
            // La méthode .bind(this) fait en sorte que this dans displayTag se réfère à DisplayTags 
            // et non à l'élément sur lequel on a cliqué.
            container.addEventListener('click', this.displayTag.bind(this));
        });


        // Écouteur d'event au click sur un élément de la liste
        document.addEventListener('click', this.onTagSelected.bind(this));

        // Écouteur d'event au click en dehors des menus
        document.addEventListener('click', this.closeMenuOnClickOutside.bind(this));
    }



    updateRecipes(newRecipes){
            this.recipes = newRecipes;
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
                this.recipes = [...this.recipesAll];
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
                this.updateRecipes(filteredRecipes);
                updateArrayRecipes(filteredRecipes);                
                displayRecipes(filteredRecipes);
            }
            // Gestion des tags d'appareils 
            else if(event.target.classList.contains('appareils')){
                this.recipes = [...this.recipesAll];
                this.selectedApplianceTags.push(tagName);
                // Filtre des recettes par appareil
                const filteredRecipes = this.recipes.filter(recipe => 
                    // Vérifie que les tag sont inclus dans l'appareil de la recette
                    this.selectedApplianceTags.every(tag => 
                        recipe.appliance.toLowerCase().includes(tag.toLowerCase())
                    )
                );
                this.updateRecipes(filteredRecipes);
                updateArrayRecipes(filteredRecipes);     
                displayRecipes(filteredRecipes);
            } 
            // Gestion des tags ustensiles 
            else if (event.target.classList.contains('ustencils')){
                this.recipes = [...this.recipesAll];
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
                this.updateRecipes(filteredRecipes);
                updateArrayRecipes(filteredRecipes);     
                displayRecipes(filteredRecipes);
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

            // Remet le chevron vers le bas
            const toggleButton = this.divIngredients.previousElementSibling.querySelector('i');
            toggleButton.classList.remove('fa-chevron-up');
            toggleButton.classList.add('fa-chevron-down');

            if(!tagPush.includes(ingredientName)){
                tagPush.push(ingredientName);
            }            
        } else if (clickedElement.closest('.filter_appareils')) {
            tagContainer = document.querySelector('.filter_appareils_tags');
            this.divAppareils.style.display = 'none';

            const toggleButtonAppareils = this.divAppareils.previousElementSibling.querySelector('i');
            toggleButtonAppareils.classList.remove('fa-chevron-up');
            toggleButtonAppareils.classList.add('fa-chevron-down');

            if(!tagPush.includes(ingredientName)){
                tagPush.push(ingredientName);
            }
        } else if (clickedElement.closest('.filter_ustencils')) {
            tagContainer = document.querySelector('.filter_ustencils_tags');
            this.divUstencils.style.display = 'none';

            const toggleButtonUstencils = this.divUstencils.previousElementSibling.querySelector('i');
            toggleButtonUstencils.classList.remove('fa-chevron-up');
            toggleButtonUstencils.classList.add('fa-chevron-down');

            if(!tagPush.includes(ingredientName)){
                tagPush.push(ingredientName);
            }
        }

        // Création de tag et ajout au conteneur approprié
        if (tagContainer) {
            const tag = document.createElement('div');
            tag.className = 'tag';
            tag.innerHTML= `
                ${ingredientName}
                <span class="tag-close"><i class="fa-solid fa-xmark default-icon"></i></span>
                <span class="tag-close"><i class="fa-solid fa-circle-xmark hover-icon"></i></span>
            `;

            // Eviter les doublons d'affichage
            if(!tagContainer.innerHTML.includes(ingredientName)){
                tagContainer.appendChild(tag);
            }

            const closeIcons = tag.querySelectorAll('.tag-close');
            closeIcons.forEach(icon => {
                icon.addEventListener('click', (e) => {
                    e.stopPropagation();
                    tagContainer.removeChild(tag);
                    
                    // Commence la mise à jour des recettes
                    const tagType = tagContainer.className.split('_')[1]; 
                    const currentSelectedTags = this.tags[tagType];

                    // index correspond au tag sélectionné
                    const index = currentSelectedTags.indexOf(ingredientName);

                    // Si l'index est supérieur ou égal à 0 
                    if (index >= 0) {
                        // Alors au clique sur la croix, suppression du tag depuis son index
                        currentSelectedTags.splice(index, 1);
                    }

                    // Tableau pour stocker les recettes affichées 
                    let newDisplayRecipes = [];

                    // Pour chaque item du tableau tagPush
                    tagPush.forEach((item, index) => {
                        // Si l'item du tag inclus le nom du tag
                        if(item.includes(ingredientName)){
                            // Supprimer cet élément à son index
                            tagPush.splice(index, 1);
                            // Si le tableau tagPush est vide
                            if(tagPush.length === 0){
                                // Réinitialise le tag et les recettes
                                this.resetTags();
                            }
                            // Si la longueur de tagPush est supérieur à 0 
                            if(tagPush.length > 0){
                                // Boucler sur le tableau tagPush
                                for (let i = 0; i < tagPush.length; i++) {
                                    // Boucler sur toutes les recettes
                                    for (let j = 0; j < this.recipesAll.length; j++) {
                                        // Si une recette contient un élément correspondant au tableau tagPush
                                        if(this.recipesAll[j].ingredients.some(ingredient =>
                                            ingredient.ingredient.toLowerCase().includes(tagPush[i].toLowerCase())
                                            ) || this.recipesAll[j].appliance.toLowerCase().includes(tagPush[i].toLowerCase())
                                            || this.recipesAll[j].ustensils.some(ustensil => 
                                                ustensil.toLowerCase().includes(tagPush[i].toLowerCase())
                                                )){
                                                    // Envoie les recettes correspondante dans le tableau newDisplayRecipes
                                                    newDisplayRecipes.push(this.recipesAll[j]);
                                        }
                                    }
                                }
                                // MAJ de l'affichage des recettes
                                this.updateRecipes(newDisplayRecipes);
                                // MAJ du tableau des recettes
                                updateArrayRecipes(newDisplayRecipes);
                                // MAJ de l'affichage des recettes
                                displayRecipes(newDisplayRecipes);
                            }
                        }
                    })
                });
            });
        }
    }

    // Fonction pour réinitialiser les tags et les recettes
    resetTags(){
        // Vide les 4 tableaux ci dessous
        this.selectedIngredientTags = [];
        this.selectedApplianceTags = [];
        this.selectedUtensilTags = [];
        tagPush = [];

        // MAJ de l'affichage des recettes avec les 3 fonctions ci dessous
        this.updateRecipes(this.recipesAll);
        updateArrayRecipes(this.recipesAll);
        displayRecipes(this.recipesAll);
    }


    // Affiche les tags en fonction de l'élément cliqué 
    displayTag(event) {
        this.recipes = [...this.recipesAll];

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
        
        // previousElementSibling cible le bouton lié à cet élément
        const btn = element.previousElementSibling;
    
        // Identifie l'icône à l'intérieur du bouton
        const icon = btn.querySelector('i');

        if (element.style.display === 'none' || element.style.display === '') {
            element.style.display = 'block';


            
            // Si le menu est ouvert, change l'icône pour le chevron up
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
        } else {
            element.style.display = 'none';
            


            // Si le menu est fermé, change l'icône pour le chevron down
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
        }
    }



    // Création de la search bar pour les tags
    createInput(element){
        const tag = element;
        let input = '';
        if(element.classList.contains('filter_ingredients_container')){
            input = 'ingredients';
        } else if(element.classList.contains('filter_appareils_container')){
            input = 'appareils';
        } else if(element.classList.contains('filter_ustencils_container')){
            input = 'ustencils';
        }
        tag.innerHTML = '';

        // Template pour la search bar
        const inputTag = `
        <input class="searchTag ${input}" type="text">
        <i class="fa-solid fa-xmark" id="delete${input}"></i>
        <img class="img_submit_filters" src="assets/search.png" alt="Loupe de recherche">        
        `
        // Insertion de la search bar dans le menu 
        tag.innerHTML = inputTag;


        const searchInput = tag.querySelector('.searchTag');
        // // Mettre le focus sur l'input 
        searchInput.focus();
    }

    deleteSearchTag() {
        // Récupère tous les éléments de la classe searchTag 
        const searchTag = document.querySelectorAll('.searchTag');

        // Récupère les trois id
        const deleteSearchIngredient = document.getElementById('deleteingredients');
        const deleteSearchAppareils = document.getElementById('deleteappareils');
        const deleteSearchUstensils = document.getElementById('deleteustencils');

        // Liste filtrée des ingrédients, appareils et ustensiles à partir des recettes
        const listingIngredients = new FiltersTags(this.recipes).filteredIngredients();
        const listingAppareils = new FiltersTags(this.recipes).filteredAppliances();
        const listingUstencils = new FiltersTags(this.recipes).filteredUstensils();
        
        // Boucle sur chaque éleémtn searchTag
        for (let i = 0; i < searchTag.length; i++) {
            // Masque la croix de suppression si moins de 3 caractères dans l'input
            if (searchTag[i].classList.contains('ingredients') && searchTag[i].value.length < 3) {
                deleteSearchIngredient.style.display = 'none';
            } else if (searchTag[i].classList.contains('appareils') && searchTag[i].value.length < 3) {
                deleteSearchAppareils.style.display = 'none';
            } else if (searchTag[i].classList.contains('ustencils') && searchTag[i].value.length < 3) {
                deleteSearchUstensils.style.display = 'none';
            }
            
            // Écouteur d'event sur l'input
            searchTag[i].addEventListener('input', (e) => {
                const searchInputTag = e.target.value.toLowerCase();
                
                // Si plus de 2 caractères saisies, afficher la crois de suppression
                if (searchTag[i].classList.contains('ingredients') && searchInputTag.length > 2) {
                    deleteSearchIngredient.style.display = 'block';
                } 
                if (searchTag[i].classList.contains('appareils') && searchInputTag.length > 2) {
                    deleteSearchAppareils.style.display = 'block';
                } 
                if (searchTag[i].classList.contains('ustencils') && searchInputTag.length > 2) {
                    deleteSearchUstensils.style.display = 'block';
                }   
            });

            // Écouteur d'event pour vider l'input et mettre à jour le menu
            if (searchTag[i].classList.contains('ingredients')){
                deleteSearchIngredient.addEventListener('click', () => {
                    searchTag[i].value = '';
                    this.displayElements(this.divIngredients, listingIngredients, 'ingredients');
                })
            }
            if (searchTag[i].classList.contains('appareils')) {
                deleteSearchAppareils.addEventListener('click', () => {
                    searchTag[i].value = '';
                    this.displayElements(this.divAppareils, listingAppareils, 'appareils');
                })
            }
            if (searchTag[i].classList.contains('ustencils')) {
                deleteSearchUstensils.addEventListener('click', () => {
                    searchTag[i].value = '';
                    this.displayElements(this.divUstencils, listingUstencils, 'ustencils');
                })
            }
        }
    }

    // Affiche les éléments filtrés dans le container de tags
    displayElements(tagContainer, elements, type){
        // Supprime les éléments précédents
        tagContainer.querySelectorAll('.elementP').forEach(element => element.remove());

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
        searchTags(this.recipesAll);
        this.deleteSearchTag();
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
    
            // Remet à jour l'icône des chevrons pour chaque menu
            const updateChevronIcon = (menuDiv) => {
                const btn = menuDiv.previousElementSibling;
                const icon = btn.querySelector('i');
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
    
            updateChevronIcon(this.divIngredients, '.btn-filter');
            updateChevronIcon(this.divAppareils, '.btn-filter');
            updateChevronIcon(this.divUstencils, '.btn-filter');
        }
    }
    


}

export { DisplayTags };

