//TODO:メモリダンプが毎回新しく読み込まれているので更新された場合ポインタの差す場所のみを置き換えるようにする。
//TODO:ジャンプ命令の構文エラーを書く。
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
    ip = 0;
    dp = 0;
    PGText = "";
    PGHTML = "";
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
	var pointer = '<br>';
	var i = 0;
	for (var val in memory) {
		$hex = (memory[val] < 16) ? "0" + memory[val].toString(16) : memory[val].toString(16);
		pointer += '<span id="m' + i++ + '">' + $hex + '</span>\n';
        // 見やすくするためメモリを１０ごとに改行する
        if((i % 10) == 0){
            pointer += '<br>';
        }
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
		$(iBef).css("background-color", "");
		$("#i" + ip).css("background-color", "#FC6");
        // 命令数よりも大きい値を命令ポインタが示していた場合赤色にする。
        if (PGText.length < ip){
            $("#ip").css("background-color", "red");
        } else if (ip <= PGText.length){
            $("#ip").css("background-color", "");
        }
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
function execute(c) {
	switch (c) {
		case '>':
			dp++;
			break;
		case '<':
			dp--;
			break;
		case '+':
			(memory[dp] == 255) ? memory[dp] = 0 : memory[dp]++;
			break;
		case '-':
			(memory[dp] == 0) ? memory[dp] = 255 : memory[dp]--;
			break;
		case '.': // output TODO:UTF16に対応させる。
			document.getElementById("output-text").innerHTML += String.fromCharCode(memory[dp]);
			break;
		case ',': // input TODO:UTF16に対応させる。
			memory[dp] = getchar();
			break;
		// TODO:未実装
		// 鬼門だわ……。スタックで解決できそう?
		// startStack 配列LIFOで対応する配列をひもづける。
		case '[':
            // ポインタが差す値が0なら
            if (memory[dp] == 0){
                var jmpIndex = ip + 1;
                alert(jmpIndex);
                var jmp = 1;
                //対応する]の直後にジャンプする
                while(1) {
                    if(PGText[jmpIndex] == '[') {
                        jmp += 1;
                    } else if (PGText[jmpIndex] == ']') {
                        jmp -=1;
                    }
                    if (jmp == 0) {
                        break;
                    }
                    jmpIndex++;
                }
                var iBef = "#i" + (ip - 1);
                $(iBef).css("background-color", "");
                ip = jmpIndex;
            }
			break;
		case ']':
            // ポインタの差す値が0でないなら
            if (memory[dp] != 0){
                var jmpIndex = ip - 1;
                var jmp = 1;
                // 対応する[の直後にジャンプする
                while(1) {
                    if (PGText[jmpIndex] == '[') {
                        jmp -= 1;
                    } else if (PGText[jmpIndex] == ']') {
                        jmp += 1;
                    }
                    if (jmp == 0) {
                        break;
                    }
                    jmpIndex--;
                }
                var iBef = "#i" + (ip);
                $(iBef).css("background-color", "");
                ip = jmpIndex;
            }

                break;
	}
    ip++;
}

/*
 * 命令を読み込む
 */
function getInstruction() {
	var i = 0;
	PGText = brainfuckPg.value;
	PGHTML = "";
	for (var val in PGText) {
		PGHTML+='<span id="i' + i++ + '">' + PGText[val] + '</span>\n';
	}
	ip=0;
}

/*
 * １文字ずつ実行する。
 */
function oneStep() {
	execute(PGText[ip]);
}

/*
 * 全部実行する。
 */
function allStep() {
	while (ip < PGText.length) {
        oneStep();
	}
}
