import Image from "next/image";
import { FaGithub, FaFire, FaArrowRight, FaGooglePlay } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import SocialButton from "@/components/SocialButton";
import { getZennArticles, PICKUP_ARTICLES } from "@/lib/zenn";
import { fetchAtCoderRate, getAtCoderColor } from "@/lib/atcoder";
import { ACCOUNTS } from "@/lib/accounts";
import {
  SiTypescript, SiReact, SiNextdotjs, SiTailwindcss,
  SiPython, SiR, SiCplusplus, SiZenn, SiMysql, SiKaggle
} from "react-icons/si"; // 技術系アイコン

export default async function Home() {

  // 先にZennの記事データを取得
  const latestArticles = await getZennArticles();

  const atcoderRate = await fetchAtCoderRate(ACCOUNTS.atcoder.username)
  console.log(atcoderRate)

  const kaggle = ACCOUNTS.kaggle;

  return (
    <>
      <div className="w-full h-64 flex items-center justify-center bg-cover bg-center bg-[url('/images/home-header.jpg')]">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-widest text-gray-800 dark:text-white
          bg-white/90 dark:bg-zinc-900/90
          px-10 py-4 rounded-full
          shadow-xl dark:shadow-zinc-800/30 border border-blue-100"
        >
          ふるーれのまーれ
        </h1>
      </div>

      {/* 左カラム */} 
      <div className="bg-zinc-50 dark:bg-black min-h-screen p-5">
        <main className="max-w-5xl mx-auto flex flex-col md:flex-row gap-6 items-start justify-center">
          
          
          {/* 左サイドバー */}
          <div className="w-full md:w-1/3 flex flex-col gap-6 order-2 md:order-1">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <Image
                  src="/images/AtCoder-logo.png"
                  alt="AtCoder Icon"
                  width={80}
                  height={50}
                />
                
                <p className="font-bold text-xl mb-4 text-gray-800 dark:text-gray-100">
                  Algorithm 
                </p>
                <p className={`${getAtCoderColor(atcoderRate)} font-extrabold text-2xl mb-4`}>
                  {atcoderRate > 0 ? atcoderRate : "Unrated"}
                </p>

              </div>
            </div>
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800">
              <p className="font-bold text-xl mb-4 text-gray-800 dark:text-gray-100">作ったアプリ</p>
              <a 
                href="https://play.google.com/store/apps/details?id=com.mamelog"
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-all hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-4">
                  
                  {/* 画像エリア */}
                  <div className="shrink-0 relative">
                    <Image
                      src="/images/mamelab-icon.png"
                      alt="MameLab Icon"
                      width={60}
                      height={60}
                      className="rounded-xl shadow-md group-hover:scale-105 transition-transform"
                    />
                  </div>
                  
                  {/* テキストエリア */}
                  <div>
                    <h3 className="font-bold text-lg text-blue-900 dark:text-blue-100 flex items-center gap-2">
                      MameLab
                    </h3>
                    <p className="text-xs text-blue-400 dark:text-blue-300 mt-1 font-medium">
                      コーヒー抽出記録アプリ ☕
                    </p>
                  </div>
                </div>
              </a>
            </div>

            

            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800">
              <p className="font-bold text-xl mb-4 text-gray-800 dark:text-gray-100">SNS</p>
              <div className="flex gap-4">
                <SocialButton
                  href={ACCOUNTS.twitter.url}
                  icon={<FaXTwitter className="text-4xl" />}
                />
                <SocialButton
                  href={ACCOUNTS.github.url}
                  icon={<FaGithub className="text-4xl" />}
                />
              </div>
            </div>  
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800">
              <p className="font-bold text-xl mb-4 text-gray-800 dark:text-gray-100">Skills (学習中)</p>
              
              <div className="flex flex-wrap gap-3">
                {/* Python */}
                <div className="flex flex-col items-center gap-1 p-3 border border-gray-100 dark:border-zinc-800 rounded-xl min-w-[70px]">
                   <SiPython className="text-2xl text-[#3776AB]" />
                   <span className="text-[10px] font-bold text-gray-500">Python</span>
                </div>

                {/* R */}
                <div className="flex flex-col items-center gap-1 p-3 border border-gray-100 dark:border-zinc-800 rounded-xl min-w-[70px]">
                   <SiR className="text-2xl text-[#276DC3]" />
                   <span className="text-[10px] font-bold text-gray-500">R</span>
                </div>

                {/* C++ */}
                <div className="flex flex-col items-center gap-1 p-3 border border-gray-100 dark:border-zinc-800 rounded-xl min-w-[70px]">
                   <SiCplusplus className="text-2xl text-[#00599C]" />
                   <span className="text-[10px] font-bold text-gray-500">C++</span>
                </div>

                {/* MySQL */}
                <div className="flex flex-col items-center gap-1 p-3 border border-gray-100 dark:border-zinc-800 rounded-xl min-w-[70px]">
                   <SiMysql className="text-2xl text-[#00599C]" />
                   <span className="text-[10px] font-bold text-gray-500">MySQL</span>
                </div>

                {/* TypeScript */}
                <div className="flex flex-col items-center gap-1 p-3 border border-gray-100 dark:border-zinc-800 rounded-xl min-w-[70px]">
                   <SiTypescript className="text-2xl text-[#3178C6]" />
                   <span className="text-[10px] font-bold text-gray-500">TS</span>
                </div>

                {/* React */}
                <div className="flex flex-col items-center gap-1 p-3 border border-gray-100 dark:border-zinc-800 rounded-xl min-w-[70px]">
                   <SiReact className="text-2xl text-[#61DAFB]" />
                   <span className="text-[10px] font-bold text-gray-500">React</span>
                </div>

                {/* Next.js */}
                <div className="flex flex-col items-center gap-1 p-3 border border-gray-100 dark:border-zinc-800 rounded-xl min-w-[70px]">
                   <SiNextdotjs className="text-2xl text-black dark:text-white" />
                   <span className="text-[10px] font-bold text-gray-500">Next.js</span>
                </div>

                {/* Tailwind */}
                <div className="flex flex-col items-center gap-1 p-3 border border-gray-100 dark:border-zinc-800 rounded-xl min-w-[70px]">
                   <SiTailwindcss className="text-2xl text-[#06B6D4]" />
                   <span className="text-[10px] font-bold text-gray-500">Tailwind</span>
                </div>
              </div>    
            </div>   
          </div>
          

          {/* 右カラム */}
          <div className="w-full md:w-2/3 flex flex-col gap-6 order-1 md:order-2">

            {/* Kaggle 実績ゾーン */}
            <div className="bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800">
              {/* ヘッダーエリア */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100 dark:border-zinc-800">
                <h2 className="text-2xl md:text-3xl font-extrabold flex items-center gap-2 text-gray-800 dark:text-white">
                  <SiKaggle className="text-[#20BEFF]" /> Kaggle
                </h2>
                <a
                  href={kaggle.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold text-gray-400 hover:text-[#20BEFF] flex items-center gap-1 transition-colors group"
                >
                  Profile <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* ティアバッジ */}
              <div className="flex items-center gap-3 mb-6">
                <span className={`text-lg font-extrabold ${kaggle.tierColor}`}>
                  {kaggle.tier}
                </span>
                <span className="text-xs text-gray-400">@{kaggle.username}</span>
              </div>

              {/* メダル表 */}
              <div className="grid grid-cols-3 gap-3">
                {(["competitions", "notebooks", "discussions"] as const).map((cat) => (
                  <div
                    key={cat}
                    className="bg-gray-50 dark:bg-zinc-800/50 rounded-xl p-3 border border-gray-100 dark:border-zinc-700"
                  >
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 capitalize">
                      {cat}
                    </p>
                    <div className="flex gap-2">
                      <span className="flex flex-col items-center gap-0.5">
                        <span className="text-base">🥇</span>
                        <span className="text-xs font-bold text-gray-600 dark:text-gray-300">
                          {kaggle.medals[cat].gold}
                        </span>
                      </span>
                      <span className="flex flex-col items-center gap-0.5">
                        <span className="text-base">🥈</span>
                        <span className="text-xs font-bold text-gray-600 dark:text-gray-300">
                          {kaggle.medals[cat].silver}
                        </span>
                      </span>
                      <span className="flex flex-col items-center gap-0.5">
                        <span className="text-base">🥉</span>
                        <span className="text-xs font-bold text-gray-600 dark:text-gray-300">
                          {kaggle.medals[cat].bronze}
                        </span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Blogエリア */}
            <div className="bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 h-full">
              
              {/* ヘッダーエリア */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100 dark:border-zinc-800">
                <h2 className="text-2xl md:text-3xl font-extrabold flex items-center gap-2 text-gray-800 dark:text-white">
                  <SiZenn className="text-[#3EA8FF]"/> Tech Blog
                </h2>
                <a
                  href={ACCOUNTS.zenn.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold text-gray-400 hover:text-[#3EA8FF] flex items-center gap-1 transition-colors group"
                >
                  Profile <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* おすすめ記事 */}
              <div className="mb-10 bg-amber-50/50 dark:bg-zinc-800/50 p-6 rounded-2xl border border-amber-100 dark:border-zinc-700 relative overflow-hidden">              
                <FaFire className="absolute -right-6 -bottom-6 text-8xl text-amber-100 dark:text-amber-900/20 pointer-events-none rotate-12" />
                
                <p className="font-bold text-sm mb-4 text-amber-500 uppercase tracking-wider flex items-center gap-2 relative z-10">
                  <FaFire /> Pickup Articles
                </p>
                
                <div className="flex flex-col gap-3 relative z-10">
                  {PICKUP_ARTICLES.map((article, index) => (
                      <a key={index} href={article.url} target="_blank" rel="noopener noreferrer"
                        className="group flex items-center gap-4 p-3 rounded-xl bg-white dark:bg-zinc-900 border border-amber-200 dark:border-zinc-700 shadow-sm hover:shadow-md hover:border-amber-300 transition-all"
                      >
                        <span className="text-2xl shrink-0 bg-amber-50 dark:bg-zinc-800 p-2 rounded-lg group-hover:scale-110 transition-transform">
                          {article.emoji}
                        </span>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start gap-2">
                            <p className="font-bold text-gray-800 dark:text-gray-100 line-clamp-1 group-hover:text-amber-600 transition-colors">
                              {article.title}
                            </p>
                            <span className="text-[10px] font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full shrink-0">
                              Must Read
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 mt-0.5 truncate">
                            おすすめの記事
                          </p>
                        </div>
                      </a>
                  ))}
                </div>
              </div>

              {/* 最新記事 */}
              <div>
                <p className="font-bold text-sm text-blue-500 mb-4 flex items-center gap-2 uppercase tracking-wider border-l-4 border-blue-500 pl-3">
                   Latest Articles
                </p>   
                {latestArticles.length > 0 ? (
                  <div className="flex flex-col divide-y divide-gray-100 dark:divide-zinc-800">
                    {latestArticles.map((article, index) => {
                      const articleDate = article.pubDate ? new Date(article.pubDate) : null;
                      const now = new Date();
                      const diffDays = articleDate 
                        ? Math.ceil(Math.abs(now.getTime() - articleDate.getTime()) / (1000 * 60 * 60 * 24))
                        : 999;
                      const isNew = diffDays <= 3; // 3日間以内の記事ならNewをつける

                      return (
                      <a key={index} href={article.link} target="_blank" rel="noopener noreferrer"
                        className="group block py-4 px-2 hover:bg-gray-50 dark:hover:bg-zinc-800/50 rounded-lg transition-colors"
                      >
                        <div className="flex justify-between items-start gap-3">
                          <p className="font-bold text-gray-700 dark:text-gray-200 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {article.title}
                          </p>
                          {isNew && (
                              <span className="text-[10px] font-bold text-white bg-blue-500 px-2 py-0.5 rounded-full shrink-0 animate-pulse">
                                New
                              </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400 mt-2">
                          {articleDate ? articleDate.toLocaleDateString("ja-JP", {
                            year:"numeric", month: "2-digit", day: "2-digit"
                          }): ""}
                        </p>
                      </a>
                    );
                    })}
                  </div>
                ): (
                  // 記事が取得できなかったときに質素にしないように
                  <div className="text-gray-400 text-sm py-12 text-center border-dashed border-2 border-gray-100 dark:border-zinc-800 rounded-xl">
                    記事はまだありません... 🐢
                  </div>
                )}           
              </div>

            </div>
          </div>
        </main>
      </div>
    </>
  );
}