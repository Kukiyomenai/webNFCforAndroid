document.getElementById('writeForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // デフォルトのフォーム送信を防ぎます
    try {
        // 書き込む内容を取得
        const textToWrite = document.getElementById('textWrite').value;

        // 1. NDEF メッセージを作成
        //const message = new NDEFMessage([new NDEFTextRecord(textToWrite)]);

        // 2. NFC リーダーのインスタンスを作成
        const ndef = new NDEFWriter();

        // 3. Sony RC-S380 デバイスと通信を確立
        await ndef.write(usbDevice, textToWrite);

        console.log('NFC タグにデータを書き込みました:', textToWrite);
    } catch (error) {
        console.error('NFC タグへの書き込み中にエラーが発生しました:', error);
    }
});
