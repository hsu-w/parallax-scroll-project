# nadia web starter kit

## インストール

### macOS

- [Homebrew](https://brew.sh/index_ja.html)
- [nodenv](docs/nodenv.md)

### Windows

- [nodist](docs/nodist.md)

### VS Code Extensions

- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## セットアップ

```sh
npm i
```

## 開発

```sh
npm start
```

http://localhost:3000

## ビルド

```sh
npm run build
```

css と js が圧縮され、ソースマップは出力されません。

## 機能

- [Pug](https://pugjs.org/api/getting-started.html) ([pug-cli](https://github.com/pugjs/pug-cli)) / [EJS](https://ejs.co/) ([ejs-cli](https://github.com/fnobi/ejs-cli))
- [Sass](https://sass-lang.com/) ([dart-sass](https://github.com/sass/dart-sass))
- [PostCSS](https://postcss.org/) ([postcss-cli](https://github.com/postcss/postcss-cli))
  - [Autoprefixer](https://github.com/postcss/autoprefixer)
  - [clean-css](https://github.com/clean-css/clean-css) ([clean-css-cli](https://github.com/clean-css/clean-css-cli))
- [webpack](https://webpack.js.org/)
- [Babel](https://babeljs.io/)
- [imagemin](https://github.com/imagemin/imagemin) ([imagemin-cli](https://github.com/imagemin/imagemin-cli))
- [Stylelint](https://stylelint.io/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Browsersync](https://browsersync.io/)

## HTML - Pug / EJS

テンプレートエンジンはどちらも使用できます。

ファイル名の先頭に `_` が入るファイルは `htdocs` に吐き出されません。  
インクルードのディレクトリに指定はありません。

### ⚠

ファイル名の先頭に `_tpl_` が入るファイルは Pug ではコンパイル対象外となります。（EJS はコンパイル対象）  
PHP フォームテンプレートを使用する際は注意してください。

### ディレクトリ変更

ディレクトリを変更する場合は `package.json` を編集してください。

#### Pug

_package.json: Line 20_

```
"pug": "pug src -o htdocs -P",
```

#### EJS

_package.json: Line 21_

```
"ejs": "ejs-cli --base-dir src \"/**/{_tpl_,!(_)}*.ejs\" -o htdocs",
```

## CSS - Sass / PostCSS (Autoprefixer, clean-css) / webpack

`.gitkeep` は削除してください。

### インポート

エントリーポイントの JavaScript ファイルで `.scss` をインポートします。

_src/assets/js/index.js: Line 1_

```
import "../../assets/scss/app.scss";
```

### 出力ディレクトリ変更

出力ディレクトリを変更する場合は `webpack.config.js` と `package.json` を編集してください。

_webpack.config.js: Line 79_

```
filename: "./htdocs/assets/css/app.css",
```

_package.json: Line 18_

```
"cleancss": "cleancss -o htdocs/assets/css/app.css htdocs/assets/css/app.css",
```

### ライブラリの使用

相対パスで指定してください。

```scss
@use "../../../node_modules/path/to/file.ext";
```

## JavaScript - webpack / Babel

### ディレクトリ変更

ディレクトリを変更する場合は `webpack.config.js` を編集してください。

_webpack.config.js: Line 9_

```
entry: "./src/assets/js/index.js",
```

_webpack.config.js: Line 12_

```
filename: "./htdocs/assets/js/app.js",
```

### 設定変更

各設定ファイルを編集してください。

_webpack_  
`webpack.config.js`

_Babel_  
`babel.config.js`

## 画像圧縮 - imagemin

`*.jpg`, `*.jpeg`, `*.png`, `*.gif`, `*.svg` を圧縮します。

### ディレクトリ変更

ディレクトリを変更する場合は `package.json` と `imagemin.js` を編集してください。

_package.json: Line 15_

```
"watch:images": "onchange -i \"src/assets/images/**/*.{jpg,jpeg,png,gif,svg}\" -- npm run imagemin {{changed}}",
```

_imagemin.js: Line 7-10_

```
const file =
  changed !== "" && changed
    ? [changed]
    : ["./src/assets/images/**/*.{jpg,jpeg,png,gif,svg}"];
```

_imagemin.js Line 24_

```
return output.replace(/images\//, "../../htdocs/assets/images/");
```

## 構文チェック - Stylelint / ESLint

npm-scripts のタスクには含まず、エディタ側で機能します。

リンター単体でのコード整形は行いません。  
設定したルールに沿って警告・エラーをコンソールに出力します。

### 設定変更

デフォルトでは推奨設定を使用しています。  
変更する場合は各設定ファイルを編集してください。

_Stylelint_  
`.stylelintrc.js`

_ESLint_  
`.eslintrc.js`

## コード整形 - Prettier

npm-scripts のタスクには含まず、エディタ側で機能します。  
Stylelint / ESLint の設定と Prettier のデフォルト設定に沿って保存時にコード整形を行います。

### 設定変更

設定を変更する場合はルートに `.prettierrc.js` を作成してください。

### ファイルを無視する

エディタの設定で Prettier をデフォルトフォーマッタとして指定している場合は javascript と scss 以外のファイルもコード整形が有効になります。  
無視するファイルを指定する場合はルートに `.prettierignore` を作成してください。

## ローカルサーバー - Browsersync

### 設定変更

設定を変更する場合は `bs-config.js` を編集してください。

頻繁に使用しそうな設定の記述箇所は下記に記載します。

#### ベースディレクトリの変更

_bs-config.js: Line 4_

```
baseDir: "htdocs",
```

#### 自動起動

_bs-config.js: Line 7_

```
open: false,
```

`localhost:3000` を起動したい場合はコメントアウトのみで問題ありません。  
※ コンパイルと同時に立ち上がるため、起動時には `Cannot GET /` となります。

#### MAMP, XAMPP などでローカルサーバーを立ち上げる場合

_bs-config.js: Line 6_

```
proxy: false,
```

`proxy` オプションにローカルサーバーの URL を設定してください。  
`server` オプションは削除してください。

## ターゲットブラウザの設定

https://github.com/browserslist/browserslist#queries

ターゲットブラウザは各ブラウザの最新 2 バージョンとしています。  
変更する場合は `package.json` を編集してください。

_package.json: Line 25-27_

```
"browserslist": [
  "last 2 version"
],
```

## WordPress ファイルについて

WordPress のファイルは `htdocs/wp` にインストールされるようにしてください。  
インストール先のディレクトリを変更する場合は削除タスクを調整する必要があるため、`package.json` を編集してください。

### ⚠

ディレクトリを変更する際は必ず作業前の動作確認・作業途中のファイルの git コミットを行ってから開発を進めてください。  
正しく設定できていない場合、作業した WordPress 関連ファイルが全て削除される可能性があります。

_package.json: Line 10_

```
"clean:dist": "del-cli -f \"htdocs/**\" \"!htdocs/**/.*\" \"!htdocs/wp\" \"!htdocs/index.php\"",
```

## コンパイル対象外のファイルについて

コンパイル対象外のファイルは `htdocs` にコピーします。  
不可視ファイルはコピーの対象外となるので、必要な場合は `htdocs` に直接作成するようにしてください。

## 削除タスクについて

開発タスク／ビルドタスクを実行した際、一番初めに一度のみ `htdocs` を削除します。  
不可視ファイルは削除対象外となります。

開発タスク実行中は不要ファイルは削除されません。  
同名ファイルは上書きになるので開発に影響はありませんが、納品時にビルドコマンドを叩かずに不要ファイルを納品してしまうことのないよう注意してください。

## 同梱ライブラリ

- [normalize.css](https://necolas.github.io/normalize.css/) (v8.0.1)
- [html5-reset](https://github.com/murtaugh/HTML5-Reset) (v2.1.3)
- [jquery](https://jquery.com/) (v3.6.0)

※ jquery はインポート不要で使用可能にしています。

## 更新履歴

### 4.0.0 (2022-02)

- gulp 廃止、npm-scripts に移行

### 4.0.1 (2022-10)

- scss のコンパイルを webpack で行うよう変更
- ビルド時に app.js にライセンスコメントが含まれない問題を修正

### 4.0.2 (2022-11)

- 開発中の画像圧縮時に、変更したファイル以外の画像が圧縮前の状態で htdocs に出力される問題を修正

### [<=3.x.x Changelog](https://github.com/nadia-inc/nodejs-web/tree/v3.0.4/nadia-web-starter-kit#%E6%9B%B4%E6%96%B0%E5%B1%A5%E6%AD%B4)
