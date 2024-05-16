# テーマ「Develop」

フロントエンドの開発環境が整備された a-blog cms の公式テーマです。

## ダウンロード

最新版のソースコードは以下のURLからダウンロードできます。
https://github.com/appleple/acms-develop

## GitHub からテーマを使用する手順

1. GitHub から最新版の Develop テーマのソースコードをダウンロードする
2. a-blog cms を設置した環境の themes ディレクトリ直下に develop ディレクトリを作成し、ダウンロードしたファイルを設置する
3. /setup フォルダをリネームしたフォルダ/bin/内に、　ダウンロードしたファイルに含まれている/\_bin/ディレクトリの develop ディレクトリを設置する（すでに develop ディレクトリがある場合は、上書きする）
4. メンテナンスプログラム（https://ドメイン/setup フォルダをリネームしたフォルダ/index.php）にアクセスする
5. 「インポート実行画面へ」を押下する
6. 「1. インポート先またはその親になるブログを選択してください。」で任意のものを選択、「2. インポートするブログデータ名を選択してください。」は「develop」を選択、「3. コンフィグ関連のインポート設定」は新規インストールの場合は全てチェックして、「インポートを実行する」を押下する

これで、サイトにアクセスすると Develop テーマがインストールされます。

## 利用しているライブラリ

- [Tailwind CSS](https://tailwindcss.com/)
- [Alpine.js](https://alpinejs.dev/)
- [htmx](https://htmx.org/)
- [Vite](https://ja.vitejs.dev/)
- [Pines](https://devdojo.com/pines)
- [tailwindcss typography](https://github.com/tailwindlabs/tailwindcss-typography)
