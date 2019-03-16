const global = require('./../properties/global');
const content = require('./../properties/content');
const objectParse = require('./../backend/objectParse');
const display = require('./../backend/display');
const conversion = require('./../backend/conversion');
const path = require('path');
const fs = require('fs');
let dualKey = {};

//validate
dualKey.validate = function(string){
    string = string.replace('--','');
    string.indexOf(':\\') >= 1 || string.indexOf(":/") >=1 ? string : string = path.join(global.currentDir,string);
    try{
        JSON.parse(fs.readFileSync(string));
        console.log(content.validateState(string,true));
    }catch(e){
        console.log(e);
        console.log(content.parseError(string,false));
    }
}

//Goto
dualKey.goto = function(string){
    string = string.replace('--','');
    string.indexOf(':\\') >= 1 || string.indexOf(":/") >=1 ? string : string = path.join(global.currentDir,string);
    if(fs.existsSync(string)){
        global.currentDir=string;
        console.log(content.gotoUpdate(true)+"\n"+global.currentDir);
    }else{
        console.log(content.gotoUpdate(false)+"\n"+global.currentDir);
    }
}

//CD
dualKey.cd = function(string){
    string = string.replace('--','');
    string.indexOf(':\\') >= 1 || string.indexOf(":/") >=1 ? string : string = path.join(global.currentDir,string);
    if(fs.existsSync(string)){
        global.currentDir=string;
        console.log(content.gotoUpdate(true)+"\n"+global.currentDir);
    }else{
        console.log(content.gotoUpdate(false)+"\n"+global.currentDir);
    }
}


//specific for * and all
dualKey.select = function(array){
    if(array.length == 1){
        switch(array[0]){
            case '*':
                displayAll();
            break;
            case 'all':
                displayAll();
            break;
            default:
                console.log(content.syntaxError(array[0]));
        }
    }
}

function displayAll(){
    let records = [];
    for(var i=1; i<=global.jsonObject[1];i++){//i = dataSet traverse
       for(var j=0; i==global.jsonObject[1]?j<global.jsonObject[3]:global.jsonObject[2];j++){
        records.push(global.jsonObject[5][i][j]);
       }
    }
    console.log(display.display(global.jsonObject[0],records));//code print
}

//load
dualKey.load = function(fileName){
    fileName = fileName.replace('--','');
    fileName.indexOf(':\\') >= 1 || fileName.indexOf(":/") >=1 ? fileName : fileName = path.join(global.currentDir,fileName);
    if(fs.existsSync(fileName)){
        if(global.acceptedFiles.includes(path.extname(fileName))){
            try{
                global.jsonObject = objectParse.loadMaster(JSON.parse(fs.readFileSync(fileName)),true);
                global.loadedPrompt = path.basename(fileName,path.extname(fileName))+'>';
                global.loadedFile = path.basename(fileName,path.extname(fileName));
            }catch(e){
                console.log(content.parsingError);
            }
        }else{
            console.log(content.unknownFileFormat);
        }
    }else{
        console.log(content.fileNotAvailable(fileName));
    }
}

//conversion logic
dualKey.conversion = function(string){
    console.log(string);
    switch(string){
        case'tsv':
            conversion.fileGenrator("\t",string);
        break;
        case 'csv':
            conversion.fileGenrator(",",string);
        break;
        default:
        console.log(content.syntaxError(string+" ~ conversion not/yet to build"));    
    }
}

module.exports = dualKey;

/**
 * header, //header record
 * dataSetLength, //length of dataSet
 * buffer, //bufferSize used
 * lastArray, //number of records in last array
 * buffer*(dataSetLength-1)+lastArray, //total number of records in given JSON
 * dataSet //dataSet itself
 */