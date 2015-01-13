// Brainfuckプログラムの参照
var brainfuckPg = document.getElementById("brainfuck-programs");
// TODO:未実装
// インストラクションポインタ
var ip;
/*
 * バイトの配列
 * TODO:未実装
 * ポインタを範囲外に遷移させるとエラーを吐く処理が必要？もしくは自動でpush_backする。
 */
var reg = new Array();
// データポインタ
var dp = 0;
// 入力のバイトストリームのポインタ
var getcharPointer = 0;
// 入力のバイトストリームの参照
var inputText = document.getElementById("input-text");
// TODO:未実装
// 出力のバイトストリームの参照
var outputText;

// regを初期化する。初めはregの長さは100で初期化
add(100);
displayReg();

/*
 * バイト配列をindexの数だけ追加する。
 */
function add(index) {
	for (var i = 0; i < index; i++) {
		reg.push(0);
	}
}
/*
 * 初期化ボタンを押したときの動作
 * 現在のlengthで00に初期化する
 */
function init() {
	for (var i = 0; i < reg.length; i++) {
		reg[i] = 0;
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

	if (reg.length < index) { // 現在より長い場合
		add(index - reg.length);
	} else if (index < reg.length) { // 現在より短い場合
		for (i = 0; i = reg.length - index; i++) {
			reg.splice(reg.length - i,1);
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
 * regの中を16進数2桁ですべて表示する。
 */
function displayReg() {
	var pointer = "";
	var i = 0;
	for (var val in reg) {
		$hex = (reg[val] < 16) ? "0" + reg[val].toString(16) : reg[val].toString(16);
		pointer+='<span id="' + i++ + '">' + $hex + '</span>\n';
	}
	// 表示する
	document.getElementById("display-reg").innerHTML = pointer;
}

/*
 * 実行ボタンを押した時の動作
 * TODO:未実装
 * oneStepとallStepを押されたときの次の動作をどうするか確認する。
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
			(reg[dp] == 255) ? reg[dp] = 0 : reg[dp]++;
			break;
		case '-':
			(reg[dp] == 0) ? reg[dp] = 255 : reg[dp]--;
			break;
		case '.': // output TODO:動作確認まだ
			var id = "pointer" + dp;
			document.getElementById(id).innerHTML += reg[dp];
			break;
		case ',': // input
			reg[dp] = getchar();
			break;
		//case '[':
		//    start-jmp();
		//    break;
		//case ']':
		//    end-jmp();
		//    break;
	}

}
/*
 * １文字ずつ実行する。
 * TODO：動作確認まだ
 */
function oneStep() {
	var PGtext= brainfuckPg.value;
	execute(PGtext[ip++].charAt(0));
}

/*
 * 全部実行する。
 * TODO：動作確認まだ
 */
function allStep() {
	var PGtext= brainfuckPg.value;
	for (ip = 0; ip < PGtext.length; ip++) {
		execute(PGtext[ip].charAt(0));
	}
}