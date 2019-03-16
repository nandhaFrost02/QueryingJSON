//Stable version
let header = [];

//V1.0.2 - json is already parsed and json is not empty
function arrayOfObject(unknownJSON,length){
    length = length || false;
    //unknownJSON = JSON.parse(unknownJSON);
        if(Array.isArray(unknownJSON)){
            return length ? [true,Object.keys(unknownJSON).length] : true;
        }else{
            return length ? [false,1] : false; //**HARDCODING** considering non-array of json object is single always
        }//[isArray,length]
};

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function headerRecord(arrayOfHeaders){
    if(header.length === 0){
        header = arrayOfHeaders;
    }else{
        for(key in arrayOfHeaders){
            if(!header.includes(arrayOfHeaders[key])){
                header.push(arrayOfHeaders[key]);
            }
        }
    }
    return header;
};

//including array to this code V1.0.2- stable
function recordWalker(record){//object
    let answer = [];
    headerRecord(Object.keys(record));//[]
    for(key in record){
        if(Array.isArray(record[key])){
            answer[header.indexOf(key)] = record[key];
        }else if(typeof(record[key]) !='object'){
            answer[header.indexOf(key)] = record[key];
        }else{
            answer[header.indexOf(key)] = recordWalker(record[key]);
        }
    }
    return answer;//array
};

//Unstable - V1.0.0 Always cut is made at 10% above
function bufferFinder(Object){
    let JSONLength = arrayOfObject(Object,true);
    if(JSONLength[0] == true){
        if(JSONLength[1]<=100){
            return JSONLength[1];
        }else{
            return Math.round(JSONLength[1]/100)*10;
        }
    }else{
        return JSONLength[1];
    }
}

module.exports.loadMaster = function(masterJsonObject,getData){
    getData = getData === true ? getData : false;
    let buffer = bufferFinder(masterJsonObject);
    let dataSet = {};
    let subSet = [];
    if(arrayOfObject(masterJsonObject)){
        for(arrayKey in masterJsonObject){
            subSet.push(recordWalker(masterJsonObject[arrayKey]));
            if(subSet.length >= buffer){
                dataSet[Object.size(dataSet)+1] = subSet;
                subSet = [];
            }
        }
    }else{
        subSet.push(recordWalker(masterJsonObject));
    }
    if(subSet.length > 0){
        dataSet[Object.size(dataSet)+1] = subSet;
        subSet = [];
    }
    let dataSetLength = Object.size(dataSet);
    let lastArray = dataSet[dataSetLength].length;
    return getData===true ?
    [
        header, //header record
        dataSetLength, //length of dataSet
        buffer, //bufferSize used
        lastArray, //number of records in last array
        buffer*(dataSetLength-1)+lastArray, //total number of records in given JSON
        dataSet //dataSet itself
    ] : [
        header,
        dataSetLength,
        buffer,
        lastArray,
        buffer*(dataSetLength-1)+lastArray
    ];
};