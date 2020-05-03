let outputArea = undefined;
let mainBtn = undefined;

window.onload = () => {
    Init();
}

function Init()
{
    // Get html elements
    outputArea = document.getElementById('output');
    mainBtn = document.getElementById('mainBtn');

    // Setup main button functionality
    mainBtn.onclick = () => {
        document.getElementById('mainBtn').classList.add('active');

        recognition.start();
    };
    
    // Tell the users to go fuck themselves.
    outputArea.innerHTML = "Fuck you, you piece of shit";

    // Setup speech recognition.
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;

    let grammar = "#JSGF V1.0;";

    let recognition = new SpeechRecognition();
    let grammarList = new SpeechGrammarList();

    grammarList.addFromString(grammar, 1);
    recognition.grammars = grammarList;
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onresult = (event) => {
        let last = event.results.length - 1;
        let command = event.results[last][0].transcript;

        outputArea.innerHTML = "Output: " + command;
    }

    recognition.onspeechend = () => {
        recognition.stop();
        document.getElementById('mainBtn').classList.remove('active');
    }

    recognition.onerror = (event) => {
        outputArea.innerHTML = 'Error: ' + event.error;
        document.getElementById('mainBtn').classList.remove('active');
    }
}