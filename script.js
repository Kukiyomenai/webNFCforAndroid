// フォームの送信ボタンがクリックされたときにNFCタグに書き込む処理を実行
document.getElementById('writeForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // デフォルトのフォーム送信を防ぎます

    try {
        const textToWrite = document.getElementById('textWrite').value; // フォームから入力されたテキストを取得

        // NFCリーダーを有効化
        const ndef = new NDEFReader();

        // NFCリーダーがNFCタグを検出するのを待つ
        await ndef.scan();

        // 入力されたテキストをNFCタグに書き込む
        await ndef.write({
            records: [{ recordType: "url", data: textToWrite }], // 入力されたテキストをNFCタグに書き込む
        });
        // URLの形式はhttps://から書き始める必要がある。　例：https://www.google.com

        console.log('NFCタグにデータを書き込みました:', textToWrite);
    } catch (error) {
        console.error('NFCタグへの書き込み中にエラーが発生しました:', error);
    }
});
