//HTMLロード時実行にscanを行うことでAndroid本体からのNFC読み取りを防止する
window.addEventListener('load', async () => {
    const cardStatus = document.getElementById('cardStatus'); // カードの状態を表示する要素

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
});



// クリックされたときにNFCタグに書き込む処理を実行
const writeButton = document.getElementById('writeButton');
writeButton.addEventListener('click', async () => {

    const cardStatus = document.getElementById('cardStatus'); // カードの状態を表示する要素
    const writtenData = document.getElementById('dataText'); // 書き込んだデータを表示する要素
    const url = document.getElementById('urlWriteID').value; // 入力されたテキストを取得
    const protocolSelect = document.getElementById('protocolSelect').value; // プロトコルをセレクト要素の値から取得

    try {
        // プロトコルと入力されたテキストを結合してURLを作成
        const writeUrl = protocolSelect + url;

        // NFCリーダーを有効化
        const ndef = new NDEFReader();

        // カードの状態を「NFCカードをかざしてください」に更新
        cardStatus.textContent = 'NFCカードをかざしてください';

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
    } catch (error) {
        // カードの状態を「カードの状態：未検出」に更新
        cardStatus.textContent = 'カードの状態：未検出';

        // 書き込んだデータを「エラー」に更新し、エラーメッセージを表示
        writtenData.textContent = '書き込み中にエラーが発生しました： ' + error;

        console.log('NFCタグへの書き込み中にエラーが発生しました:', error);
    }
});



// クリックされたときにNFCタグを読み取る処理を実行
const readButton = document.getElementById('readButton');
readButton.addEventListener('click', async () => {
    console.log("A");
    const cardStatus = document.getElementById('cardStatus'); // カードの状態を表示する要素
    const readData = document.getElementById('dataText'); // 読み取ったデータを表示する要素

    try {
        // NFCリーダーを有効化
        const ndef = new NDEFReader();

        // カードの状態を「NFCカードをかざってください」に更新
        cardStatus.textContent = 'NFCカードをかざってください';

        // NFCリーダーがNFCタグを検出するのを待つ
        const message = await ndef.scan();

        // 読み取ったデータからカードのIDとURLを取得
        const cardId = message.records[0].id;
        const cardUrl = message.records[0].data;

        // カードの状態を「カードのIDとURLを読み取りました」に更新
        cardStatus.textContent = 'カードのIDとURLを読み取りました';

        // 読み取ったデータを「カードのID： [ID]、URL： [URL]」に更新し、表示
        readData.textContent = `カードのID： ${cardId}、URL： ${cardUrl}`;

        console.log('NFCタグからデータを読み取りました:', cardId, cardUrl);
    } catch (error) {
        // カードの状態を「カードの状態：未検出」に更新
        cardStatus.textContent = 'カードの状態：未検出';

        // 読み取ったデータを「エラー」に更新し、エラーメッセージを表示
        readData.textContent = '読み取り中にエラーが発生しました： ' + error;

        console.log('NFCタグの読み取り中にエラーが発生しました:', error);
    }
});
