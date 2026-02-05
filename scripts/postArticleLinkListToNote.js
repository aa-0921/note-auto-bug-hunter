// scripts/postArticleLinkListToNote.js
// 自アカウント群の最新記事＋検索で取得した他者記事のURLをAB交互に並べた記事をnoteに投稿する

import { runWithCore } from '@aa-0921/note-auto-core';

(async () => {
  await runWithCore(async ({ core }) => {
    // ======================================
    // アカウントごとにカスタマイズしてください
    // ======================================

    // 自分のアカウントID（このアカウント自身は、自アカウント候補リストから除外する）
    const currentAccount = 'bug_hunter';

    // 記事タイトル候補（絵文字と言い回しのみ変更。ランダムに1つ選択）
    const titleCandidates = [
      '🐛 注目のピックアップ記事一覧',
      '💻 読んでほしい記事まとめ',
      '🔍 おすすめ記事リンク集',
      '🐛 厳選！気になる記事をピックアップ',
      '💻 保存しておきたい記事一覧',
      '🔍 気になった記事をまとめました',
      '🐛 おすすめ記事リンク',
      '💻 ピックアップ記事リンク集',
      '🔍 注目記事をチェック',
    ];
    const title = titleCandidates[Math.floor(Math.random() * titleCandidates.length)];

    // 本文の冒頭テキスト（任意。空文字の場合はURL一覧のみ）
    const bodyIntro = ``;

    // 検索キーワード配列（commentOnArticleSearch.js の searchWords をベースに設定）
    const searchKeywords = [
      'フォロバ',
      'フォロバ100',
      '金欠',
      '貧乏',
      '収入',
      '低収入',
      '生活困窮',
      '節約',
      '副業',
      '貧困',
      'バグ',
      'エラー',
      'デバッグ',
      'プログラミング',
      '開発',
      '技術',
      'IT',
      'エンジニア',
      'コード',
      'システム',
      'トラブルシューティング',
      '修正',
      '改善',
      '最適化',
    ];

    // ======================================

    console.log('=== リンク一覧記事の投稿を開始します ===');
    console.log(`タイトル: ${title}`);
    console.log(`検索キーワード数: ${searchKeywords.length}`);
    console.log('');

    const result = await core.runPostArticleLinkListToNote({
      title,
      bodyIntro,
      searchKeywords,
      currentAccount,
      // targetAccounts を指定しない場合は core の DEFAULT_LIKE_TARGET_ACCOUNTS から5件ランダム選択
    });

    console.log('');
    console.log('✅ リンク一覧記事の処理が完了しました');
    console.log(`自アカウント記事URL: ${result.urlsFromOwnAccounts?.length ?? 0}件`);
    console.log(`検索で取得したURL: ${result.urlsFromSearch?.length ?? 0}件`);
    console.log(`掲載したURL合計: ${result.interleavedUrls?.length ?? 0}件`);
  });
})();

