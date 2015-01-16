// 画面読み込み時
window.onload = function() {
	add(50);
	init();
	memoryChenge.value = 50;
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
	if (ip == 0) {
		getInstruction();
		if (!isSyntax()) {
			displayInstruction();
			return;
		}
		displayInstruction();
	}
	allStep();
	memoryDump();
	displayDp();
	displayIp();
};
document.getElementById('step').onclick = function() {
	if (ip == 0) {
		getInstruction();
		if (!isSyntax()) {
			displayInstruction();
			return;
		}
		displayInstruction();
	}
	oneStep();
	memoryDump();
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