// 画面読み込み時
window.onload = function() {
	add(20);
	init();
	memoryChenge.value = 20;
	memoryDump();
	displayDp();
};

// 初期化
document.getElementById('init').onclick = function() {
	init();
	displayInstruction();
	memoryDump();
	displayDp();
	displayIp();
};

// メモリの容量の変更
document.getElementById('memory-chenge').onclick = function() {
	chenge();
	memoryDump();
	displayDp();
};

// Brainfuckプログラムのテキストエリアに対するボタン
document.getElementById('go').onclick = function() {
    // ipが0だったら新しく命令を読み込む。
	if (ip == 0) {
		getInstruction();
		displayInstruction();
        memoryDump();
	}
    try {
    	allStep();
    } catch(e) {
        alert(e);
        return;
    }
    memoryDumpUpdate();
	displayDp();
	displayIp();
};
document.getElementById('step').onclick = function() {
    // ipが0だったら新しく命令を読み込む。
    if (ip == 0) {
		getInstruction();
		displayInstruction();
        memoryDump();
	}
    try {
        oneStep();
    } catch(e) {
        alert(e);
        return;
    }
    memoryDumpUpdate();
	displayDp();
	displayIp();
};
document.getElementById('auto').onclick = function() {
	init();
	auto();
	memoryDump();
	displayDp();
	displayIp();
};