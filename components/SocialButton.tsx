import { ReactNode } from "react";
interface Props {
    href: string; // リンク
    icon: ReactNode; // アイコン
}

export default function SocialButton({ href, icon }: Props) {
    return (
        <a 
            href={href}
            target="_blank" // 上書き遷移を防ぐ
            rel="noopener noreferrer" // target="_blank"と一緒に。安全策
            className="flex w-14 h-14
            items-center justify-center rounded
            bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700
            transition-all hover:bg-gray-100 text-gray-700 hover:text-black"
        >
            {icon}   {/* 渡されたアイコンの表示 */}
        </a>
    );
}