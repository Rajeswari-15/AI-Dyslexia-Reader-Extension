document.addEventListener("mouseup", function() {

let selectedText = window.getSelection().toString();

if(selectedText.length > 0){
    console.log("Selected Text:", selectedText); 

chrome.storage.local.set({
selectedText: selectedText
});
 

}

});
// existing text capture code stays above

chrome.runtime.onMessage.addListener(function(message){

if(message.action === "applyStyle"){

document.body.style.backgroundColor = "#f5f5dc";

document.body.style.fontSize = "18px";
document.body.style.lineHeight = "1.8";
document.body.style.letterSpacing = "1px";

// Apply to all text elements
let elements = document.querySelectorAll("p, span, div");

elements.forEach(function(el){

    el.style.fontFamily = "Verdana, Arial, sans-serif";  // 👈 ADD HERE
    el.style.lineHeight = "2";
    el.style.letterSpacing = "2px";

});

}

// RESET STYLE
if(message.action === "resetStyle"){

document.body.style.backgroundColor = "";

let elements = document.querySelectorAll("p, span, div");

elements.forEach(function(el){

    el.style.fontFamily = "";
    el.style.lineHeight = "";
    el.style.letterSpacing = "";

});

}

});