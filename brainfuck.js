// 現在のIPの位置
var ip = 0;
// 現在の値
var reg = new Array();
// getcharの位置
var getcharPointer = 0;
// input-textの参照を定義
var inputText = document.getElementById("input-text");

init(100);

function chenge() {

}

function init() {
	// 初期化
	for (var i = 0; i < index; i++) {
		reg[i]=0;
	}
    display();
}

function pointer() {
	// 入力された数
	var index = document.getElementById("index").value;
	display();
}

function getchar() {
	return inputText.value.substr(getcharPointer++,1);
}

function display() {
	var pointer = "";
	var i = 0;
	for (var val in reg) {
		$hex = (reg[val] < 16) ? "0" + reg[val].toString(16) : reg[val].toString(16);
		pointer+='<span id="' + i++ + '">' + $hex + '</span>\n';
	}
	// 表示する
	document.getElementById("pointer").innerHTML = pointer;
}

/*
 実行
 */
function execute() {
	var PG = document.getElementById("PG").value;
	// バリデーションチェック
	// 実行
	for (var i = 0; i < PG.length; i++) {
		switch (PG[i].charAt(0)) {
			case '<':
				ip++;
				break;
			case '>':
				ip--;
				break;
			case '+':
				(reg[ip] == 255) ? reg[ip]=0 : reg[ip]++;
				break;
			case '-':
				(reg[ip] == 0) ? reg[ip] = 255 : reg[ip]--;
				break;
			case '.': // output
				var id = "pointer" + ip;
				document.getElementById(id).innerHTML = reg[ip];
				break;
			case ',': // input
				reg[ip] = getchar();
				break;
			//case '[':
			//    start-jmp();
			//    break;
			//case ']':
			//    end-jmp();
			//    break;
		}
	}
	display();
}
