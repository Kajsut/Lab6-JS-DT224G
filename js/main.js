"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Kajsa Widén
 */

/**
 *  1   Validera sökfältet om tomt
 *          -Annars felmeddelande
 *  2   Läs in sökfältet -- https://dummyjson.com/recipes/search?q=SÖKFRAS
 *          -Ta bort eventuell felmeddelande
 *  3   Om ej finns- Meddelande om detta + ta bort eventuell gammal recept
 *  4   Om finns- Konventera från JSON till JavaScript, enbart [0]
 *  5   Visa receptet på DOM, info "visa recept"
 *  6   Felhantering vid API
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
    console.log("callApi...")
    
    //läser in värdet från formuläret
    const search = searchFood.value;    
    
    try {
        //Hämtar information från APIn
        const response = await fetch (`https://dummyjson.com/recipes/search?q=${search}`)
        console.log(response);

        //Kollar om APIn ger response
        if(!response.ok){
            throw new Error(`Ett fel inträffade: ${response.status}`)
        }
    
        //Översätter koden från JSON till JavaScript
        const data = await response.json();
        console.log(data);

        validate(data);

    } catch (error) {
        console.log(error);
        emptyRecipe();
        return;
    }

}


function validate(data) {
    
    console.log("Funktionen validate")

    
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

    console.log("Funktionen showRecipe")

    //Tömmer förra receptet
    emptyRecipe();

    //Väljer enbart ut recept nummer 1
    const recipeData = data.recipes[0];
    console.log(recipeData);

    //Skriver ut titel och bild till DOM
    recipe.innerHTML = `
    <h3>${recipeData.name}</h3>
    <img src="${recipeData.image}" alt="${recipeData.name}"></img> `

    //Gör ett nytt element i HTML, och lägger den inuti recipeInfo
    const recipeInfo = document.createElement("div");
    recipeInfo.classList.add("recipe-info");
    recipe.appendChild(recipeInfo);

    //Skriver ut receptInfo till DOM
    recipeInfo.innerHTML = `
    <p>Servings: ${recipeData.servings} </p>
    <p>Prep time: ${recipeData.prepTimeMinutes} </p>
    <p>Cooking time: ${recipeData.cookTimeMinutes} </p>
    <p>Difficulty: ${recipeData.difficulty} </p> `


    //Gör ett nytt element i HTML, och lägger den inuti recipeInfo
    const ingredientList = document.createElement("div");
    ingredientList.classList.add("ingredientList");
    recipe.appendChild(ingredientList)
    
    //Skriver ut ingredienserna
    ingredientList.innerHTML = `<h4>Ingredients</h4>`
    for (let i = 0; i < recipeData.ingredients.length; i++) {
        ingredientList.innerHTML += `<li>${recipeData.ingredients[i]}</li>`
    }

}


function emptyRecipe () {
    
}



form.addEventListener("submit", validateForm);
