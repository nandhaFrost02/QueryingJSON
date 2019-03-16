const global = require('./../properties/global');
const content = require('./../properties/content');
const path = require('path');
const fs = require('fs');

let conversion = {};

conversion.fileGenrator = function(parameter,fileType){
    let result ="";
    for(var i=0; i<global.jsonObject[0].length; i++){
        result += global.jsonObject[0][i];
        result += i+1>= global.jsonObject[0].length ? "\n" : parameter;
    }
    ;
    let records = convertRecords();
    for(var i=0; i<records.length; i++){
        for(var j=0; j<records[i].length;j++){
            result += records[i][j].length >= 1 ? records[i][j] : "";
            result += j+1>= records[i].length ? "\n" : parameter;
        }
    }
    try{
        fs.writeFileSync(path.join(global.currentDir,global.loadedFile+"."+fileType),result);
        console.log(result);
    }catch(e){
        console.log(content.unexpectedError(e+"while Writing"));
    }
}

function convertRecords(){//returns array
    let records = [];
    for(var i=1; i<=global.jsonObject[1];i++){//i = dataSet traverse
       for(var j=0; i==global.jsonObject[1]?j<global.jsonObject[3]:global.jsonObject[2];j++){
        records.push(global.jsonObject[5][i][j]);
       }
    }
    return records;
}

module.exports = conversion;