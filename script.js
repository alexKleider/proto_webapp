// file: script.js

// SG is the object containing script globals.
var SG = {
    // For the file reading code:
    nonError: "No errors detected.",
    dataFileName: "Unassigned as yet.",
    fileContent: "JSON data expected; not retrieved as yet.",
    errorReport: "No errors detected.",
    jsonData: {},
    // Unused- here solely to provide last comma free entry.
    dummyNoCommaItem: undefined
    };

//Helper functions:
function showFileContent(){
    var contentElement = document.getElementById("fileContent");
    contentElement.textContent = SG.fileContent;
}

function getStringFromObject(collection){
    var collector = [];
    for (var key in collection){
        collector.push(key + ": " + collection[key]);
    }
    return collector.join("\n");
}

// Typical button triggered function:
function update(){
    // Toggles textContent of area with id="magic".
    var para = document.getElementById("magic");
    if (para.textContent == "New paragraph content."){
        para.textContent = "Same old stuff.";
    }else{
        para.textContent = "New paragraph content.";
    }
}

// File Reading Code:

// Wrapper function /w check for File API support.
// Not being used- needs debugging.
function getFileContent(evt){
    if (window.File &&
        window.FileReader &&
        window.FileList &&
        window.Blob) {
        //do your stuff!
            readSingleFile(evt);
            showFileContent();
            console.log("File working.");
        } else{
            console.log("File NOT working.");
            alert(
    'The File APIs are not fully supported by your browser.');
        }
}

/*Following is modified version of code in filereading.html
http://www.htmlgoodies.com/beyond/javascript/read-text-files-using-the-javascript-filereader.html#fbid=xlR81ky9SGr
Requires only the following html:
<input type="file" id="fileinput" />
AND a global container SG.fileContent into which the file 
content is stored.  */

function readSingleFile(evt) {
//Retrieve the first (and only!) File from the FileList object
//and put its content into SG.fileContent.
    var f = evt.target.files[0]; 

    if (f) {
        var r = new FileReader();
        r.onload = function(e){
            var content = e.target.result;
            SG.fileContent = content;
            showFileContent();
            //^^^Content of the file assigned to this global.
            console.log("File content has been assigned.");
       }
       r.readAsText(f);
    }else{ 
      alert("Failed to load file");
      console.log("Failed to load file");
    }
}
//Next line of code sets the event listener.
//If this isn't done, the <input type="file"> element
//will allow file selection but nothing will be done 
//with the file or its content.
document.getElementById('fileinput').addEventListener('change',
                                        readSingleFile, false);
// End of modified code taken from filereading.html.

function dataOk(){
    // Data is expected to be json text.
    var container = document.getElementById("results");
    container.textContent = SG.fileContent;
    console.log("File content has been put onto the page.");
    try{
    var json = JSON.parse(SG.fileContent);
    console.log("Parsing seems to be fine.");
    }
    catch(e){
        if (e instanceof SyntaxError){
            SG.errorReport = "SyntaxError occurred.";
            console.log("Parsing error occurred.");
            return false;
        }else{throw(e);}
    }
    console.log("File content has been parsed.");
    SG.jsonData = json;
    for (key in json){
        console.log(getStringFromObject(json[key]));
        }
    console.log(getStringFromObject(json));
    console.log("The json[0] part is " + json[0]);
    return true;
}

function showData(){
    var dataElement = document.getElementById("results");
    dataElement.textContent = (
            "Result should be JSON: " + String(SG.jsonData));
//          "Item 2, date value is " + SG.jsonData[2]["date"]);
//          "Result should be JSON: " + SG.jsonData);
}

function clearError(){
    SG.errorReport = SG.nonError;
}

function reportError(){
    var results = document.getElementById("results");
    results.textContent = SG.errorReport;
}

function calculate(){
    showFileContent();
    if (dataOk()){
        showData();
    }else{
        reportError();
    }
}

// to do:
// git remote add origin \
// https://github.com/alexKleider/utilCalc_webapp.git
// git push -u origin master
