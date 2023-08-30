import { arrayrecipes } from "../features/displayRecipes.js";

// Génère des listes filtrées à partir des recettes
class FiltersTags {
    // Constructeur: Prend en entrée les recettes à traiter.
    constructor(recipes){
        this.recipes = recipes;
    }

    allUniqueItem;
    // Méthode privée(underscore) '_filterUnique' générique pour filtrer les éléments uniques d'une propriété donnée des recettes.
    // Peut traiter à la fois les propriétés de niveau supérieur (comme "appliance") et les sous-propriétés (comme "ingredient" dans "ingredients").
    // 'null' signifie la valeur par défaut de  'subAttribute'. 
    // Si pas de second argument fournis pour l'appel de la mnéthode, subAttribute serau automatiquement sur 'null'
    _filterUnique(attribute, subAttribute = null) {
        // Stockage temporaire pour tous les éléments(ingrédients, appareils, ustensiles)
        let allItems = []; 

        if(arrayrecipes.length >= 1){
            for (let i = 0; i < arrayrecipes.length; i++){
                for (let j = 0; j < arrayrecipes[i].length; j++){
                    for(let recipe of arrayrecipes[i]){
                        if (subAttribute) {
                            // item = un ingrédient, oú un appareil, oú un ustensile
                            for (let item of recipe[attribute]) {
                                allItems.push(item[subAttribute]);
                            } 
                        } else {
                            // Sinon, traiter la propriété principale
                            allItems.push(recipe[attribute]);
                        }
                    }
                }                
            }
        }else {
            // Parcourir chaque recette
            for (let recipe of this.recipes) {
                // Si une sous-propriété est spécifiée, la traiter
                if (subAttribute) {
                    // item = un ingrédient, oú un appareil, oú un ustensile
                    for (let item of recipe[attribute]) {
                        allItems.push(item[subAttribute]);
                    }
                } else {
                    // Sinon, traiter la propriété principale
                    allItems.push(recipe[attribute]);
                }
            }
        }


        // Met à plat le tableau ustensiles
        if (attribute === 'ustensils') {
            allItems = allItems.flat();
        }

        // Retourner un tableau sans doublons
        this.allUniqueItem = [...new Set(allItems)]
        return this.allUniqueItem;
        
    }

    // Méthode pour filtrer les ingrédients uniques à partir des recettes.
    filteredIngredients() {
        return this._filterUnique('ingredients', 'ingredient');
    }

    // Méthode pour filtrer les appareils uniques à partir des recettes.
    filteredAppliances() {
        return this._filterUnique('appliance');
    }

    // Méthode pour filtrer les ustensiles uniques à partir des recettes.
    filteredUstensils() {
        return this._filterUnique('ustensils');
    }

}


// Exporter la classe FiltersTags pour pouvoir l'utiliser ailleurs dans le code.
export {FiltersTags};
