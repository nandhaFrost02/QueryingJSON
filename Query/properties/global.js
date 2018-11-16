/*
 *All global variables are here
 *N_Frost
*/

//config file
//const config = require('./config');

//basic setup for PROMPT event
module.exports.promptObject = {
    input: process.stdin,
    output: process.stdout,
    prompt: '$'
};
//color code for prompt
module.exports.promptColor = '\x1b[32m';
//Color code for error
module.exports.errorColor = '\x1b[31m';
//Spliting the query to array
module.exports.split = ' ';
//stack-represntation
module.exports.stackColor = '\x1b[32m';