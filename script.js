// file: script.js

// SG is the object containing script globals.
var SG = {
nonError: "No errors detected.",
dataFileName: undefined,
dataFileNameDefault: "Unassigned.",
fileContent: undefined,
fileContentDefault: "JSON data expected; not retrieved as yet.",
resultsContent: undefined,
resultsContentDefault: "Results unavailable.",
errorReport: "No errors detected.",
jsonData: undefined,
// Unused- here solely to provide last comma free entry.
dummyNoCommaItem: undefined
};

//Main program logic:
function processData(){
    console.log("Data available for processing.");
}

//Helper functions:
function showFileContent(){
    var el = document.getElementById("fileContent");
    if (SG.fileContent){
        el.textContent = SG.fileContent;
    }else{
        el.textContent = SG.fileContentDefault;
    }
}

function showResults(){
    var el = document.getElementById("results");
    if (SG.resultsContent){
        el.innerHTML =  SG.resultsContent;
    }else{
        el.textContent = SG.resultsContentDefault;
    }
}

function getStringFromObject(json){
    // Specific for an array of objects.
    var collector = [];
    for (var i = 0; i<json.length; i++){
        if (i>0){
            collector.push("");
        }
        keys = Object.keys(json[i]);
        console.log(keys);
        for (var j = 0; j<keys.length; j++){
            console.log(json[i][keys[j]]);
            collector.push(keys[j] + ": " + json[i][keys[j]]);
        }
    }
    return collector.join("<br>");
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
// NOT BEING USED!- needs debugging.
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
//Retrieve the first (and only!) file from the FileList object,
//and put its content into SG.fileContent and display it.
    var f = evt.target.files[0]; 

    if (f) {
        var r = new FileReader();
        r.onload = function(e){
            var content = e.target.result;
            //Capture the file content.
            SG.fileContent = content;
            //Display the file content.
            showFileContent();
            //^^^Content of the file assigned to this global.
            console.log("File content has been assigned.");
       }
       r.readAsText(f);
    }else{ 
      SG.fileContent = undefined;
      showFileContent;
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
    try{
        var json = JSON.parse(SG.fileContent);
    }
    catch(e){
        if (e instanceof SyntaxError){
            SG.errorReport = "SyntaxError occurred.";
            console.log("Parsing error occurred.");
            SG.jsonData = undefined;
            SG.results = undefined;
            showResults();
            return false;
        }else{throw(e);}
    } //End of catch statement.
    console.log("Parsing seems to be fine.");
    SG.errorReport = undefined;
    SG.jsonData = json;
    SG.resultsContent = getStringFromObject(json);
    showResults();
    return true;
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
        processData();
    }else{
        reportError();
    }
}

