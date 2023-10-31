//HTMLロード時実行にscanを行うことでAndroid本体からのNFC読み取りを防止する
window.addEventListener('load', async () => {
    // NFCリーダーを有効化
    const ndef = new NDEFReader();

    // NFCリーダーがNFCタグを検出するのを待つ
    await ndef.scan();

    nfc.addEventListener('reading', () => {
        nfcStatusElement.textContent = 'NFCリーダーが有効です';
        cardStatusElement.textContent = 'カードの状態：検出';
    });

    nfc.addEventListener('readingerror', (error) => {
        nfcStatusElement.textContent = 'NFCリーダーが無効です: ' + error.message;
        cardStatusElement.textContent = 'カードの状態：未検出';
    });
});



// フォームの送信ボタンがクリックされたときにNFCタグに書き込む処理を実行
document.getElementById('writeForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // デフォルトのフォーム送信を防ぎます

    const writtenDataElement = document.getElementById('writtenData'); // 書き込んだデータを表示する要素

    try {
        const url = document.getElementById('urlWriteID').value; // フォームから入力されたテキストを取得

        // NFCリーダーを有効化
        const ndef = new NDEFReader();

        // NFCリーダーがNFCタグを検出するのを待つ
        await ndef.scan();

        // 入力されたテキストをNFCタグに書き込む
        await ndef.write({
            records: [{ recordType: "url", data: url }], // 入力されたテキストをNFCタグに書き込む
        });
        // URLの形式はhttps://から書き始める必要がある。　例：https://www.google.com

        // 書き込んだデータを表示
        writtenDataElement.textContent = '書き込んだデータ: ' + url;
        writtenDataElement.style.display = 'block'; // データを表示

        console.log('NFCタグにデータを書き込みました:', url);
    } catch (error) {
        console.error('NFCタグへの書き込み中にエラーが発生しました:', error);
    }
});
