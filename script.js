//HTMLロード時実行にscanを行うことでAndroid本体からのNFC読み取りを防止する
window.addEventListener('load', async () => {
    const cardStatus = document.getElementById('cardStatus'); // カードの状態を表示する要素

    try {
        // NFCリーダーを有効化
        const ndef = new NDEFReader();

        // NFCリーダーがNFCタグを検出するのを待つ
        await ndef.scan();

        // NFCリーダーがNFCカードを検出した場合に実行されるイベントリスナー
        ndef.addEventListener('reading', () => {
            cardStatus.textContent = 'カードの状態：検出'; // カードの状態を「検出」に更新
        });

        // NFCリーダーがエラーを検出した場合に実行されるイベントリスナー
        ndef.addEventListener('readingerror', (error) => {
            cardStatus.textContent = 'カードの状態：エラー ' + error.message; // カードの状態を「エラー」に更新し、エラーメッセージを表示
        });
    } catch (error) {
        console.log('NFCリーダーの有効化中にエラーが発生しました:', error);
        cardStatus.textContent = 'NFCリーダーの有効化中にエラーが発生しました';
    }
});



// クリックされたときにNFCタグに書き込む処理を実行
const writeButton = document.getElementById('writeButton');
writeButton.addEventListener('click', async () => {

    const cardStatus = document.getElementById('cardStatus'); // カードの状態を表示する要素
    const writtenData = document.getElementById('dataText'); // 書き込んだデータを表示する要素
    const url = document.getElementById('urlWriteID').value; // 入力されたテキストを取得
    const protocolSelect = document.getElementById('protocolSelect').value; // プロトコルをセレクト要素の値から取得

    // カードの状態を「NFCカードをかざしてください」に更新
    cardStatus.textContent = 'NFCカードをかざしてください';

    try {
        // プロトコルと入力されたテキストを結合してURLを作成
        const writeUrl = protocolSelect + url;

        // NFCリーダーを有効化
        const ndef = new NDEFReader();

        // NFCリーダーがNFCタグを検出するのを待つ
        await ndef.scan();

        // 入力されたテキストをNFCタグに書き込む
        await ndef.write({
            records: [{ recordType: "url", data: writeUrl }], // 入力されたテキストをNFCタグに書き込む
        });
        // URLの形式はhttps://から書き始める必要がある。　例：https://www.google.com

        // 書き込んだデータを「書きこんだデータ」に更新し、urlを表示
        writtenData.textContent = '書き込んだデータ： ' + writeUrl;

        console.log('NFCタグにデータを書き込みました:', writeUrl);

        // カードの状態を「カードの状態：未検出」に更新
        cardStatus.textContent = 'カードの状態：未検出';
    } catch (error) {
        // カードの状態を「カードの状態：エラー」に更新
        cardStatus.textContent = 'カードの状態：エラー';

        // 書き込んだデータを「エラー」に更新し、エラーメッセージを表示
        writtenData.textContent = '書き込み中にエラーが発生しました： ' + error;

        console.log('NFCタグへの書き込み中にエラーが発生しました:', error);
    }
});



// クリックされたときにNFCタグを読み取る処理を実行
readButton.addEventListener('click', async () => {
    const cardStatus = document.getElementById('cardStatus'); // カードの状態を表示する要素
    const readData = document.getElementById('dataText'); // 読み取ったデータを表示する要素
    const ndef = new NDEFReader(); // NFCリーダーを有効化

    let readingEvent = null; // 読み取りイベントを保存する変数

    // カードの状態を「NFCカードをかざしてください」に更新
    cardStatus.textContent = 'NFCカードをかざしてください';
    try {

        // NFCリーダーがNFCタグを検出するのを待つ
        await ndef.scan();

        // 新しいイベントリスナーを作成
        readingEvent = async (event) => {
            try {
                // 読み取られたデータを処理
                const records = event.message.records;

                // 最初のレコードがURLの場合、URLを表示
                if (records.length > 0 && records[0].recordType === 'url') {
                    const url = new TextDecoder().decode(records[0].data);
                    readData.textContent = `読み込んだデータ: ${url}`;
                    console.log('NFCタグからデータを読み取りました:', url);
                } else {
                    readData.textContent = 'サポートされていないレコードタイプ';
                }

                // カードの状態を「カードの状態：未検出」に更新
                cardStatus.textContent = 'カードの状態：未検出';
            } catch (error) {
                // カードの状態を「カードの状態：エラー」に更新
                cardStatus.textContent = 'カードの状態：エラー';
                console.log('NFCタグのデータ処理中にエラーが発生しました:', error);
            }

            // 既存のイベントリスナーがあれば削除
            if (readingEvent) {
                ndef.removeEventListener('reading', readingEvent);
                readingEvent = null; // 既存のリスナーを削除して変数をリセット
            }
        };

        // イベントリスナーを追加
        ndef.addEventListener('reading', readingEvent);

    } catch (error) {
        // カードの状態を「カードの状態：エラー」に更新
        cardStatus.textContent = 'カードの状態：エラー';

        // 読み取ったデータを「エラー」に更新し、エラーメッセージを表示
        readData.textContent = '読み取り中にエラーが発生しました： ' + error;

        console.log('NFCタグの読み取り中にエラーが発生しました:', error);
    }
});
