"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Kajsa Widén
 */

//Hämtar element från DOM
const form = document.querySelector("#searchform");
const searchFood = document.querySelector("#search");
const button = document.querySelector("#searchbutton");

const recipe = document.querySelector("#recipe");

const searchError = document.querySelector("#error");
const apiError = document.querySelector("#message");


//Validerar sökinnehållet
function validateForm (event) {
    //Hindrar formuläret från att skickas
    event.preventDefault();

    //läser in värdet från formuläret
    const search = searchFood.value.trim();
    
    //Kontrollerar om det står något i formuläret + eventuell meddelande
    if (search === "") {
        searchError.textContent = "Du måste fylla i en sökfras";
        return;
    } else {
        searchError.textContent = "";
    }

    callApi();
}



async function callApi () {
    //läser in värdet från formuläret
    const search = searchFood.value;    
    
    try {
        //Hämtar information från APIn
        const response = await fetch (`https://dummyjson.com/recipes/search?q=${search}`);

        //Kollar om APIn ger response
        if(!response.ok){
            throw new Error(`Ett fel inträffade: ${response.status}`);
        }
    
        //Översätter koden från JSON till JavaScript
        const data = await response.json();
        validateApi(data);

    } catch (error) {
        apiError.textContent = "Något gick fel, vänligen försök igen senare";
        console.log(`Ett fel inträffade: ` + error);
        emptyRecipe();
        return;
    }

}


function validateApi(data) {

    if(!data) {
        //Felmeddelande ifall det ej finns data
        apiError.textContent = "Kunde ej hämta data";
        emptyRecipe();
        return;
    } else if (data.recipes.length === 0){
        //Felmeddelande ifall det ej finns något recept
        apiError.textContent ="Hittade ej något recept. Testa gärna ett annat sökord";
        emptyRecipe();
        return;
    } else {
        //Tar bort eventuell felmeddelande
        apiError.textContent = "";
        
        //Visar receptet
        showRecipe(data);
    }

}



function showRecipe(data) {

    //Tömmer förra receptet
    emptyRecipe();

    //Väljer enbart ut recept nummer 1
    const recipeData = data.recipes[0];

    //Skriver ut titel och bild till DOM
    recipe.innerHTML = `
    <h3>${recipeData.name}</h3>
    <img src="${recipeData.image}" alt="${recipeData.name}"></img> `;

    //Gör ett nytt element i HTML, och lägger den inuti recipeInfo
    const recipeInfo = document.createElement("div");
    recipeInfo.classList.add("recipe-info");
    recipe.appendChild(recipeInfo);

    //Skriver ut receptInfo till DOM
    recipeInfo.innerHTML = `
    <p>Servings: ${recipeData.servings} </p>
    <p>Prep time: ${recipeData.prepTimeMinutes} </p>
    <p>Cooking time: ${recipeData.cookTimeMinutes} </p>
    <p>Difficulty: ${recipeData.difficulty} </p> `;


    //Gör ett nytt element i HTML, och lägger den inuti recipeInfo
    const ingredientList = document.createElement("div");
    recipe.appendChild(ingredientList);
    
    //Skriver ut ingredienserna i DOM
    ingredientList.innerHTML = `<h4>Ingredients</h4>`;
    for (let i = 0; i < recipeData.ingredients.length; i++) {
        ingredientList.innerHTML += `<ul><li>${recipeData.ingredients[i]}</li></ul>`;
    }


    //Gör ett nytt element i HTML, och lägger den inuti recipeInfo
    const instructionList = document.createElement("div");
    recipe.appendChild(instructionList);

    //Skapar en list-element
    const ol = document.createElement("ol");

    //Skriver ut instroktionerna i DOM
    instructionList.innerHTML = `<h4>Instructions</h4>`;
    for (let i = 0; i < recipeData.instructions.length; i++) {
        
        const li = document.createElement("li");
        li.textContent = recipeData.instructions[i];
        ol.appendChild(li);
        
    }
    instructionList.appendChild(ol);

}


function emptyRecipe () {
    recipe.textContent = "";
}



form.addEventListener("submit", validateForm);
