import type { Metadata } from "next";
import { M_PLUS_Rounded_1c } from "next/font/google";

import "./globals.css";

const mplusRounded = M_PLUS_Rounded_1c({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  display: "swap",
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
        className={mplusRounded.className}
      >
        {children} {/* 各tsxで作ったのがここに入る*/}
      </body>  
    </html>
  );
}
