# chrome-extension-project

このプロジェクトは、Google Chrome用の拡張機能を作成するためのものです。以下に、プロジェクトの構成と各ファイルの役割を説明します。

## プロジェクト構成

```
chrome-extension-project
├── src
│   ├── background.js        // 拡張機能のバックグラウンドスクリプト
│   ├── content.js          // コンテンツスクリプト
│   ├── popup
│   │   ├── popup.html      // ポップアップのHTML構造
│   │   ├── popup.js        // ポップアップの動作を制御するJavaScript
│   │   └── popup.css       // ポップアップのスタイル
├── manifest.json           // 拡張機能のメタデータ
└── README.md               // プロジェクトのドキュメント
```

## 各ファイルの説明

- **src/background.js**: 拡張機能のライフサイクル管理やイベントリスナーを設定します。
- **src/content.js**: ウェブページに対して直接操作を行うためのコードが含まれています。
- **src/popup/popup.html**: ユーザーインターフェースの要素を定義しています。
- **src/popup/popup.js**: ユーザーのアクションに応じた処理を実装します。
- **src/popup/popup.css**: ポップアップのスタイルを定義します。
- **manifest.json**: 拡張機能の名前、バージョン、権限、スクリプトの設定などのメタデータを含みます。

## 使い方

1. このリポジトリをクローンまたはダウンロードします。
2. Chromeブラウザを開き、`chrome://extensions/`にアクセスします。
3. 右上の「デベロッパーモード」をオンにします。
4. 「パッケージ化されていない拡張機能を読み込む」をクリックし、`chrome-extension-project`フォルダを選択します。
5. 拡張機能がブラウザに追加されます。

このプロジェクトを通じて、Chrome拡張機能の基本的な構造と動作を学ぶことができます。