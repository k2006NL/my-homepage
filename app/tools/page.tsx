// app/tools/page.tsx
// ─────────────────────────────────────────────────────────────
// ツール一覧ハブ。
// ツールが増えたら TOOLS 配列に1エントリ足すだけでカードが並ぶ。
// 「種を大量に蒔く」フェーズで、ここが管理の中心になる。
// ─────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tools | ふるーれのまーれ",
  description:
    "自然言語処理・機械学習まわりのブラウザ完結ツール集。トークナイザー可視化など、登録不要・無料で使えます。",
};

// ★ツールを増やすときはここに足すだけ
const TOOLS = [
  {
    href: "/tools/tokenizer",
    emoji: "🔤",
    title: "トークナイザー可視化",
    desc: "GPTのトークン数・分割・概算コストをその場で可視化",
    status: "公開中",
  },
  // 例: 2個目以降はこう足していく
  // {
  //   href: "/tools/image-preprocess",
  //   emoji: "🖼",
  //   title: "ML画像前処理プレビュー",
  //   desc: "グレースケール・リサイズ・正規化をブラウザで試す",
  //   status: "準備中",
  // },
];

export default function ToolsHubPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="pt-2">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 dark:text-white">
          🛠 Tools
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          NLP・機械学習まわりの、ブラウザだけで完結する道具箱。すべて無料・登録不要です。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {TOOLS.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group block p-6 bg-white dark:bg-zinc-900 rounded border border-gray-300 dark:border-zinc-700 hover:border-blue-500 transition-all"
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl shrink-0 bg-gray-100 dark:bg-zinc-800 p-3 rounded group-hover:scale-110 transition-transform">
                {tool.emoji}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="font-bold text-lg text-gray-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {tool.title}
                  </h2>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-100 dark:bg-blue-900/40 px-2 py-0.5 rounded shrink-0">
                    {tool.status}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">{tool.desc}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
