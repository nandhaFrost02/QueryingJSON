/**
 * V1.0.2
 */

const global = require('./properties/global');
const content = require('./properties/content');
const router = require('./router');
const readline = require('readline');
 
module.exports.init = function(){
    let _interface = readline.createInterface(global.promptObject);
    console.log(content.welcome);
    _interface.prompt();
    _interface.on('line',(incomingStr)=>{
        incomingStr = incomingStr.trim();
        if(incomingStr.length > 0){
            router.operation(incomingStr);
            _interface.setPrompt(global.jsonObject != null ? global.loadedPrompt : global.unLoadedPrompt); 
            _interface.prompt();
        }else{
            _interface.prompt();
        }
    });
    _interface.on('close',()=>{
        console.log(content.promptExit);
    }); 
}