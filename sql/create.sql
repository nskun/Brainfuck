Todo:動作確認してない
CREATE TABLE brainfuck(
brainfuckID INT         NOT NULL
,inc        VARCHAR(50) NOT NULL
,dec        VARCHAR(50) NOT NULL
,pinc       VARCHAR(50) NOT NULL
,pdec       VARCHAR(50) NOT NULL
,inp        VARCHAR(50) NOT NULL
,out        VARCHAR(50) NOT NULL
,jmps       VARCHAR(50) NOT NULL
,jmpt       VARCHAR(50) NOT NULL
,ip         CHAR   (15) NOT NULL
,CreateDate DATETIME    NOT NULL
,PRIMARY KEY(brainfuckID)
,INDEX(brainfuckID)
)MAX_ROWS=200000 ENGINE=InnoDB;
