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
        return;
    }

}

            //Egen funktion för felmeddelanden?



async function validate(data) {
    
    console.log("Funktionen validate")

    //Felmeddelande ifall det ej finns data
    if(!data) {
        apiError.textContent = "Kunde ej hämta data";
        emptyRecipe();
        return;
    } else if (data.recipes.length === 0){
        apiError.textContent ="Hittade ej något recept. Testa gärna ett annat sökord";
        emptyRecipe();
        return;
    } else {
        showRecipe();
    }
    
    //Felmeddelande ifall det ej finns något recept
    


}


function emptyRecipe () {
    
}



form.addEventListener("submit", validateForm);
