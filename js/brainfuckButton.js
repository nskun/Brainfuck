// 画面読み込み時
window.onload = function() {
	add(50);
	memoryDump();
	displayDp();
}

// 初期化
document.getElementById('init').onclick = function() {
	init();
	memoryDump();
	displayInstruction();
	displayDp();
	displayIp();
}

// メモリの容量の変更
document.getElementById('memory-chenge').onclick = function() {
    chenge();
    memoryDump();
}

// Brainfuckプログラムのテキストエリアに対するボタン
document.getElementById('go').onclick = function() {
    getInstruction();
    displayInstruction();
    allStep();
    memoryDump();
    displayDp();
    displayIp();
}
document.getElementById('step').onclick = function() {
    oneStep();
    memoryDump();
    displayDp();
    displayIp();
}
document.getElementById('read').onclick = function() {
    getInstruction();
    displayInstruction();
    displayIp();
}
document.getElementById('auto').onclick = function() {
    init();
    auto();
}
