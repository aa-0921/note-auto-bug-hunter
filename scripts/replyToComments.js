// scripts/replyToComments.js
// 薄いラッパー：既存のCLI引数・動作は維持しつつ、実装は共有ライブラリに委譲

import { runWithCore } from '@aa-0921/note-auto-core';

(async () => {
  await runWithCore(async ({ core, wantsBackground }) => {
    // ======================================
    // ここをカスタマイズしてください
    // ======================================
    
    // ベースプロンプトに追加するプロンプト（オプション）
    // 例：アカウントごとの口調（男性・女性など）を指定
    const additionalPrompt = `40代の男性の口調で書いてください。
- 落ち着いた、ある程度フォーマルな表現を心がけてください
- 共感を示す表現（「同感です」「参考になります」「勉強になります」など）を適度に使ってください
- 丁寧さを保ちつつ、実務経験を感じさせる落ち着いた表現を心がけてください
- 感情的な表現は控えめに、でも記事の内容に対して誠実な共感や意見を示してください
- 40代男性らしい、経験に基づいた視点でコメントを書いてください`;

    // ベースシステムメッセージに追加するメッセージ（オプション）
    // 例：アカウントの属性（年齢、性別など）を指定
    const additionalSystemMessage = `あなたは40代の男性ユーザーです。
落ち着いた、ある程度フォーマルな口調で返信を書いてください。
共感を示しつつも、感情的な表現は控えめに、丁寧さと親しみやすさのバランスを保ってください。`;
    
    // ======================================
    
    console.log('=== コメント返信処理を開始します ===');
    console.log('');
    
    // オプション設定
    const options = {
      additionalPrompt: additionalPrompt,
      additionalSystemMessage: additionalSystemMessage,
    };
    
    // コメント返信を実行
    const result = await core.runReplyToComments(options);
    
    console.log('');
    console.log('✅ コメント返信が完了しました');
    console.log(`総返信成功件数: ${result.replyCount}件`);
    console.log(`処理した記事数: ${result.articlesProcessed}件 / ${result.totalArticles}件`);
  });
})();
