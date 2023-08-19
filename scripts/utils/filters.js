// Génère des listes filtrées à partir des recettes
class FiltersTags {
    // Constructeur: Prend en entrée les recettes à traiter.
    constructor(recipes){
        this.recipes = recipes;
    }

    // Méthode privée(underscore) '_filterUnique' générique pour filtrer les éléments uniques d'une propriété donnée des recettes.
    // Peut traiter à la fois les propriétés de niveau supérieur (comme "appliance") et les sous-propriétés (comme "ingredient" dans "ingredients").
    // 'null' signifie la valeur par défut de  'subAttribute'. 
    // Si pas de second argument fournis pour l'appel de la mnéthode, subAttribute serau automatiquement sur 'null'
    _filterUnique(attribute, subAttribute = null) {
        // Stockage temporaire pour tous les éléments(ingrédients, appareils, ustensiles)
        let allItems = []; 
        
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
        
        // Retourner un tableau sans doublons
        return [...new Set(allItems)];
        
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









// // Génère des listes filtrées à partir des recettes
// class FiltersTags {
//     constructor(recipes){
//         this.recipes = recipes;
//     }

//     // Méthode pour filtrer les ingrédients uniques à partir des recettes
//     filteredIngredients() {
//         // Stock temporairement tous les ingrédients
//         let allIngredients = [];
//         // Stock les ingrédients uniques
//         let uniqueIngredient;

//         // Boucle sur chaque recette
//         for (let i = 0; i < this.recipes.length; i++) {
//             // Boucle sur chaque ingrédient de la recette
//             for (let j = 0; j < this.recipes[i].ingredients.length; j++){
//                 // Ajoute l'ingrédient à la liste temporaire
//                 allIngredients.push(this.recipes[i].ingredients[j].ingredient);
//                 // Elimine les doublons en créant un nouveau tableau
//                 uniqueIngredient = [... new Set(allIngredients)];
//             }    
//         }    
//     }


//     // Méthode pour filtrer les appareils uniques à partir des recettes
//     filteredAppliances() {
//         // Stock temporairement tous les appareils
//         let allAppliances = [];
//         // Stock les appareils uniques
//         let uniqueAppliance;
        
//         // Boucle sur chaque recette
//         for (let i = 0; i < this.recipes.length; i++){
//             // Ajoute l'appareil à la liste temporaire
//             allAppliances.push(this.recipes[i].appliance);
//             // Elimine les doublons en créant un nouveau tableau
//             uniqueAppliance = [... new Set(allAppliances)];
//         }    
//     }


//         // Méthode pour filtrer les Ustensiles uniques à partir des recettes
//         filteredUstensils() {
//             // Stock temporairement tous les Ustensiles
//             let allUstensils = [];
//             // Stock les ustensiles uniques
//             let uniqueUstensil;
    
//             // Boucle sur chaque recette
//             for (let i = 0; i < this.recipes.length; i++) {
//                 // Boucle sur chaque ustensile de la recette
//                 for (let j = 0; j < this.recipes[i].ustensils.length; j++){
//                     // Ajoute l'ustensile à la liste temporaire
//                     allUstensils.push(this.recipes[i].ustensils[j]);
//                     // Elimine les doublons en créant un nouveau tableau
//                     uniqueUstensil = [... new Set(allUstensils)];
//                 }    
//             }    
//         }
    
// };

// // Export de la class FiltersTags pour pouvoir l'utiliser dans le init() de index.js
// export {FiltersTags};