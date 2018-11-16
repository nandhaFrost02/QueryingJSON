/*
 *Validates lin/query.js file
 *N_Frost
*/
const queryvalidation = require('./../lib/query');
const fs = require('fs');

queryvalidation.queryjson("welcome to the filesrate.json",(result)=>{ //Takes a stack and return the result or shows the problems while processing
    console.log("\x1b[36m%s\x1b[0m",result);
    console.log("\x1b[36m%s\x1b[0m",typeof(result));
    fileValidation(result,(error,data)=>{
        console.log("\x1b[36mE: %s\x1b[0m",error);
        console.log("\x1b[36mD: %s\x1b[0m",data);
    });
});

function fileValidation(fileName, callback){ //return data of the file or error in callback
    fs.readFile(fileName,(error,data)=>{ //validates the presence of file
        if(error){
            console.log(error.error);
        };
        callback(error,data);
    });
};