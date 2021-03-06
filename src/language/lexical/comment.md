# コメント

__コメント (comment)__は、プログラムの動作に関係しない注釈のことです。
コメントにはブロックコメントとラインコメントの2種類があります。

## ブロックコメント

__ブロックコメント (block comment)__は、`###` から `###` までの間をコメント化します。
複数行に渡るコメント化や、単一行の一部のコメント化も可能です。

ブロックコメントは入れ子構造 (ネスト) をサポートしません。
またブロックコメントをトークン内で使用した場合、そのトークンは2つに分割されます。
例えば、`123### comment ###456` は `123` と `456` の2つのトークンであると解釈されます。

## ラインコメント

ラインコメントは `#` から改行文字およびファイル終端文字を除く行末までをコメント化します。
ラインコメントを行末より前で終了することはできません。

## ラインキャンセル

ラインキャンセルは行末の `\` で表現されます。
結果的に `\` および行終端文字（改行文字）はコメントと同一視され、構文解析時には無視されます。

`\` はファイル終端をキャンセルすることはできません。
すなわち、ソースコードの末尾に `\` を記述することはできません。
また、`\` と行終端文字の間に空白文字を入れることはできません。
