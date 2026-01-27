import type { Metadata } from "next";
import { Zen_Maru_Gothic } from "next/font/google";

import "./globals.css";

// Zen丸ゴシックの設定
const zenMaru = Zen_Maru_Gothic({
  weight: '500', //太さ
  subsets: ["latin"], // フォントの高速化
  display: "swap"
})

// メタデータ設定
export const metadata: Metadata = {
  title: "ふるーれのまーれ",
  description: "応用数学と個人開発が好きなSDS生の実験室。日々の学習記録と成果物を公開しています",
};

export default function RootLayout({
  children,
}: Readonly<{ // 読み取り専用
  children: React.ReactNode; //Reactの構成要素全般を許可
}>) {
  return (
    <html lang="ja">
      <body
        className={zenMaru.className}
      >
        {children} {/* 各tsxで作ったのがここに入る*/}
      </body>  
    </html>
  );
}
