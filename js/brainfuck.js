// Brainfuckプログラムの参照
// TODO:PHP側の処理を追加
// TODO:TRIE木での実装
var programsForm = document.getElementById('programs-form');
var displayPrograms = document.getElementById('display-programs');
var loadPrograms = [];
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

// 命令
var inc = [];
var dec = [];
var pinc = [];
var pdec = [];
var output = [];
var input = [];
var startJmp = [];
var endJmp = [];
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
    loadPrograms = [];
	getCharPointer = 0;
	outputText.innerHTML = '';
}

/*
 * 変更ボタンを押したときの動作
 * 現在より長い場合は、コピー＋０追加
 * 現在より短い場合は、切り捨て
 */
function memoryCapacityChenge() {
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
function getChar() {
	if (Number.isNaN(inputText.value.substr(getCharPointer,1).charCodeAt(0))) {
		throw new Error("入力文字列のポインタの外に移動しました");
	}
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
	elementUl.id = 'memory-li';
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
 * 更新されたメモリを表示する
 */
function memoryDumpUpdate() {
	document.getElementById("memory-li").childNodes[dp].innerHTML = (memory[dp] < 16) ? '0' + memory[dp].toString(16) : memory[dp].toString(16);
}
/*
 * ipを画面に表示する
 */
function displayIp(){
	document.getElementById("ip").innerHTML = ip;
}
/*
 * dpを画面に表示する
 */
function displayDp(){
	document.getElementById('dp').innerHTML = dp;
}
/*
 * ip、dpを現在位置を削除する
 */
function removeCurrentPointer() {
	$('#i' + ip).removeClass('current');
	$('#m' + dp).removeClass('current');
}
/*
 * ip、dpの現在位置を表示する
 */
function displayCurrentPointer() {
	$('#i' + ip).addClass('current');
	$('#m' + dp).addClass('current');
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
	for (var val in loadPrograms) {
		var elementLi = document.createElement('li');
		elementLi.appendChild(document.createTextNode(loadPrograms[val].myInstruction));
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
    switch (c.instruction) {
		case 'inc':
			if (memory.length <= dp + 1) {
				throw new Error("メモリの範囲外に移動しました。");
			} else {
				dp++;
			}
			break;
		case 'dec':
			if (dp - 1 < 0) {
				throw new Error("メモリの範囲外に移動しました。");
			} else {
				dp--;
			}
			break;
		case 'pinc':
			(memory[dp] == 255) ? memory[dp] = 0 : memory[dp]++;
			break;
		case 'pdec':
			(memory[dp] == 0) ? memory[dp] = 255 : memory[dp]--;
			break;
		case 'output': // output TODO:UTF16に対応させる。
			outputText.innerHTML += String.fromCharCode(memory[dp]);
			break;
		case 'input': // input TODO:UTF16に対応させる。
			memory[dp] = getChar();
			break;
		case 'startJmp':
			// TODO:動作確認すること
			// ポインタが差す値が0なら
			if (memory[dp] == 0){
				var jmpIndex = ip + 1;
				var jmp = 1;
				//対応する]の直後にジャンプする
				while(1) {
					if(loadPrograms[jmpIndex].instruction == 'startJmp') {
						jmp += 1;
					} else if (loadPrograms[jmpIndex].instruction == 'endJmp') {
						jmp -=1;
					}
					if (jmp == 0) {
						break;
					}
					jmpIndex++;
				}
				ip = jmpIndex;
			}
			break;
		case 'endJmp':
			// ポインタの差す値が0でないなら
			if (memory[dp] != 0){
				var jmpIndex = ip - 1;
				var jmp = 1;
				// 対応する[の直後にジャンプする
				while(1) {
					if (loadPrograms[jmpIndex].instruction == 'startJmp') {
						jmp -= 1;
					} else if (loadPrograms[jmpIndex].instruction == 'endJmp') {
						jmp += 1;
					}
					if (jmp == 0) {
						break;
					}
					jmpIndex--;
				}
				ip = jmpIndex;
			}
			break;
	}
	ip++;
}

function escapeRegExp(string) {
    return string.replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1");
}
/*
 * 命令を読み込む
 */
function getInstruction() {
    patternInc = [];
    patternDec = [];
    patternPinc = [];
    patternPdec = [];
    patternOutput = [];
    patternInput = [];
    patternStartJmp = [];
    patternEndJmp = [];
    for(var i = 0; i < inc.length; i++){
        inc[i];
        patternInc.push(new RegExp("^" + escapeRegExp(inc[i])));
    }
    for(var i = 0; i < dec.length; i++){
        patternDec.push(new RegExp("^" + escapeRegExp(dec[i])));
    }
    for(var i = 0; i < pinc.length; i++){
        patternPinc.push(new RegExp("^" + escapeRegExp(pinc[i])));
    }
    for(var i = 0; i < pdec.length; i++){
        patternPdec.push(new RegExp("^" + escapeRegExp(pdec[i])));
    }
    for(var i = 0; i < output.length; i++){
        patternOutput.push(new RegExp("^" + escapeRegExp(output[i])));
    }
    for(var i = 0; i < input.length; i++){
        patternInput.push(new RegExp("^" + escapeRegExp(input[i])));
    }
    for(var i = 0; i < startJmp.length; i++){
        patternStartJmp.push(new RegExp("^" + escapeRegExp(startJmp[i])));
    }
    for(var i = 0; i < endJmp.length; i++){
        patternEndJmp.push(new RegExp("^" + escapeRegExp(endJmp[i])));
    }
    var i = 0;
    var flag = false;
    while(i < programsForm.value.length) {
        for(var j = 0; j < patternInc.length; j++) {
            if (patternInc[j].test(programsForm.value.substr(i))) {
                pushPrograms('inc', programsForm.value.substr(i, inc[j].length))
                i += inc[j].length;
                flag = true;
                break;
            }
        }
        for(var j = 0; j < patternDec.length; j++) {
            if (patternDec[j].test(programsForm.value.substr(i))) {
                pushPrograms('dec', programsForm.value.substr(i, dec[j].length))
                i += dec[j].length;
                flag = true;
                break;
            }
        }
        for(var j = 0; j < patternPinc.length; j++) {
            if (patternPinc[j].test(programsForm.value.substr(i))) {
                pushPrograms('pinc', programsForm.value.substr(i, pinc[j].length));
                i += pinc[j].length;
                flag = true;
                break;
            }
        }
        for(var j = 0; j < patternPdec.length; j++) {
            if (patternPdec[j].test(programsForm.value.substr(i))) {
                pushPrograms('pdec', programsForm.value.substr(i, pdec[j].length));
                i += pdec[j].length;
                flag = true;
                break;
            }
        }
        for(var j = 0; j < patternOutput.length; j++) {
            if (patternOutput[j].test(programsForm.value.substr(i))) {
                pushPrograms('output', programsForm.value.substr(i, output[j].length));
                i += output[j].length;
                flag = true;
                break;
            }
        }
        for(var j = 0; j < patternInput.length; j++) {
            if (patternInput[j].test(programsForm.value.substr(i))) {
                pushPrograms('input', programsForm.value.substr(i, input[j].length));
                i += input[j].length;
                flag = true;
                break;
            }
        }
        for(var j = 0; j < patternStartJmp.length; j++) {
            if (patternStartJmp[j].test(programsForm.value.substr(i))) {
                pushPrograms('startJmp', programsForm.value.substr(i, startJmp[j].length));
                i += startJmp[j].length;
                flag = true;
                break;
            }
        }
        for(var j = 0; j < patternEndJmp.length; j++) {
            if (patternEndJmp[j].test(programsForm.value.substr(i))) {
                pushPrograms('endJmp', programsForm.value.substr(i, endJmp[j].length));
                i += endJmp[j].length;
                flag = true;
                break;
            }
        }
        if(flag){
            flag = false;
        } else {
            i++;
        }
    }
}
function pushPrograms(instruction, myInstruction) {
    var programs = {};
    programs.instruction = instruction;
    programs.myInstruction = myInstruction;
    loadPrograms.push(programs);

}
/*
 * 自動プログラムボタンを押したときの動作
 */
function auto() {
	var random =Math.floor( Math.random() * 100 ) % 5;
	switch (random) {
		case 0 :
			programsForm.value = pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+startJmp[0]+inc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+inc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+inc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+dec[0]+dec[0]+dec[0]+pdec[0]+endJmp[0]+inc[0]+output[0]+inc[0]+pinc[0]+pinc[0]+output[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+output[0]+output[0]+pinc[0]+pinc[0]+pinc[0]+output[0]+inc[0]+pdec[0]+output[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+output[0]+dec[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+output[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+output[0]+pinc[0]+pinc[0]+pinc[0]+output[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+output[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+output[0]+inc[0]+pinc[0]+output[0];
			break;
		case 1 :
			inputText.value = 'Hello, world!';
			programsForm.value = input[0]+output[0]+inc[0]+input[0]+output[0]+inc[0]+input[0]+output[0]+inc[0]+input[0]+output[0]+inc[0]+input[0]+output[0]+inc[0]+input[0]+output[0]+inc[0]+input[0]+output[0]+inc[0]+input[0]+output[0]+inc[0]+input[0]+output[0]+inc[0]+input[0]+output[0]+inc[0]+input[0]+output[0]+inc[0]+input[0]+output[0]+inc[0]+input[0]+output[0];
			break;
		case 2 :
			inputText.value = 'Hello, world!';
			programsForm.value = input[0]+output[0]+input[0]+output[0]+input[0]+output[0]+input[0]+output[0]+input[0]+output[0]+input[0]+output[0]+input[0]+output[0]+input[0]+output[0]+input[0]+output[0]+input[0]+output[0]+input[0]+output[0]+input[0]+output[0]+input[0]+output[0];
			break;
		case 3 :
			programsForm.value = pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+output[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+output[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+output[0]+output[0]+pinc[0]+pinc[0]+pinc[0]+output[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+output[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+output[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+output[0]+pinc[0]+pinc[0]+pinc[0]+output[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+output[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+output[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+pdec[0]+output[0];
            break;
        case 4 :
            programsForm.value = pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+startJmp[0]+pdec[0]+inc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+inc[0]+inc[0]+pinc[0]+inc[0]+pinc[0]+inc[0]+pdec[0]+dec[0]+dec[0]+dec[0]+dec[0]+dec[0]+endJmp[0]+inc[0]+startJmp[0]+dec[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+inc[0]+inc[0]+pinc[0]+pinc[0]+pinc[0]+inc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+inc[0]+inc[0]+pinc[0]+pinc[0]+pinc[0]+inc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+inc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+inc[0]+inc[0]+inc[0]+inc[0]+inc[0]+inc[0]+pinc[0]+pinc[0]+inc[0]+inc[0]+pinc[0]+pinc[0]+dec[0]+dec[0]+dec[0]+dec[0]+dec[0]+dec[0]+dec[0]+dec[0]+dec[0]+dec[0]+dec[0]+dec[0]+dec[0]+dec[0]+pdec[0]+endJmp[0]+dec[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+inc[0]+pinc[0]+pinc[0]+pinc[0]+inc[0]+pdec[0]+pdec[0]+inc[0]+pinc[0]+pinc[0]+pinc[0]+inc[0]+pdec[0]+inc[0]+inc[0]+pdec[0]+pdec[0]+pdec[0]+inc[0]+pinc[0]+pinc[0]+inc[0]+inc[0]+inc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+startJmp[0]+pdec[0]+inc[0]+pinc[0]+pinc[0]+inc[0]+pinc[0]+pinc[0]+dec[0]+dec[0]+endJmp[0]+dec[0]+dec[0]+dec[0]+dec[0]+dec[0]+dec[0]+dec[0]+dec[0]+dec[0]+dec[0]+startJmp[0]+pdec[0]+inc[0]+pdec[0]+startJmp[0]+inc[0]+inc[0]+inc[0]+inc[0]+inc[0]+inc[0]+inc[0]+endJmp[0]+inc[0]+startJmp[0]+dec[0]+pinc[0]+pinc[0]+pinc[0]+inc[0]+output[0]+inc[0]+output[0]+inc[0]+inc[0]+inc[0]+inc[0]+output[0]+output[0]+inc[0]+inc[0]+inc[0]+pinc[0]+dec[0]+endJmp[0]+dec[0]+dec[0]+dec[0]+dec[0]+dec[0]+pdec[0]+startJmp[0]+inc[0]+inc[0]+inc[0]+inc[0]+endJmp[0]+inc[0]+startJmp[0]+dec[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+pinc[0]+inc[0]+output[0]+inc[0]+output[0]+inc[0]+output[0]+output[0]+inc[0]+inc[0]+inc[0]+pinc[0]+dec[0]+endJmp[0]+inc[0]+inc[0]+inc[0]+inc[0]+pinc[0]+dec[0]+pdec[0]+startJmp[0]+dec[0]+dec[0]+dec[0]+endJmp[0]+dec[0]+startJmp[0]+startJmp[0]+pdec[0]+dec[0]+dec[0]+pinc[0]+inc[0]+inc[0]+endJmp[0]+inc[0]+inc[0]+inc[0]+pinc[0]+inc[0]+pinc[0]+dec[0]+dec[0]+dec[0]+dec[0]+dec[0]+dec[0]+startJmp[0]+pdec[0]+inc[0]+inc[0]+pinc[0]+inc[0]+pinc[0]+inc[0]+pdec[0]+dec[0]+dec[0]+dec[0]+dec[0]+endJmp[0]+dec[0]+endJmp[0]+inc[0]+inc[0]+startJmp[0]+startJmp[0]+pdec[0]+endJmp[0]+dec[0]+endJmp[0]+inc[0]+startJmp[0]+inc[0]+inc[0]+inc[0]+startJmp[0]+inc[0]+output[0]+dec[0]+dec[0]+output[0]+dec[0]+dec[0]+dec[0]+endJmp[0]+dec[0]+startJmp[0]+output[0]+dec[0]+dec[0]+dec[0]+dec[0]+endJmp[0]+inc[0]+endJmp[0]+inc[0]+output[0]+dec[0]+dec[0]+dec[0]+dec[0]+dec[0]+dec[0]+dec[0]+dec[0]+dec[0]+dec[0]+dec[0]+endJmp[0];
            break;
    }
}