# テーマ「develop」Ver.1.0.3

## バンドル環境の使い方

### インストール

**themes/develop/** に移動して、下記のコマンドを実行します。実行することでビルドに必要なツールなどがインストールされます。

```bash
$ npm install
```

### ビルドコマンド

#### 本番用ビルド

cssのbuildとjsのbuildを行います。 **納品時にはこのコマンドを実行して納品してください。** JavaScriptが productionビルド となります。

```bash
$ npm run build
```

#### 開発用ビルド

以下のコマンドを実行すると、cssとjsの変更をwatchしてビルドを行います。余分なコードが入ったり、最適化されないため**納品時には必ず npm run build **しましょう。

```bash
$ npm run dev
```


## 組み込みJSの読み込みについて

JavaScriptは、**include/head/js.twig** で読んでいます。
developテーマではパフォーマンス向上のために、**Touch_SessionWithContribution**を使って、投稿者以上以上の場合だけ読み込むようにしています。

```twig
{% if touch('Touch_SessionWithContribution') %}
<script src="{{ JS_LIB_JQUERY_DIR }}jquery-{{JS_LIB_JQUERY_DIR_VERSION}}.min.js" charset="UTF-8"></script>
<script src="{{ ROOT_DIR }}acms.js{{ js.arguments }}" charset="UTF-8" id="acms-js"></script>
{% endif %}
```

組み込みJSを読まないようにすると、スライダーや、画像ビューワーなどの組み込みJSが動作しなくなりますが、一部のよく利用する組み込みJSをsrc/js/lib/buildIn/に実装し、src/js/main.jsで読み込んでいます。

```javascript
import {
  // 組み込みJS
} from './lib/buildIn/';
```

これ以外に必要な機能やライブラリは、自分でインストール、実装する必要があります。
バンドル環境が整っていますので、 npm経由でライブラリをもってきて、 importする方式をお勧めします。以下 lazy load を実装する例になります。

```bash
$ npm i vanilla-lazyload
```

```javascript
import LazyLoad from 'vanilla-lazyload';

domContentLoaded(() => {
  new LazyLoad({elements_selector: '.js-lazy-load'});
});
```
