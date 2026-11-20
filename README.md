# my-homepage

自分のポートフォリオ兼リンク集です。

**公開URL**：https://my-homepage-gamma-cyan.vercel.app

## 載せているもの

- 作ったアプリ（MameLab：コーヒー抽出記録アプリ）と、関わったアプリ（バシコマ：一橋大学の時間割アプリ）
- 研究関連のお知らせ（YANS 2026 での発表など）
- AtCoder のレート（AtCoder の履歴 JSON から取得）
- Zenn の最新記事（RSS から取得）と、おすすめ記事
- Kaggle の実績

## 技術

- Next.js（App Router）/ React / TypeScript
- Tailwind CSS
- rss-parser（Zenn の RSS 取得）
- Vercel にデプロイ

## 構成

```
app/          ページ本体（page.tsx）とレイアウト
components/   SNSボタン、技術スタック表示などの部品
lib/          外部データの取得（AtCoder・Zenn）と、アカウント情報の一元管理
public/       画像
```

アカウント名やURLは `lib/accounts.ts` にまとめていて、ここだけ直せば全体に反映されます。

## ローカルで動かす

```bash
npm install
npm run dev
```

http://localhost:3000 で確認できます。
