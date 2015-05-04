/**
 * 画面読み込み時
 */
window.onload = function() {
	add(20);
	init();
	memoryChenge.value = 20;
	memoryDump();
	displayDp();
	displayCurrentPointer();
    instructionReflect();
};

/**
 * 初期化
 */
document.getElementById('init').onclick = function() {
	init();
	displayInstruction();
	memoryDump();
	displayDp();
	displayIp();
	displayCurrentPointer();
};

/**
 * メモリの容量の変更
 */
document.getElementById('memory-chenge').onclick = function() {
    memoryCapacityChenge();
	memoryDump();
	displayDp();
	displayCurrentPointer();
};
/**
 *
 * @param recursive
 */
function stepwiseExecution(recursive) {
    // ipが0だったら新しく命令を読み込む。
    if (ip == 0) {
        getInstruction();
        displayInstruction();
        memoryDump();
    }
    if(ip < loadPrograms.length) {
        removeCurrentPointer();
        try {
            execute(loadPrograms[ip]);
        } catch(e) {
            alert(e);
            return;
        }
        memoryDumpUpdate();
        displayCurrentPointer();
        displayDp();
        displayIp();
        if(recursive === RECURSIVE) {
            setTimeout(arguments.callee, 1, RECURSIVE);
        }
    }

}
// Brainfuckプログラムのテキストエリアに対するボタン
/*
 * 全部実行する。
 */
document.getElementById('go').onclick = function() {
    stepwiseExecution(RECURSIVE);
};
/*
 * １ステップずつ実行する。
 */
document.getElementById('step').onclick = function() {
    stepwiseExecution(NO_RECURSIVE);
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
/**
 * 命令をバッファに入れる
 */
function instructionReflect() {
    inc.push(document.getElementById("inc").value);
    incRef = document.getElementById("add-inc-text");
    for(var i = 0; i < incRef.children.length; i++){
        inc.push(incRef.children[i].value);
    }
    dec.push(document.getElementById('dec').value);
    decRef = document.getElementById("add-dec-text");
    for(var i = 0; i < decRef.children.length; i++){
        dec.push(decRef.children[i].value);
    }
    pinc.push(document.getElementById('pinc').value);
    pincRef = document.getElementById("add-pinc-text");
    for(var i = 0; i < pincRef.children.length; i++){
        pinc.push(pincRef.children[i].value);
    }
    pdec.push(document.getElementById('pdec').value);
    pdecRef = document.getElementById("add-pdec-text");
    for(var i = 0; i < pdecRef.children.length; i++){
        pdec.push(pdecRef.children[i].value);
    }
    output.push(document.getElementById('output').value);
    outputRef = document.getElementById("add-output-text");
    for(var i = 0; i < outputRef.children.length; i++){
        output.push(outputRef.children[i].value);
    }
    input.push(document.getElementById('input').value);
    inputRef = document.getElementById("add-input-text");
    for(var i = 0; i < inputRef.children.length; i++){
        input.push(inputRef.children[i].value);
    }
    startJmp.push(document.getElementById('start-jmp').value);
    startJmpRef = document.getElementById("add-start-jmp-text");
    for(var i = 0; i < startJmpRef.children.length; i++){
        startJmp.push(startJmpRef.children[i].value);
    }
    endJmp.push(document.getElementById('end-jmp').value);
    endJmpRef = document.getElementById("add-end-jmp-text");
    for(var i = 0; i < endJmpRef.children.length; i++){
        endJmp.push(endJmpRef.children[i].value);
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
