import Parser from 'rss-parser';
import { ACCOUNTS } from './accounts';

export const PICKUP_ARTICLES = [
    {
        title:"パーセプトロン収束定理の証明とPythonでの検証　深層学習のための再履修",
        url: "https://zenn.dev/fleure/articles/perceptron-convergence-proof",
        emoji:"🐍",
    }
];

export async function getZennArticles() { //非同期
    const parser = new Parser();

    try {
        // データ取得が終わるまで待って貰う
        const feed = await parser.parseURL(`https://zenn.dev/${ACCOUNTS.zenn.username}/feed`)
        return feed.items.slice(0, 3) // 最新3つの取得
    } catch (error) { // 失敗したら
        console.error("Zenn failure", error); // エラー表示（デバッグ用）
        return [];
    }
}