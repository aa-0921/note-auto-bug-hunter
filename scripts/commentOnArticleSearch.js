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
- コメントの最初に必ず「コメント失礼します🐛フォロー・スキもさせていただきました💻」を追加してください
- コメントの最後に必ず「もしよろしければなのですが、私の記事にもコメント・フォロー・スキをいただけますと大変励みになります🙇」を追加してください`;

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
      additionalSystemMessage: additionalSystemMessage
    };
    
    // 記事検索とコメント投稿を実行
    await core.runCommentOnArticleSearch(options);
    
    console.log('');
    console.log('✅ コメント投稿が完了しました');
  });
})();
