/**
 * N-Frost
 * V1.0.1
 */
const fs = require('fs');
const content = require('./../properties/content');
const global = require('./../properties/global');
const path = require('path');
var singlWordOperation = {};

singlWordOperation.ls = function(){
    try{
        let files = fs.readdirSync(global.currentDir);
        for(var i=0; i<files.length; i++){
            try{let status = fs.statSync(path.join(global.currentDir+files[i])).isFile();
                console.log(content.LS_folder(path.join(global.currentDir+files[i]),status));
            }catch(E){console.log(content.LS_folder(path.join(global.currentDir+files[i]),0))};
        }
    }catch(e){
        console.log(content.unexpectedError("PRASHING"));
    }
};

singlWordOperation.available = function(){
    try{
        let files = fs.readdirSync(global.currentDir);
        for(var i=0; i<files.length; i++){
            try{
                let status = fs.statSync(path.join(global.currentDir+files[i])).isFile();
                console.log(content.availableFiles(path.join(global.currentDir,files[i]),
                                                   global.acceptedFiles.includes(path.extname(files[i])),
                                                   status));
            }catch(E){console.log(content.LS_folder(path.join(global.currentDir+files[i]),0))};
        }        
    }catch(e){
        console.log(content.unexpectedError('parseing'));
    }
}

//unstable - catch of statsync not handled - omitted in beta release
singlWordOperation.valid = function(){
    try{
        let files = fs.readdirSync(global.currentDir);
        for(var i=0; i<files.length; i++){
            try{
                let status = fs.statSync(path.join(global.currentDir+files[i])).isFile();
                status == true ? global.acceptedFiles.includes(path.extname(path.join(global.currentDir,files[i]))): false;
            }catch(E){//yet to handle
            };
        }
    }catch(e){console.log(content.errorInPath(path.join(global.currentDir)));}
}
/**
 * try{
        let files = fs.readdirSync(global.currentDir);
        for(var i=0; i<files.length; i++){
            console.log(path.join(global.curentDir,files[i]));
        }
    }catch(e){
        console.log(content.errorInPath(global.curentDir));
    }
 */
module.exports = singlWordOperation;