//TODO:メモリダンプが毎回新しく読み込まれているので更新された場合ポインタの差す場所のみを置き換えるようにする。
//TODO:メモリが範囲を超えたときはエラーを出す
// Brainfuckプログラムの参照
var brainfuckPg = document.getElementById('brainfuck-programs');
var displayPrograms = document.getElementById('display-instruction');
var PGText;
// TODO:命令とメモリをマウスでクリックすると次はそこから動くようにする。
// インストラクションポインタ
var ip;
/*
 * メモリ（バイトの配列）
 * TODO:ポインタを範囲外に遷移させると自動でpush_backする。
 */
var memory = [];
// データポインタ
var dp = 0;
// 入力のバイトストリームのポインタ
var getCharPointer = 0;
// 入力のバイトストリームの参照
var inputText = document.getElementById('input-text');
// 出力のバイトストリームの参照
var outputText = document.getElementById('output-text');
// メモリ容量変更テキストボックスの参照
var memoryChenge = document.getElementById('index');
// メモリダンプの参照
var memoryDumpPoint = document.getElementById('memory-dump');

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
	PGText = '';
    getCharPointer = 0;
	inputText.value = '';
	outputText.innerHTML = '';
	brainfuckPg.value = '';
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
 * todo:NaN対策
 */
function getChar() {
	return inputText.value.substr(getCharPointer++,1).charCodeAt(0);
}

/*
 * memoryの中を16進数2桁ですべて表示する。
 * ul要素、li要素で定義している。
 * memoryの中身をいったん削除してから配列に入っているメモリを全部読み込む。
 */
function memoryDump() {
	// 削除処理
	for (var sakujoIndex =memoryDumpPoint.childNodes.length-1; sakujoIndex>=0; sakujoIndex--) {
		memoryDumpPoint.removeChild(memoryDumpPoint.childNodes[sakujoIndex]);
	}

	// ulを定義
	var elementUl = document.createElement('ul');
	// liを定義
	{
		var tmpHex; // 16進数メモリを一時格納する
		var i = 0; // カウンタ
		var df = document.createDocumentFragment();
		for (var val in memory) {
            tmpHex = (memory[val] < 16) ? '0' + memory[val].toString(16) : memory[val].toString(16);
			var elementLi = document.createElement('li');
			elementLi.appendChild(document.createTextNode(tmpHex));
			elementLi.id = 'm' + i++;
			df.appendChild(elementLi);
		}
	}
	// 要素を追加
	memoryDumpPoint.appendChild(elementUl).appendChild(df);
}

/*
 * dpを画面に表示する
 */
function displayDp(){
	document.getElementById('dp').innerHTML = dp;
	$(function(){
		$('#m' + dp).addClass('current');

	});
}

/*
 * ipを画面に表示する
 */
function displayIp(){
	document.getElementById("ip").innerHTML = ip;
	$(function(){
		var iBef = '#i' + (ip - 1);
		$(iBef).removeClass('current');
		$('#i' + ip).addClass('current');
	});
}

/*
 * 読み込んだ命令を表示する。
 */
function displayInstruction() {
    // 削除処理
    for (var sakujoIndex =displayPrograms.childNodes.length-1; sakujoIndex>=0; sakujoIndex--) {
        displayPrograms.removeChild(displayPrograms.childNodes[sakujoIndex]);
    }
    // ulを定義
    var elementUl = document.createElement('ul');
    // liを定義
    var i = 0; // カウンタ
    var df = document.createDocumentFragment();
    for (var val in PGText) {
        var elementLi = document.createElement('li');
        elementLi.appendChild(document.createTextNode(PGText[val]));
        elementLi.id = 'i' + i++;
        df.appendChild(elementLi);
    }
    // 要素を追加
    displayPrograms.appendChild(elementUl).appendChild(df);
    ip=0;
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
			memory[dp] = getChar();
			break;
		case '[':
			// TODO:動作確認すること
			// ポインタが差す値が0なら
			if (memory[dp] == 0){
				var jmpIndex = ip + 1;
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
				$(iBef).removeClass('current');
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
                $(iBef).removeClass('current');
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
	PGText = brainfuckPg.value;
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
        execute(PGText[ip]);
	}
}

/*
 * 自動ハローワールドボタンを押したときの動作
 */
function auto() {
	var random =Math.floor( Math.random() * 100 ) % 4;
	switch (random) {
		case 0 :
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
	}
}