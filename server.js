/********************************************************************************
* WEB322 – Assignment 03
* 
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
* 
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
* Name: __Donghua Feng___ Student ID: __162557193___ Date: __Mar 19,2024___
*
* Published URL: ___________________________________________________________
*
********************************************************************************/
const { error } = require("console");
const legoData = require("./modules/legoSets");
const express = require('express');
const app = express();
const path = require('path');
// Assign port
const HTTP_PORT = process.env.PORT || 8080;

// Initialize the lego set
legoData.initialize().then(() => {});
app.use(express.static('public'));

// Homepage route
app.get('/', (req, res) => { 
    res.sendFile(path.join(__dirname, "views", "home.html"));
});

// About route
app.get('/about',(req, res)=>{
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

// Sets route
app.get("/lego/sets", (req, res) => {
    const theme = req.query.theme; 
    if (theme) {
        legoData.initialize().then(() => {
            legoData.getSetsByTheme(theme).then((legoSets)=> {
                res.send(legoSets); 
            });
        });
    }else {
        legoData.initialize().then(() => {
            legoData.getAllSets().then((legoSets)=> {
                res.send(legoSets); 
            });
        }); 
    }
}); 

// set_num route
app.get("/lego/sets/:set_num", (req, res) => {
    legoData.initialize().then(() => {
        legoData.getSetByNum(req.params.set_num).then((setNum=> {
            res.send(setNum); 
        })).catch((err) => {
            res.send(err); 
        }); 
    }); 
  }); 

// Theme route
app.get('/lego/sets/theme-demo', (req, res) => { 
    // Sending the request to get the set by theme
    const theme = req.query.theme;
    if (theme) {
        legoData.getSetsByTheme(theme).then(themeSets => {
            res.json(themeSets);
        }).catch(error => { 
            res.status(404).send(error); 
        });
    }else {
        legoData.getAllSets().then(legoSet => {
            res.json(legoSet);
        }).catch(error => { 
            res.status(500).send(error); 
        });
    }
});

// 404 route 
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '/views/404.html'));
});

app.listen(HTTP_PORT, () => console.log(`server listening on: http://localhost:${HTTP_PORT}`)); // Start the server

// http://localhost:8080/lego/sets
// http://localhost:8080/lego/sets/num-demo
// http://localhost:8080/lego/sets/theme-demo
