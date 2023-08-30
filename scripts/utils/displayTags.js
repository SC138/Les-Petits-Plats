import { FiltersTags} from "./filters.js";

class DisplayTags {
    constructor(recipes) {
        // Stocke les recettes fournies à l'instance de la classe
        this.recipes = recipes;

        // Sélectionne tous les éléments avec la classe .btn-filter
        this.inputs = document.querySelectorAll('.btn-filter');

        // Sélectionne les divs pour les ingrédients, appareils et ustensiles
        this.divIngredients = document.querySelector('.filter_ingredients_container');
        this.divAppareils = document.querySelector('.filter_appareils_container');
        this.divUstencils = document.querySelector('.filter_ustencils_container');

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
            this.addTag(event.target.innerText, event.target);
        }
    }

        // Méthode pour ajouter un tag à la liste des tags.
    addTag(ingredientName, clickedElement) {
        let tagContainer;

        // Déterminez le bon conteneur de tags en fonction de l'élément cliqué.
        if (clickedElement.closest('.filter_ingredients')) {
            tagContainer = document.querySelector('.filter_ingredients_tags');
        } else if (clickedElement.closest('.filter_appareils')) {
            tagContainer = document.querySelector('.filter_appareils_tags');
        } else if (clickedElement.closest('.filter_ustencils')) {
            tagContainer = document.querySelector('.filter_ustencils_tags');
        }

        // Créez le tag et ajoutez-le au conteneur approprié.
        if (tagContainer) {
            const tag = document.createElement('div');
            tag.className = 'tag';
            tag.innerText = ingredientName;
            tagContainer.appendChild(tag);
        }
    }


    // // Affiche les tags en fonction de l'élément cliqué 
    displayTag(event) {
        // Récupère l'ID de l'élément cliqué
        const clickedElementId = event.target.id;
        let containerTag;
        // Stocke les éléments filtrés
        let filteredItems = [];  
        
        // Instancie la classe FiltersTags
        const filter = new FiltersTags(this.recipes);
        
        // Vérifie l'ID de l'élément cliqué et détermine le type de filtre à appliquer
        // Si l'ID correspond aux ingrédients :
        if (clickedElementId === 'ingredients') {
            // Affecte le container des ingrédients
            containerTag = this.divIngredients;
            // Bascule de la visibilité du div des ingrédients
            this.toggleVisibility(this.divIngredients);
            // Filtrage des ingrédients à partir des recettes
            filteredItems = filter.filteredIngredients();
        } else if (clickedElementId === 'appareils') {
            // Affecte le container des appareils
            containerTag = this.divAppareils;
            // Bascule de la visibilité du div des appareils
            this.toggleVisibility(this.divAppareils);
            // Filtrage des appareils à partir des recettes
            filteredItems = filter.filteredAppliances();
        } else if (clickedElementId === 'ustencils') {
            // Affecte le container des ustensiles
            containerTag = this.divUstencils;
            // Bascule de la visibilité du div des ustensiles
            this.toggleVisibility(this.divUstencils);
            // Filtrage des ustensiles à partir des recettes
            filteredItems = filter.filteredUstensils();
        }
    
        // Si des éléments sont filtrés et que le conteneur est visible, 
        // alors on crée un champ input et on affiche les éléments filtrés
        if (containerTag.style.display !== 'none') {
            this.createInput(containerTag);
            this.displayElements(containerTag, filteredItems);
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
    displayElements(tagContainer, elements){
        // Boucle sur chaque éléments filtré
        elements.forEach((item) => {
            // Crée un élément <p>
            const elementP = document.createElement('p');
            elementP.classList.add('elementP');
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
