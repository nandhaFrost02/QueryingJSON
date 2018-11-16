/*
 *Quering operation
 *N_Frost
*/
const stack = require('./../lib/stack');
class __stack extends stack{};
const fs = require('fs');

//Dependencies-global Object
const global = require('./../properties/global');

let operations = {};

/* select * from valid.json */
operations.queryjson = function(query,callback){ //string,callback - reurns the result of query(json file)
    var queue = new __stack(query.split(global.split));
    callback(queue.peek());
};

//file validation needs to be placed here(now it is at queryTester)

module.exports = operations;