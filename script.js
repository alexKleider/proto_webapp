// file: script.js

// SG is the object containing script globals.
var SG = {
    // For the file reading code:
    dataFile: "json.txt",
    fileContent: "json data expected",
    // Unused- only here to provide last comma free entry.
    dummyNoCommaItem: undefined
    };

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
function getFileContent(evt){
    if (window.File &&
        window.FileReader &&
        window.FileList &&
        window.Blob) {
        //do your stuff!
            readSingleFile(evt);
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
*/

function readSingleFile(evt) {
//Retrieve the first (and only!) File from the FileList object
//and put its content into SG.fileContent.
    var f = evt.target.files[0]; 

    if (f) {
        var r = new FileReader();
        r.onload = function(e){
            var content = e.target.result;
            SG.fileContent = content;
            //^^^Content of the file assigned to this global.
       }
       r.readAsText(f);
    }else{ 
      alert("Failed to load file");
      console.log("Failed to load file");
    }
}
//Must set the event listener to activate file reading button.
document.getElementById('fileinput').addEventListener('change',
                                        readSingleFile, false);
<!--End of modified code taken from filereading.html.-->

function processData(){
    // Data is expected to be json text.
    var container = document.getElementById("resultsPage");
    container.textContent = SG.fileContent;
}

