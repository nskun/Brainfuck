//TODO:メモリダンプが毎回新しく読み込まれているので更新されても１つだけ置き換えるようにする。

// Brainfuckプログラムの参照
var brainfuckPg = document.getElementById("brainfuck-programs");
var PGText;
var PGHTML;
// TODO:命令とメモリをマウスでクリックすると次はそこから動くようにする。
// インストラクションポインタ
var ip;
/*
 * メモリ（バイトの配列）
 * TODO:未実装
 * ポインタを範囲外に遷移させるとエラーを吐く処理が必要？もしくは自動でpush_backする。
 */
var memory = new Array();
// データポインタ
var dp = 0;
// 入力のバイトストリームのポインタ
var getcharPointer = 0;
// 入力のバイトストリームの参照
var inputText = document.getElementById("input-text");
// 出力のバイトストリームの参照
var outputText;
// jump命令を格納する配列
var startJump = new Array();

// memoryを初期化する。
add(50);
memoryDump();
displayDp();

/*
 * バイト配列をindexの数だけ追加する。
 */
function add(index) {
	for (var i = 0; i < index; i++) {
		memory.push(0);
	}
}

/*
 * 初期化ボタンを押したときの動作
 * 現在のlengthで00に初期化する
 */
function init() {
	for (var i = 0; i < memory.length; i++) {
		memory[i] = 0;
	}
}

/*
 * 変更ボタンを押したときの動作
 * 現在より長い場合は、コピー＋０追加
 * 現在より短い場合は、切り捨て
 */
function chenge() {
	// 入力された数
	var index = document.getElementById("index").value;
	var i;

	if (memory.length < index) { // 現在より長い場合
		add(index - memory.length);
	} else if (index < memory.length) { // 現在より短い場合
		for (i = 0; i = memory.length - index; i++) {
			memory.splice(memory.length - i,1);
		}
	}
}

/*
 * 入力ストリームから１文字読む
 * 入力ストリームのポインタを１進める
 * @return 入力ストリームの１文字
 */
function getchar() {
	return inputText.value.substr(getcharPointer++,1);
}

/*
 * memoryの中を16進数2桁ですべて表示する。
 */
function memoryDump() {
	var pointer = "";
	var i = 0;
	for (var val in memory) {
		$hex = (memory[val] < 16) ? "0" + memory[val].toString(16) : memory[val].toString(16);
		pointer+='<span id="m' + i++ + '">' + $hex + '</span>\n';
	}
	// 表示する
	document.getElementById("memory-dump").innerHTML = pointer;
}
/*
 * dpを画面に表示する
 */
function displayDp(){
	document.getElementById("dp").innerHTML = dp;
	$(function(){
		$("#m" + dp).css("background-color", "#FC6");
	});
}
/*
 * ipを画面に表示する
 */
function displayIp(){
	document.getElementById("ip").innerHTML = ip;
	$(function(){
		var iBef = "#i" + (ip - 1);
		$(iBef).css("background-color", "#FFF");
		$("#i" + ip).css("background-color", "#FC6");
	});
}
/*
 * 読み込んだ命令を表示する。
 */
function displayInstruction() {
	document.getElementById("display-instruction").innerHTML = PGHTML;
}
/*
 * 実行ボタンを押した時の動作
 */
function execute(pg) {
	switch (pg) {
		case '<':
			dp++;
			break;
		case '>':
			dp--;
			break;
		case '+':
			(memory[dp] == 255) ? memory[dp] = 0 : memory[dp]++;
			break;
		case '-':
			(memory[dp] == 0) ? memory[dp] = 255 : memory[dp]--;
			break;
		case '.': // output TODO:UTF16に対応させる。
			document.getElementById("output-text").innerHTML += memory[dp];
			break;
		case ',': // input TODO:UTF16に対応させる。
			memory[dp] = getchar();
			break;
		// TODO:未実装
		// 鬼門だわ……。スタックで解決できそう。
		// startStack 配列LIFOで対応する配列をひもづける。
		case '[':
			startJump[] = ip;
			break;
		case ']':

			break;
	}
}

/*
 * 命令を読み込む
 */
function getInstruction() {
	var PGBuffer = brainfuckPg.value;
	var i = 0;
	PGText = brainfuckPg.value;
	PGHTML = "";
	for (var val in PGBuffer) {
		PGHTML+='<span id="i' + i++ + '">' + PGBuffer[val] + '</span>\n';
	}
	ip=0;
}
/*
 * １文字ずつ実行する。
 */
function oneStep() {
	execute(PGText[ip++]);
}

/*
 * 全部実行する。
 */
function allStep() {
	var PGtext = brainfuckPg.value;
	for (ip = 0; ip < PGtext.length; ip++) {
		execute(PGtext[ip].charAt(0));
	}
}
