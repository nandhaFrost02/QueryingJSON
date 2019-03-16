/**
 * V1.0.0
 */
const display = require('./../backend/display');
const global = require('./../properties/global')
const content = require('./../properties/content');
let loadedOperation = {};

loadedOperation.extraction = function(array){
//let extraction = function(array){    
    let result = "";
    if(array[0].startsWith('--')){
        result += array[0].replace('--','');
        for(var i=1; i<array.length; i++){
            result += "";
        }
    }else{
        console.log(content.syntaxError(array[0]));
        return -1;
    }
    displayAll(result);
};

/**
 * header, //header record
 * dataSetLength, //length of dataSet
 * buffer, //bufferSize used
 * lastArray, //number of records in last array
 * buffer*(dataSetLength-1)+lastArray, //total number of records in given JSON
 * dataSet //dataSet itself
 */
function displayAll(condition){
    let records=[];
    console.log("replaced fieldCount"+condition);
    for(var i=1; i<=global.jsonObject[1];i++){//i = dataSet traverse
       for(var j=0; i==global.jsonObject[1]?j<global.jsonObject[3]:global.jsonObject[2];j++){
            let internalStatus = evaluate(global.jsonObject[5][i][j],condition);
            if(internalStatus == true || internalStatus == false){
                internalStatus == true ? records.push(global.jsonObject[5][i][j]): false;
            }else if(internalStatus <= -1){
                status = false;
                return -1;
            }
        }
    }
    console.log(display.display(global.jsonObject[0],records));//code print
}

function evaluate(array,condition){
    for(var i=0; i<global.jsonObject[0].length;i++){
        condition = condition.replace(global.jsonObject[0][i],array[i]);
    }
    try{
        return eval(condition);
    }catch(e){//catch in eval is error in syntax
        console.log(content.syntaxError('unknown'));
        return -1;
    }
}
/*
global.jsonObject = [
    ['this','is','header','for','test'],
    1,
    1,
    1,
    1,
    {'1':['1','2','3','4','5']}
];
*/
module.exports = loadedOperation;
