document.addEventListener("DOMContentLoaded", function () {

    const output = document.getElementById("output");
    const readBtn = document.getElementById("read");
    const stopBtn = document.getElementById("stop");
    const clearBtn = document.getElementById("clear");
    const styleBtn = document.getElementById("style");
    const resetBtn = document.getElementById("reset");

    let currentText = "";

    // Load stored text
    chrome.storage.local.get(["selectedText"], function(result) {

        if(result.selectedText){
            currentText = result.selectedText;
            output.textContent = currentText;
        }

    });

    // 🔊 Read text
    readBtn.addEventListener("click", function(){

        if(currentText.length > 0){

            const speech = new SpeechSynthesisUtterance(currentText);
            speech.rate = 0.9;
            speech.pitch = 1;

            window.speechSynthesis.speak(speech);

        } else {
            alert("No text selected!");
        }

    });

    // ⏹ Stop reading
    stopBtn.addEventListener("click", function(){
        window.speechSynthesis.cancel();
    });

    // 🧹 Clear text
    clearBtn.addEventListener("click", function(){

        currentText = "";
        output.textContent = "No text selected";

        chrome.storage.local.remove("selectedText");

    });

    // ✨ Enable reading mode
    styleBtn.addEventListener("click", function(){

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){

            chrome.tabs.sendMessage(tabs[0].id, {
                action: "applyStyle"
            });

        });

    });

    // 🔄 Disable reading mode
    resetBtn.addEventListener("click", function(){

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){

            chrome.tabs.sendMessage(tabs[0].id, {
                action: "resetStyle"
            });

        });

    });

});