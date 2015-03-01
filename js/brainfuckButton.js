// 画面読み込み時
window.onload = function() {
	add(20);
	init();
	memoryChenge.value = 20;
	memoryDump();
	displayDp();
	displayCurrentPointer();
};

// 初期化
document.getElementById('init').onclick = function() {
	init();
	displayInstruction();
	memoryDump();
	displayDp();
	displayIp();
	displayCurrentPointer();
};

// メモリの容量の変更
document.getElementById('memory-chenge').onclick = function() {
    memoryCapacityChenge();
	memoryDump();
	displayDp();
	displayCurrentPointer();
};
function stepwiseExecution() {
    try {
        var promise = removeCurrentPointer();
        promise.then = function() {
            alert("a")
            execute(loadPrograms[ip]);
        };
        promise.false = function() {
            alert("b")
        };
        memoryDumpUpdate();
        displayCurrentPointer();
    } catch(e) {
        alert(e);
        return;
    }
    displayDp();
    displayIp();
}
// Brainfuckプログラムのテキストエリアに対するボタン
/*
 * 全部実行する。
 */
document.getElementById('go').onclick = function() {
    // ipが0だったら新しく命令を読み込む。
    if (ip == 0) {
        getInstruction();
        displayInstruction();
        memoryDump();
    }
    while (ip < loadPrograms.length) {
        stepwiseExecution();
    }
};
/*
 * １文字ずつ実行する。
 */
document.getElementById('step').onclick = function(){
    // ipが0だったら新しく命令を読み込む。
    if (ip == 0) {
        getInstruction();
        displayInstruction();
        memoryDump();
    }
    if (ip < loadPrograms.length) {
        stepwiseExecution();
    }
};
document.getElementById('auto').onclick = function() {
	removeCurrentPointer();
	init();
	auto();
	memoryDump();
	displayDp();
	displayIp();
	displayCurrentPointer();
};
function instructionDelete() {
    inc = [];
    dec = [];
    pinc = [];
    pdec = [];
    output = [];
    input = [];
    startJmp = [];
    endJmp = [];
}
function instructionReflect(){
    inc.push(document.getElementById('inc').value);
    for(var i = 0; i < document.getElementById("add-inc-text").children.length; i++){
        inc.push(document.getElementById("inc" + i).value);
    }
    dec.push(document.getElementById('dec').value);
    for(var i = 0; i < document.getElementById("add-dec-text").children.length; i++){
        dec.push(document.getElementById("dec" + i).value);
    }
    pinc.push(document.getElementById('pinc').value);
    for(var i = 0; i < document.getElementById("add-pinc-text").children.length; i++){
        pinc.push(document.getElementById("pinc" + (i).value));
    }
    pdec.push(document.getElementById('pdec').value);
    for(var i = 0; i < document.getElementById("add-pdec-text").children.length; i++){
        pdec.push(document.getElementById("pdec" + i).value);
    }
    output.push(document.getElementById('output').value);
    for(var i = 0; i < document.getElementById("add-output-text").children.length; i++){
        output.push(document.getElementById("output" + i).value);
    }
    input.push(document.getElementById('input').value);
    for(var i = 0; i < document.getElementById("add-input-text").children.length; i++){
        input.push(document.getElementById("input" + i).value);
    }
    startJmp.push(document.getElementById('start-jmp').value);
    for(var i = 0; i < document.getElementById("add-start-jmp-text").children.length; i++){
        startJmp.push(document.getElementById("start-jmp" + i).value);
    }
    endJmp.push(document.getElementById('end-jmp').value);
    for(var i = 0; i < document.getElementById("add-end-jmp-text").children.length; i++){
        startJmp.push(document.getElementById("start-jmp" + i).value);
    }
}

document.getElementById('token').onclick = function(){
    instructionDelete();
    instructionReflect();
}
document.getElementById('auto-ather-lang').onclick = function(){
    instructionDelete();
    var random =Math.floor( Math.random() * 100 ) % 2;
    switch (random) {
        case 0 :
            document.getElementById('inc').value ='>';
            document.getElementById('dec').value ='<';
            document.getElementById('pinc').value ='+';
            document.getElementById('pdec').value ='-';
            document.getElementById('output').value ='.';
            document.getElementById('input').value =',';
            document.getElementById('start-jmp').value ='[';
            document.getElementById('end-jmp').value =']';
            break;
        case 1 :
            document.getElementById('inc').value ='000';
            document.getElementById('dec').value ='001';
            document.getElementById('pinc').value ='010';
            document.getElementById('pdec').value ='011';
            document.getElementById('output').value ='100';
            document.getElementById('input').value ='101';
            document.getElementById('start-jmp').value ='110';
            document.getElementById('end-jmp').value ='111';
            break;
//        case 2 :
//            document.getElementById('inc').value ='す';
//            document.getElementById('dec').value ='ばぼーん';
//            document.getElementById('pinc').value ='ぽ';
//            document.getElementById('pdec').value ='び';
//            document.getElementById('output').value ='ぽーん';
//            document.getElementById('input').value ='うすらの';
//            document.getElementById('start-jmp').value ='すてらの';
//            document.getElementById('end-jmp').value ='なばびこーん';
//            break;
    }
    instructionReflect();
}