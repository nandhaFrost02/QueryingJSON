/**
 * N-Frost
 * MVP - 1.0.0
 */

//healthcheck 
try{
   const global = require('./lib/properties/global');
   global.currentDir = __dirname;
   require('./lib/cli').init();
}catch(e){
   console.log("Something went wrong \n please update the module"); 
}
