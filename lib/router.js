/**
 * N-Frost
 * V1.0.0
 */

const content = require('./properties/content');
const singleKey = require('./operation/singleWordOperation');
const dualKey = require('./operation/dualWordOperation');
const loadedOperation = require('./operation/loadedOperation');
const global = require('./properties/global');

let router = {};
let yts = content.buildNeeded; //yet to start
router.operation = function(incomingStr){
    let array = incomingStr.split(' ');
    if(array.length == 1){
        single_word_operation(array[0]);
    }else if(array.length == 2){
        dual_word_operation(array);
    }else if(array.length >= 3){
        loaded_operation(array);
    }
};

function single_word_operation(operation){
    switch(operation){
        case 'ls':
            singleKey.ls();
        break;
        case 'count':
        if(global.jsonObject != null){
            console.log(content.recordCount(global.jsonObject[4]));
        }else{
            console.log(content.jsonNotReady);
        }
        break;
        case 'available':
            singleKey.available();
        break;
        case 'path':
            console.log(content.currentPath(global.currentDir));
        break;    
        case 'help':
        console.log(yts);
        break;
        case 'froozen':
            console.log(content.froozen);
        break;
        /*case 'valid':
            singleKey.valid();  
        break;*/
        case 'unload':
            global.jsonObject = null;
            console.log(content.jsonEmpty);
        break;
        case '*':
        if(global.jsonObject != null){
            dualKey.select(['*']);
        }else{
            console.log(content.fileNotLoaded);
        }
        break;
        case 'all':
        if(global.jsonObject != null){
            dualKey.select(['*']);
        }else{
            console.log(content.fileNotLoaded);
        }
        break;
        case 'version':
            console.log(content.version(global.version,global.gitLink));
        break;
        default:
        console.log(content.syntaxError(operation));
        console.log(content.getHelp);            
    }
}

function dual_word_operation(array){
    switch(array.shift(0)){
        case 'validate':
            dualKey.validate(array[0]);
        break;
        case 'select':
        if(global.jsonObject != null){
            dualKey.select(array);
        }else{
            console.log(content.fileNotLoaded);
        }
        break;
        case 'load':
            dualKey.load(array[0]);
        break;
        case 'goto':
            dualKey.goto(array[0]);
        break;
        case 'cd':
            dualKey.cd(array[0]);
        break;
        case 'convert':
            global.jsonObject == null ? console.log(content.jsonNotReady): dualKey.conversion(array[0]);
        break;
        default:
            console.log(content.syntaxError(array[0]));
            console.log(content.getHelp);   
    }
}

//select where --xyz --zyx
function loaded_operation(array){
    switch(array[0]){
        case 'select':
            array.shift(0);
            secondOrderKey(array);
        break;
        default:
            console.log(content.syntaxError(array[0]));
            console.log(content.getHelp);
    }
};

function secondOrderKey(array){
    if(array[0].startsWith('--')){
        //unloaded yet to come
    }else{
        switch(array[0]){
            case 'where'://extraction operation
                array.shift(0);
                loadedOperation.extraction(array);
            break;
            case 'to':
                array.shift(0);
                loadedOperation.conversion(array);
            default:
            console.log(content.syntaxError(array[0]));
            console.log(content.getHelp);   
        }
    }
}

module.exports = router;