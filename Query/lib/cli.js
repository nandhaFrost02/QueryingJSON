/*
 *Querying JSON
 *N_Frost
*/

//Dependencies - REPL event
const readline = require('readline');
const events = require('events');
const stack = require('./../lib/stack');
const stack = require('./query');//last addition to main family
class __events extends events{};
class __stack extends stack{};
const e = new __events();

//Dependencies-global Object
const global = require('./../properties/global');

//object to export
let cli ={};
//object for internal operation
let internal = {};

//PROMPT event
cli.init = function(){
    console.log(global.promptColor+"QUERY json like u do in SQL -- happy coding!!!");
	var _interface = readline.createInterface(global.promptObject);
	_interface.prompt();
	_interface.on('line',(inComingStr)=>{
        inComingStr = inComingStr.trim(); //pre-processing the string
        if(inComingStr.length > 0){
            internal.querying(inComingStr,(stack)=>{
                console.log("stacking : "+stack);  //getting the query return(expected object as of now)
            });
        }else{
            console.log(global.errorColor+"INVALID"+global.promptColor); //Empty string
        }
		_interface.prompt(); //restarting the prompt
	});
	_interface.on('close',()=>{console.log('\x1b[0m');process.exit(0);}); //exiting the prompt
};

//Query in pushed into stack and operated
internal.querying = function(queryString,callback){
    let queue = new __stack(queryString.split(global.split)); //stack is created with queryString
    console.log(queue); //expected to process the queryString using query.js file
};

//object exported
module.exports = cli;