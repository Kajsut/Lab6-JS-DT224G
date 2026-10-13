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
const search = document.querySelector("#search");
const button = document.querySelector("#searchbutton");

const recipe = document.querySelector("#recipe");

const searchError = document.querySelector("#error");
const apiError = document.querySelector("#message");