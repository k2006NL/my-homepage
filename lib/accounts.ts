// ============================================================
// アカウント・URL 一元管理ファイル
// アカウント名やURLはここだけを編集してください
// ============================================================

export const ACCOUNTS = {
  zenn: {
    username: "fleure",
    profileUrl: "https://zenn.dev/fleure",
  },
  atcoder: {
    username: "nele",
  },
  kaggle: {
    username: "k2006NL",           // Kaggleアカウント名を変更する場合はここを編集
    profileUrl: "https://www.kaggle.com/k2006NL",
    tier: "Contributor",           // Novice / Contributor / Expert / Master / Grandmaster
    tierColor: "text-green-500",   // teirに合わせて色を変更
    medals: {
      competitions: { gold: 0, silver: 0, bronze: 1 },
      notebooks:    { gold: 0, silver: 0, bronze: 1 },
      discussions:  { gold: 0, silver: 0, bronze: 0 },
    },
  },
  twitter: {
    url: "https://x.com/mamelog_coffee",
  },
  github: {
    url: "https://github.com/k2006NL",
  },
} as const;
