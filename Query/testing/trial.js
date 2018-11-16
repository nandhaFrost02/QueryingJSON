/*const stack = require('./../lib/stack');
class __stack extends stack{};*/

class Stack{
    constructor(items){
        this.items = items;
    };

    push(element,testing){
        this.items.push(element);
        if(testing){console.log("\x1b[32m"+this.items+"\x1b[0m");}
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

//let q = new __stack("welcome to world".split(' '));
let q = new Stack("welcome to world".split(' '));
console.log(typeof(q));
console.log(q);
console.log(q.peek());
q.push(5);
//q.pop();
console.log(q.peek());
