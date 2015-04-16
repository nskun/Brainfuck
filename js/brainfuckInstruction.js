var limit = 9;
var textInc = document.getElementById("add-inc-text");
document.getElementById('add-inc-button').onclick = function(){
    if(limit <= textInc.children.length){ // 10個以上になったらそれ以上増やさない
        return;
    }
    var inputName = "inc" + textInc.children.length;
    var input = document.createElement("input");
    input.setAttribute("type","text");
    input.setAttribute("id",inputName);
    textInc.appendChild(input);
}
document.getElementById('del-inc-button').onclick = function(){
    if (textInc.children.length == 0) {
        return;
    }
    delNode = document.getElementById("inc" + (textInc.children.length - 1));
    delNode.parentNode.removeChild(delNode);
}

var textDec = document.getElementById("add-dec-text");
document.getElementById('add-dec-button').onclick = function(){
    if(limit <= textDec.children.length){ // 10個以上になったらそれ以上増やさない
        return;
    }
    var inputName = "dec" + textDec.children.length;
    var input = document.createElement("input");
    input.setAttribute("type","text");
    input.setAttribute("id",inputName);
    textDec.appendChild(input);
}
document.getElementById('del-dec-button').onclick = function(){
    if (textDec.children.length == 0) {
        return;
    }
    delNode = document.getElementById("dec" + (textDec.children.length - 1));
    delNode.parentNode.removeChild(delNode);
}
var textPinc = document.getElementById("add-pinc-text");
document.getElementById('add-pinc-button').onclick = function(){
    if(limit <= textPinc.children.length){ // 10個以上になったらそれ以上増やさない
        return;
    }
    var inputName = "pinc" + textPinc.children.length;
    var input = document.createElement("input");
    input.setAttribute("type","text");
    input.setAttribute("id",inputName);
    textPinc.appendChild(input);
}
document.getElementById('del-pinc-button').onclick = function(){
    if (textPinc.children.length == 0) {
        return;
    }
    delNode = document.getElementById("pinc" + (textPinc.children.length - 1));
    delNode.parentNode.removeChild(delNode);
}
var textPdec = document.getElementById("add-pdec-text");
document.getElementById('add-pdec-button').onclick = function(){
    if(limit <= textPdec.children.length){ // 10個以上になったらそれ以上増やさない
        return;
    }
    var inputName = "pdec" + textPdec.children.length;
    var input = document.createElement("input");
    input.setAttribute("type","text");
    input.setAttribute("id",inputName);
    textPdec.appendChild(input);
}
document.getElementById('del-pdec-button').onclick = function(){
    if (textPdec.children.length == 0) {
        return;
    }
    delNode = document.getElementById("pdec" + (textPdec.children.length - 1));
    delNode.parentNode.removeChild(delNode);
}
var textOutput = document.getElementById("add-output-text");
document.getElementById('add-output-button').onclick = function(){
    if(limit <= textOutput.children.length){ // 10個以上になったらそれ以上増やさない
        return;
    }
    var inputName = "output" + textOutput.children.length;
    var input = document.createElement("input");
    input.setAttribute("type","text");
    input.setAttribute("id",inputName);
    textOutput.appendChild(input);
}
document.getElementById('del-output-button').onclick = function(){
    if (textOutput.children.length == 0) {
        return;
    }
    delNode = document.getElementById("output" + (textOutput.children.length - 1));
    delNode.parentNode.removeChild(delNode);
}
var textInput = document.getElementById("add-input-text");
document.getElementById('add-input-button').onclick = function(){
    if(limit <= textInput.children.length){ // 10個以上になったらそれ以上増やさない
        return;
    }
    var inputName = "input" + textInput.children.length;
    var input = document.createElement("input");
    input.setAttribute("type","text");
    input.setAttribute("id",inputName);
    textInput.appendChild(input);
}
document.getElementById('del-input-button').onclick = function(){
    if (textInput.children.length == 0) {
        return;
    }
    delNode = document.getElementById("input" + (textInput.children.length - 1));
    delNode.parentNode.removeChild(delNode);
}
var textStartJmp = document.getElementById("add-start-jmp-text");
document.getElementById('add-start-jmp-button').onclick = function(){
    if(limit <= textStartJmp.children.length){ // 10個以上になったらそれ以上増やさない
        return;
    }
    var inputName = "start-jmp" + textStartJmp.children.length;
    var input = document.createElement("input");
    input.setAttribute("type","text");
    input.setAttribute("id",inputName);
    textStartJmp.appendChild(input);
}
document.getElementById('del-start-jmp-button').onclick = function(){
    if (textStartJmp.children.length == 0) {
        return;
    }
    delNode = document.getElementById("start-jmp" + (textStartJmp.children.length - 1));
    delNode.parentNode.removeChild(delNode);
}
var textEndJmp = document.getElementById("add-end-jmp-text");
document.getElementById('add-end-jmp-button').onclick = function(){
    if(limit <= textEndJmp.children.length){ // 10個以上になったらそれ以上増やさない
        return;
    }
    var inputName = "end-jmp" + textEndJmp.children.length;
    var input = document.createElement("input");
    input.setAttribute("type","text");
    input.setAttribute("id",inputName);
    textEndJmp.appendChild(input);
}
document.getElementById('del-end-jmp-button').onclick = function(){
    if (textEndJmp.children.length == 0) {
        return;
    }
    delNode = document.getElementById("end-jmp" + (textEndJmp.children.length - 1));
    delNode.parentNode.removeChild(delNode);
}
