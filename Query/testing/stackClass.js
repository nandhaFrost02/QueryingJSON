/*
 *Stack operation testing
 *N_Frost
*/
const stack = require('./../lib/stack');
class __stack extends stack{};
let queue = new __stack("welcome to this world".split(' '));

console.log(queue);

/*queue.push(5);
queue.push(6);
queue.push(7);
queue.push('eigth');
queue.push('ten10\\');
*/
console.log(queue.peek());
console.log(queue.isEmpty());
console.log(queue.pop);
console.log(queue.items);

let queue1 = new __stack();
queue1.push('ten10\\');
console.log(queue1.peek());
console.log(queue1.items);