import { NextResponse } from 'next/server';
export const fetchAtCoderRate = async (username: string): Promise<number> => {
  try {
    const res = await fetch(`https://atcoder.jp/users/${username}/history/json`, {
      next: { revalidate: 3600 }
    });

    if (!res.ok) return 0;

    const data = await res.json(); 

    if (Array.isArray(data) && data.length > 0) {
      // 最新のコンテストの結果からレート（NewRating）を抽出
      return data[data.length - 1].NewRating;
    }
    return 0;
  } catch (e) {
    console.error(e);
    return 0;
  }
};

export const getAtCoderColor = (rate: number) => {
  if (rate < 400) return "text-gray-500"; // 灰
  if (rate < 800) return "text-[#804000]"; // 茶
  if (rate < 1200) return "text-green-600"; // 緑
  if (rate < 1600) return "text-cyan-600"; // 水
  if (rate < 2000) return "text-blue-600"; // 青
  if (rate < 2400) return "text-yellow-500"; // 黄
  if (rate < 2800) return "text-orange-500"; // 橙
  return "text-red-600"; // 赤
};