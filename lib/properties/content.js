const content = {};

//lib/cli
content.welcome = "***FROOZEN_SOLUTIONS***CLI for handling json file";
content.invalidEntry = "please, entry valid key";
content.promptExit = "exting prompt";
content.buildNeeded = "yet to start";
//operation/dualwordoperation
content.parsingError = "error in parsing";
content.unknownFileFormat = "unknown file format";
content.loadedSuccessfully = "data loaded successfully";
content.syntaxError = function(unexpectedWord){
    return "unexpected keyWord "+unexpectedWord.toUpperCase();
}
content.unexpectedError = function(unexpectedWord){
    return "unexpected error at "+unexpectedWord.toUpperCase();
}
content.fileNotLoaded = "File not loaded";
content.recordCount = function(count){
    return "Total Number of records : "+count;
}
content.jsonNotReady = "please load file before using this";
content.errorInPath = function(path){
    "ERROR: handling path :"+path;
}
content.getHelp = "Enter 'HELP' to get information";

//Froozen
content.froozen = "Froozen product #1";

//singleWordOperations
content.LS_folder = function(path,isfile){
    return typeof(isfile) == 'number' ? path+" no access" : isfile == true ? path+" is file":path+"is folder";//color will be handled later
}
content.availableFiles = function(path,isAccepted,isFile){
    return isFile == false ? path+" is folder" : isAccepted == true ? path+" is available" : path+" not aviable";
}
content.validateState = function(path,status){
    return status == true ? path+" is valid" : "Error prasing "+path.toUpperCase();
}
content.gotoUpdate = function(status){
   return status == true ? "path got updated":"not a valid path";
}
content.jsonEmpty = "json has been unloaded";
content.currentPath = function(path){
    return "current path is "+path.toUpperCase();
}
content.fileNotAvailable = function(path){
    return "file not available :"+path.toUpperCase();
}
content.version = function(information,gitLink){
    return "version : "+information+"\nOpenSourced by FroozenSolutions \nThanks for trying this CLI, Please do check for updates we are evolving often.\nDeveloped by NandhaFrost from FroozenSolutions\nGit-Link:"+gitLink+"\nfeel free to pull and modify the code";
}
module.exports = content;