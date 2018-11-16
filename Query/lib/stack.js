/*
 *Class Stack
 *N_Frost
*/
//Global Dependencies
const global = require('./../properties/global');
//Blocking code
class Stack{
    constructor(items){
        this.items = items;
    };

    push(element){
        this.items.push(element);
    };
    pop(){
        if(this.items.length == 0){
            return false;
        }else{
            this.items.pop();
            return true;
        }
    };

    peek(){
        return this.items[this.items.length - 1];
    };

    isEmpty(){
        return this.items.length == 0;
    };

    printStack(){
        return this.items;
    };


};

module.exports = Stack;