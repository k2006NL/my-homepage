// app/tools/tokenizer/page.tsx
// ─────────────────────────────────────────────────────────────
// サーバーコンポーネント。
// ★ここで metadata を上書きする = ルートの "ふるーれのまーれ" 固定を脱却し、
//   このページ独自の title/description で検索に引っかかるようにする(SEOの肝)。
// 実際のインタラクティブ処理は TokenizerClient(クライアント)に委譲。
// ─────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import TokenizerClient from "./TokenizerClient";

export const metadata: Metadata = {
  title: "トークナイザー可視化ツール | GPTのトークン数を数える",
  description:
    "テキストを貼るだけで、GPT-4o / GPT-4.1 系のトークン数・分割・入力+出力コストをブラウザ上で可視化。用途別プリセット(要約/翻訳/チャット/コード生成)でAPIコストを概算。日本語対応。",
  // 将来 独自ドメイン化したら openGraph 等もここに足せる
  keywords: ["トークナイザー", "トークン数", "GPT", "LLM", "トークン 数える", "API コスト"],
};

export default function TokenizerPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* タイトル部(サーバーレンダリング=検索エンジンが読む) */}
      <div className="pt-2">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 dark:text-white">
          トークナイザー可視化ツール
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
          テキストを貼ると、各LLMが何トークンに分割するかを可視化します。トークン数・文字数・概算APIコストもその場で計算。すべてブラウザ内で処理するので、入力した文章が送信されることはありません。
        </p>
      </div>

      {/* ツール本体(クライアント) */}
      <TokenizerClient />

      {/* 解説セクション(SEO用の独自テキスト。Zennの記事へ誘導) */}
      <div className="bg-white dark:bg-zinc-900 p-6 md:p-8 rounded border border-gray-300 dark:border-zinc-700 mt-2">
        <h2 className="text-xl font-extrabold text-gray-800 dark:text-white mb-4">
          トークンとは?
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
          LLMは文章をそのまま読むのではなく、「トークン」と呼ばれる単位に分割して処理します。英語では単語に近い単位ですが、日本語では文字や部分文字列の単位になりやすく、同じ文字数でも言語によってトークン数が変わります。
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          APIの料金はこのトークン数で決まるため、コストを見積もるには実際のトークン数を知ることが重要です。このツールはその確認を手早く行うために作りました。
        </p>
      </div>
    </div>
  );
}
