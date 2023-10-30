//HTMLロード時実行
window.addEventListener('DOMContentLoaded', function () {

    const nfcStatusElement = document.getElementById('nfcStatus'); // 状態を表示するための要素

    try {
        const nfc = new NDEFReader(); // NFCリーダーオブジェクトを作成

        // NFCリーダーの状態を監視
        nfc.addEventListener('reading', () => {
            nfcStatusElement.textContent = 'NFCリーダーが有効です';
        });

        nfc.addEventListener('readingerror', (error) => {
            nfcStatusElement.textContent = 'NFCリーダーが無効です: ' + error.message;
        });
    } catch (error) {
        nfcStatusElement.textContent = 'NFCリーダーの初期化中にエラーが発生しました: ' + error.message;
    }
});

// フォームの送信ボタンがクリックされたときにNFCタグに書き込む処理を実行
document.getElementById('writeForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // デフォルトのフォーム送信を防ぎます

    const writtenDataElement = document.getElementById('writtenData'); // 書き込んだデータを表示する要素

    try {
        const url = document.getElementById('urlWriteID').value; // フォームから入力されたテキストを取得

        // 入力されたテキストをNFCタグに書き込む
        await nfc.write({
            records: [{ recordType: "url", data: url }]
        });

        // 書き込んだデータを表示
        writtenDataElement.textContent = '書き込んだデータ: ' + url;
        writtenDataElement.style.display = 'block'; // データを表示

        console.log('NFCタグにデータを書き込みました:', url);
    } catch (error) {
        console.error('NFCタグへの書き込み中にエラーが発生しました:', error);
    }
});
