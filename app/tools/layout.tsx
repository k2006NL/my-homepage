// app/tools/layout.tsx
// ─────────────────────────────────────────────────────────────
// 「量産テンプレ」の心臓部。
// app/tools/ 配下のすべてのページにこの枠が自動適用される。
// 2個目以降のツールは app/tools/xxx/page.tsx に中身だけ書けば、
// ヘッダー・フッター・(将来の)広告枠が自動でついてくる。
//
// ★トップ(app/page.tsx)にはこの枠は適用されない
//   → 広告枠をここに置けば「ツールだけ広告・就活の顔はクリーン」が自動で実現
// ─────────────────────────────────────────────────────────────

import Link from "next/link";
import { FaArrowLeft, FaGithub } from "react-icons/fa";
import { SiZenn } from "react-icons/si";
import type { ReactNode } from "react";

export default function ToolsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-zinc-50 dark:bg-black min-h-screen">
      {/* ツール群共通ヘッダー(トップと同じトーンの白カード+backdrop) */}
      <header className="sticky top-0 z-20 bg-white/90 dark:bg-zinc-900/90 backdrop-blur border-b border-gray-300 dark:border-zinc-700">
        <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">
          <Link
            href="/tools"
            className="font-extrabold text-lg text-gray-800 dark:text-white flex items-center gap-2"
          >
            🛠 Tools
          </Link>
          <nav className="flex items-center gap-4 text-sm font-bold text-gray-400">
            <Link
              href="/"
              className="hover:text-blue-500 flex items-center gap-1 transition-colors group"
            >
              <FaArrowLeft className="text-xs group-hover:-translate-x-1 transition-transform" />
              Portfolio
            </Link>
            <Link href="/tools" className="hover:text-blue-500 transition-colors">
              All Tools
            </Link>
          </nav>
        </div>
      </header>

      {/* 各ツールの中身 */}
      <main className="max-w-5xl mx-auto p-5">{children}</main>

      {/* ───────────────────────────────────────────────
          ★将来の広告枠(今はコメントアウト。PVが育つ2年後に有効化)
          AdSense はこの <div> にだけ貼る。
          トップ(app/page.tsx)には影響しないのでクリーンなまま。
          ─────────────────────────────────────────────── */}
      {/*
      <div className="max-w-5xl mx-auto px-5 my-6">
        ここに AdSense のコードを後で入れる
      </div>
      */}

      <footer className="border-t border-gray-300 dark:border-zinc-700 mt-8">
        <div className="max-w-5xl mx-auto px-5 py-6 flex items-center justify-center gap-4 text-xs text-gray-400">
          <span>Built by k2006NL</span>
          <a
            href="https://zenn.dev/fleure"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 hover:text-[#3EA8FF] transition-colors"
          >
            <SiZenn /> Zenn
          </a>
          <a
            href="https://github.com/k2006NL"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 hover:text-blue-500 transition-colors"
          >
            <FaGithub /> GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
