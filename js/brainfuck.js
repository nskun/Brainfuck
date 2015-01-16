//TODO:メモリダンプが毎回新しく読み込まれているので更新された場合ポインタの差す場所のみを置き換えるようにする。
//TODO:jQueryの.cssの操作は移植性の観点からするべきではないのでidを付与してレイアウトはcssで定義する。
// Brainfuckプログラムの参照
var brainfuckPg = document.getElementById('brainfuck-programs');
var PGText;
var PGHTML;
// TODO:命令とメモリをマウスでクリックすると次はそこから動くようにする。
// インストラクションポインタ
var ip;
/*
 * メモリ（バイトの配列）
 * TODO:ポインタを範囲外に遷移させると自動でpush_backする。
 */
var memory = new Array();
// データポインタ
var dp = 0;
// 入力のバイトストリームのポインタ
var getcharPointer = 0;
// 入力のバイトストリームの参照
var inputText = document.getElementById('input-text');
// 出力のバイトストリームの参照
var outputText = document.getElementById('output-text');
// jump命令を格納する配列
var startJump = new Array();
// メモリ容量変更テキストボックスの参照
var memoryChenge = document.getElementById('index');

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
<<<<<<< HEAD
	PGText = "";
	PGHTML = "";
	inputText.value = "";
	outputText.innerHTML = "";
	brainfuckPg.innerHTML = "";
=======
	PGText = '';
	PGHTML = '';
    getcharPointer = 0;
	inputText.value = '';
	outputText.innerHTML = '';
	brainfuckPg.value = '';
>>>>>>> origin/master
}

/*
 * 変更ボタンを押したときの動作
 * 現在より長い場合は、コピー＋０追加
 * 現在より短い場合は、切り捨て
 */
function chenge() {
	// 入力された数
	var index = memoryChenge.value;
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
	return inputText.value.substr(getcharPointer++,1).charCodeAt(0);
}

/*
 * memoryの中を16進数2桁ですべて表示する。
 */
function memoryDump() {
	var pointer = '<br>';
	var i = 0;
	for (var val in memory) {
		$hex = (memory[val] < 16) ? '0' + memory[val].toString(16) : memory[val].toString(16);
		pointer += '<span id="m' + i++ + '">' + $hex + '</span>\n';
		// 見やすくするためメモリを１０ごとに改行する
		if((i % 10) == 0){
			pointer += '<br>';
		}
	}
	// 表示する
	document.getElementById('memory-dump').innerHTML = pointer;
}

/*
 * dpを画面に表示する
 */
function displayDp(){
	document.getElementById('dp').innerHTML = dp;
	$(function(){
		$('#m' + dp).css('background-color', '#FC6');
	});
}

/*
 * ipを画面に表示する
 */
function displayIp(){
	document.getElementById("ip").innerHTML = ip;
	$(function(){
<<<<<<< HEAD
		var iBef = "#i" + (ip - 1);
		$(iBef).css("background-color", "");
		$("#i" + ip).css("background-color", "#FC6");
		// 命令数よりも大きい値を命令ポインタが示していた場合赤色にする。
		if (PGText.length < ip){
			$("#ip").css("background-color", "red");
		} else if (ip <= PGText.length){
			$("#ip").css("background-color", "");
		}
=======
		var iBef = '#i' + (ip - 1);
		$(iBef).css('background-color', '');
		$('#i' + ip).css('background-color', '#FC6');
>>>>>>> origin/master
	});
}

/*
 * 読み込んだ命令を表示する。
 */
function displayInstruction() {
	document.getElementById('display-instruction').innerHTML = PGHTML;
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
			outputText.innerHTML += String.fromCharCode(memory[dp]);
			break;
		case ',': // input TODO:UTF16に対応させる。
			memory[dp] = getchar();
			break;
		case '[':
<<<<<<< HEAD
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
=======
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
                var iBef = '#i' + (ip - 1);
                $(iBef).css('background-color', '');
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
                var iBef = '#i' + (ip);
                $(iBef).css('background-color', '');
                ip = jmpIndex;
            }
            break;
>>>>>>> origin/master
	}
	ip++;
}

/*
 * 命令を読み込む
 */
function getInstruction() {
	var i = 0;
	PGText = brainfuckPg.value;
	PGHTML = '';
	for (var val in PGText) {
		PGHTML+='<span id="i' + i++ + '">' + PGText[val] + '</span>\n';
	}
	ip=0;
}
/*
 * 構文エラーをチェック
 * [と]が同じ数だけあるか確認する。
 * TODO:][と言うプログラムのとき考慮する
 */
function isSyntax() {
    var jmp = 0;
    for (var val in PGText) {
        if (PGText[val] == '[') {
            jmp++;
        } else if (PGText[val] == ']'){
            jmp--;
        }
    }
    if (jmp == 0) {
        return true;
    } else {
        PGHTML = '<span id="error">Syntax error!</span>';
        return false;
    }
}


/*
 * １文字ずつ実行する。
 */
function oneStep() {
    if (ip < PGText.length) {
    	execute(PGText[ip]);
    }
}

/*
 * 全部実行する。
 */
function allStep() {
	while (ip < PGText.length) {
<<<<<<< HEAD
		oneStep();
=======
        execute(PGText[ip]);
>>>>>>> origin/master
	}
}

/*
 * 自動ハローワールドボタンを押したときの動作
 */
function auto() {
	var random =Math.floor( Math.random() * 100 ) % 4;
	switch (random) {
		case 0 :
<<<<<<< HEAD
			brainfuckPg.innerHTML = '+++++++++[>++++++++>+++++++++++>+++++<<<-]>.>++.+++++++..+++.>-.------------.<++++++++.--------.+++.------.--------.>+.';
			break;
		case 1 :
			inputText.value = "Hello, world!";
			brainfuckPg.innerHTML = ',.>,.>,.>,.>,.>,.>,.>,.>,.>,.>,.>,.>,.>';
			break;
		case 2 :
			inputText.value = "Hello, world!";
			brainfuckPg.innerHTML = ',.,.,.,.,.,.,.,.,.,.,.,.,.';
			break;
		case 3 :
			brainfuckPg.innerHTML = '++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.+++++++++++++++++++++++++++++.+++++++..+++.-------------------------------------------------------------------------------.+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.--------.+++.------.--------.-------------------------------------------------------------------.';
=======
			brainfuckPg.value = '+++++++++[>++++++++>+++++++++++>+++++<<<-]>.>++.+++++++..+++.>-.------------.<++++++++.--------.+++.------.--------.>+.';
			break;
		case 1 :
			inputText.value = 'Hello, world!';
			brainfuckPg.value = ',.>,.>,.>,.>,.>,.>,.>,.>,.>,.>,.>,.>,.';
			break;
		case 2 :
			inputText.value = 'Hello, world!';
			brainfuckPg.value = ',.,.,.,.,.,.,.,.,.,.,.,.,.';
			break;
		case 3 :
			brainfuckPg.value = '++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.+++++++++++++++++++++++++++++.+++++++..+++.-------------------------------------------------------------------------------.+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.--------.+++.------.--------.-------------------------------------------------------------------.';
>>>>>>> origin/master
	}
}