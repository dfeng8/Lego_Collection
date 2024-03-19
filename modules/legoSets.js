/********************************************************************************
* WEB322 – Assignment 02
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
*
* Name: __Donghua Feng__ Student ID: __162557193__ Date: __Feb 12, 2024__
*
********************************************************************************/

const setData = require("../data/setData.json");
const themeData = require("../data/themeData.json");

let sets = []; 

// The initialize()
function initialize() { 
    return new Promise((resolve, reject) => {
        try{
            setData.forEach(set => {
                let theme = themeData.find(theme => theme.id === set.theme_id);
                let themeName = theme ? theme.name : "Unknown";
                sets.push({...set, theme: themeName});
            });
            resolve(); 
        } catch (error){
            reject("Initialization failed: " + error);
        }
    });

    
}

// The getAllSets()
function getAllSets() {
    // resolve the Promise
    return new Promise((resolve) => resolve(sets)); 
}

// The getSetByNum()
function getSetByNum(setNum) {
    return new Promise((resolve, reject) => {
        let numSet = sets.find(set => set.set_num === setNum);

        // If true, resolve the Promise. Otherwise, reject the Promise
        numSet ? resolve(numSet) : reject("unable to find requested sets by num");
    });
}

// The getSetsByTheme()
function getSetsByTheme(theme) {
    return new Promise((resolve, reject) => {
        let themeSets = sets.filter((set) => set.theme.toLowerCase().includes(theme.toLowerCase()));

        // If the length > 0, resolve the Promise. Otherwise, reject the Promise
        themeSets.length > 0 ? resolve(themeSets) : reject('Unable to find requested sets by theme');
    });
}

module.exports = { initialize, getAllSets, getSetByNum, getSetsByTheme };
