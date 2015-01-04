
// 現在のIPの位置
var ip = 0;
// 現在の値
var reg = new Array(100);

// 初期化
for (var i = 0; i < 100; i++) {
    reg[i]=0;

}

function pointer() {
    // 入力された数
    var index = document.getElementById("index").value;

    var pointer = "";
    var i = 0;
    for (var val in reg) {
        pointer+='<span id="pointer' + i++ + '">' + reg[val] + '</span>\n';
    }
    alert(pointer);
    // 表示する
    document.getElementById("pointer").innerHTML= pointer;
}

function inc() {

}
/*
 実行
 */
function execute() {
    var PG = document.getElementById("PG").value;
    // バリデーションチェック

    // 実行
    switch (PG.charAt(0)){
        case '<':
            inc();
            break;
        case '>':
            dec();
            break;
        case '+':
            pinc();
            break;
        case '-':
            pdec();
            break;
        case '.':
            output();
            break;
        case ',':
            input();
            break;
        case '[':
            start-jmp();
            break;
        case ']':
            end-jmp();
            break;
    }
}