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
	try {
		while (ip < PGText.length) {
			removeCurrentPointer();
			execute(PGText[ip]);
			memoryDumpUpdate();
			displayCurrentPointer();
		}
	} catch(e) {
		alert(e);
		return;
	}
	displayDp();
	displayIp();
};
/*
 * １文字ずつ実行する。
 */
document.getElementById('step').onclick = function() {
	// ipが0だったら新しく命令を読み込む。
	if (ip == 0) {
		getInstruction();
		displayInstruction();
		memoryDump();
	}
	try {
		if (ip < PGText.length) {
			removeCurrentPointer();
			execute(PGText[ip]);
			memoryDumpUpdate();
			displayCurrentPointer();
		}
	} catch(e) {
		alert(e);
		return;
	}
	displayDp();
	displayIp();
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