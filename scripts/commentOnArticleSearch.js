// scripts/commentOnArticleSearch.js
// 薄いラッパー：既存のCLI引数・動作は維持しつつ、実装は共有ライブラリに委譲

import { runWithCore } from '@aa-0921/note-auto-core';

(async () => {
  await runWithCore(async ({ core, wantsBackground }) => {
    // ======================================
    // ここをカスタマイズしてください
    // ======================================
    
    // 検索ワード配列（実行のたびにランダムに選択されます）
    const searchWords = [
      '金欠',
      '貧乏',
      '収入',
      '低収入',
      '生活困窮',
      '節約',
      '副業',
      '貧困',
      'フォロバ',
      'フォロバ100',
    ];
    
    // 最大コメント数
    // const maxComments = 5;  // 例: 5
    
    // 動作テストのため、一旦1回に
    const maxComments = 5;  // 例: 5

    // コメントの最初に入れるフレーズ配列（ランダムで1つ選択されます）
    const commentOpeningPhrases = [
      '読ませていただきました🐛',
      '素敵な記事をありがとうございます💻',
      '面白かったです🔍',
      '参考になりました🐛',
      '大変勉強になりました💻',
      'おもしろいですね！🔍',
      'お気持ち、よくわかります🐛',
      '興味深く拝読しました💻',
      'おもしろい内容でした🔍',
    ];

    // ランダムで1つのフレーズを選択
    const selectedOpeningPhrase = commentOpeningPhrases[Math.floor(Math.random() * commentOpeningPhrases.length)];

    // コメントの最後に入れる前置きフレーズ配列（ランダムで1つ選択されます）
    const commentSuffixOpeningPhrases = [
      '🐛もしよろしければ',
      '💻よろしければ',
      '🔍もし差し支えなければ',
      '🐛差し支えなければ',
      '💻もし可能でしたら',
      '🔍もしお時間があれば',
      '🐛もし良かったら',
      '💻良かったら',
      '🔍もしお願いできれば',
      '🐛もしご都合がよろしければ',
      '💻もしお気が向いたら',
      '🔍もしお暇があれば',
      '🐛お時間が許せば',
      '💻もしお願いできましたら',
      '🔍お願いできましたら',
    ];

    // ランダムで1つの前置きフレーズを選択
    const selectedSuffixOpeningPhrase = commentSuffixOpeningPhrases[Math.floor(Math.random() * commentSuffixOpeningPhrases.length)];

    // コメントの先頭/末尾に付ける固定文（必要に応じてここを編集してください）
    const commentPrefix = `${selectedOpeningPhrase} コメント失礼いたします🐛フォロー・スキもさせていただきました💻`;
    const commentSuffix =
      `${selectedSuffixOpeningPhrase}、私の記事にもコメント・フォロー・スキをいただけますと大変励みになります🙇`;
    
    // コメント生成用のプロンプト（オプション、指定しない場合はデフォルトを使用）
    // プロンプト内で以下の変数を使用可能: {{title}}, {{headings}}, {{articleText}}
    const commentPrompt = undefined;  // デフォルトを使用する場合は undefined
    // 例: `以下の記事を読んで、適切なコメントを生成してください。\n\nタイトル: {{title}}\n見出し: {{headings}}\n本文: {{articleText}}`
    
    // コメント生成用のシステムメッセージ（オプション、指定しない場合はデフォルトを使用）
    // 完全に上書きする場合に使用（通常は additionalSystemMessage を使用することを推奨）
    const commentSystemMessage = undefined;  // デフォルトを使用する場合は undefined
    
    // ベースプロンプトに追加するプロンプト（オプション）
    // 例：アカウントごとの口調（男性・女性など）を指定
    const additionalPrompt = `40代の男性の口調で書いてください。
- 落ち着いた、ある程度フォーマルな表現を心がけてください
- 共感を示す表現（「同感です」「参考になります」「勉強になります」など）を適度に使ってください
- 丁寧さを保ちつつ、実務経験を感じさせる落ち着いた表現を心がけてください
- 感情的な表現は控えめに、でも記事の内容に対して誠実な共感や意見を示してください
- 40代男性らしい、経験に基づいた視点でコメントを書いてください
`;

    // ベースシステムメッセージに追加するメッセージ（オプション）
    // 例：アカウントの属性（年齢、性別など）を指定
    const additionalSystemMessage = `あなたは40代の男性ユーザーです。
落ち着いた、ある程度フォーマルな口調でコメントを書いてください。
共感を示しつつも、感情的な表現は控えめに、丁寧さと親しみやすさのバランスを保ってください。`;
    
    // ======================================
    
    console.log('=== 記事検索とコメント投稿処理を開始します ===');
    console.log('検索ワード配列:', searchWords);
    console.log('最大コメント数:', maxComments);
    console.log('');
    
    // オプション設定
    const options = {
      searchWords: searchWords,
      maxComments: maxComments,
      commentPrompt: commentPrompt,
      commentSystemMessage: commentSystemMessage,
      additionalPrompt: additionalPrompt,
      additionalSystemMessage: additionalSystemMessage,
      // AI生成本文の前後に固定文を付与（core側で付与）
      commentPrefix: commentPrefix,
      commentSuffix: commentSuffix
    };
    
    // 記事検索とコメント投稿を実行
    await core.runCommentOnArticleSearch(options);
    
    console.log('');
    console.log('✅ コメント投稿が完了しました');
  });
})();
