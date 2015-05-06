/**
 * 画面読み込み時
 */
window.onload = function() {
    addMemory(20);
	init();
	memoryChenge.value = 20;
	memoryDump();
	displayCurrentPointer();
    setInstructionBuffer();
};

/**
 * 初期化
 */
document.getElementById('init').onclick = function() {
	init();
	displayInstruction();
	memoryDump();
    displayPointer();
	displayCurrentPointer();
};

/**
 * メモリの容量の変更
 */
document.getElementById('memory-chenge').onclick = function() {
    memoryCapacityChenge();
	memoryDump();
    displayPointer();
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
        displayPointer();
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
    displayPointer();
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
 * 自作命令をJavaScript内のバッファに設定する。
 */
function setInstructionBuffer() {
    incRef = document.getElementsByClassName("inc");
    decRef = document.getElementsByClassName("dec");
    pincRef = document.getElementsByClassName("pinc");
    pdecRef = document.getElementsByClassName("pdec");
    outputRef = document.getElementsByClassName("output");
    inputRef = document.getElementsByClassName("input");
    startJmpRef = document.getElementsByClassName("start-jmp");
    endJmpRef = document.getElementsByClassName("end-jmp");

    for(var i = 0; i < INSTRUCTION_COUNT; i++){
        if(incRef[i].value !== "") {
            inc[i] = incRef[i].value;
        }
        if(decRef[i].value !== "") {
            dec[i] = decRef[i].value;
        }
        if(pincRef[i].value !== "") {
            pinc[i] = pincRef[i].value;
        }
        if(pdecRef[i].value !== "") {
            pdec[i] = pdecRef[i].value;
        }
        if(outputRef[i].value !== "") {
            output[i] = outputRef[i].value;
        }
        if(inputRef[i].value !== "") {
            input[i] = inputRef[i].value;
        }
        if(startJmpRef[i].value !== "") {
            startJmp[i] = startJmpRef[i].value;
        }
        if(endJmpRef[i].value !== "") {
            endJmp[i] = endJmpRef[i].value;
        }
    }
}
document.getElementById('token').onclick = function(){
    instructionDelete();
    setInstructionBuffer();
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
    setInstructionBuffer();
}
