//Stable version V1.0.3 -added dashes and ~ for end line
//complexity more than 1 depth is handled
//This function just takes inputs and displays them
const global = require('./../properties/global');
let recordSpace = global.recordSpace;
let endLine = "\n";

module.exports.display = function(header,details){//array,array
    let result = "";    
    let headerLine = headerGenerator(header);
    let dashes = headerLine[1];
    result += headerLine[0];
    for(var i=0; i<details.length; i++){
        result += recordGenerator(details[i],Array.recordIncludesArray(details[i]));
        result += dashes+endLine;
    }
    return result;//string
}

//generates records
function recordGenerator(record,position){//array,number
    let result = "";
    if(position >=0){
        let innerArrayLength = record[position].length;
        var i = 0;
        while(i < innerArrayLength){
            if(i == innerArrayLength/2){
                for(var j=0; j<record.length;j++){
                    result += j == position ? spaceAppend(record[j][i]) : spaceAppend(record[j]);
                }
                result += "~\n";
            }else{
                result += arrayFiller(record[position][i],record.length,position)+"~\n";
            }
            i += 1;
        }
    }else{
        for(var i=0; i<record.length;i++){
            result += spaceAppend(record[i]);
        }
        result += "~\n";
    }
    return result;
}
//field validation V1.0.0 - unstable - returns string
//handled types - object/array/string/number
function fieldLimitation(value){
    if(typeof(value)=='object'){
       return Array.isArray(value) == true ? '[ARRAY]' : '{OBJECT}';
    }else{
        return value+"";
    }
}
//generates pre and post filler for record
function arrayFiller(arrayValue,recordLength,position){//string,number,number
    let result = "";
    console.log(recordLength+" "+position+" ");
    result += emptySpace(position)+spaceAppend(arrayValue)+emptySpace(recordLength-(position+1));
    return result;
}

//generates first two lines V1.0.2 - added "|"
function headerGenerator(header){//array
    let result ="";
    let dashes = "";
    for(var i=0; i<header.length; i++){
        result += spaceAppend("|"+header[i]);
        dashes += spaceAppend("",true);
    }
    return [dashes+"\n"+result+"|\n"+dashes+endLine,dashes]; //string of two lines
}

//appends space after text
function spaceAppend(string,dashes){
    dashes = dashes == true ?true : false;
    string = fieldLimitation(string);
    if(string.length > recordSpace){
        return string.slice(0,recordSpace-3)+".. ";
    }else{
    if(dashes){
            return string+"-".repeat(recordSpace-string.length);
        }else{
            return string+" ".repeat(recordSpace-string.length);
        }
    }
}

//adds empty spaces up-to specified index
function emptySpace(index,dashes){
    dashes = dashes == true ? true : false;
    let result ="";
    while(index > 0){
        result += dashes== false ? spaceAppend("") : spaceAppend("",true);
        index--;
    }
    return result;
}

//returns index of Record-array that has array
Array.recordIncludesArray = function(array){
    for(var i=0; i<array.length;i++){
        if(Array.isArray(array[i])){
            return i;
        }
    }
    return -1;
}