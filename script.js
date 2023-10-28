// フォームの送信ボタンがクリックされたときにNFCタグに書き込む処理を実行
document.getElementById('writeForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // デフォルトのフォーム送信を防ぎます

    try {
        const textToWrite = document.getElementById('textWrite').value; // フォームから入力されたテキストを取得

        // NFCリーダーを有効化
        const ndef = new NDEFReader();

        // NFCリーダーがNFCタグを検出するのを待つ
        await ndef.scan();

        // NFCタグが検出されたら書き込みを行う
        const tag = await ndef.read();

        // 入力されたテキストをNFCタグに書き込む
        await tag.write({
            records: [{ recordType: "text", data: textToWrite }], // 入力されたテキストをNFCタグに書き込む
        });

        console.log('NFCタグにデータを書き込みました:', textToWrite);
    } catch (error) {
        console.error('NFCタグへの書き込み中にエラーが発生しました:', error);
    }
});
