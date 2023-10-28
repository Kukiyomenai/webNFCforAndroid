// フォームの送信ボタンがクリックされたときにNFCタグに書き込む処理を実行
document.getElementById('writeForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // デフォルトのフォーム送信を防ぎます

    try {
        const textToWrite = document.getElementById('textWrite').value;

        // NFCリーダーを有効化
        const ndef = new NDEFReader();

        // // NFCリーダーがNFCタグを検出するのを待つ
        // await ndef.scan();

        // // NFCタグが検出されたら書き込みを行う
        // const tag = await ndef.read();

        // // 書き込むデータを作成（テキストデータをUTF-8バイトに変換）
        // const encoder = new TextEncoder();
        // const dataToWrite = encoder.encode(textToWrite);

        // // NFCタグにデータを書き込む
        // await tag.write(dataToWrite);

        console.log('NFCタグにデータを書き込みました:', textToWrite);
    } catch (error) {
        console.error('NFCタグへの書き込み中にエラーが発生しました:', error);
    }
});
