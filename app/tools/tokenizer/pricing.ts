// app/tools/tokenizer/pricing.ts
// ─────────────────────────────────────────────────────────────
// GPTモデルの料金定義(手動管理)
// 料金改定時はここを手動で更新する。最終確認日: 2025-08-01
//
// 参照先:
//   OpenAI 料金ページ: https://openai.com/api/pricing/
//
// 将来 Claude / Gemini 等を追加する場合は、同形の定数を別ファイルで定義し
// 呼び出し側でマージする設計にする(このファイルは GPT 専用)。
// ─────────────────────────────────────────────────────────────

export type EncodingKey = "o200k_base" | "cl100k_base";

export interface ModelPricing {
  id: string;
  label: string;
  encoding: EncodingKey;
  /** USD / 1M input tokens */
  inputPricePerMToken: number;
  /** USD / 1M output tokens */
  outputPricePerMToken: number;
  /** USD / 1M cached input tokens (prompt cache hit). 対応モデルのみ。 */
  cachedInputPricePerMToken?: number;
}

/**
 * 現行の主要 OpenAI モデル料金。
 * 行末コメントなし = 2025-08-01 時点で確認済み。
 * ※要確認の仮値 = 未検証。料金ページで確認して更新すること。
 */
export const GPT_MODELS: ModelPricing[] = [
  // ── o200k_base ────────────────────────────────────────────
  {
    id: "gpt-4o",
    label: "GPT-4o",
    encoding: "o200k_base",
    inputPricePerMToken: 2.5,          // $2.50/1M
    outputPricePerMToken: 10.0,        // $10.00/1M
    cachedInputPricePerMToken: 1.25,   // $1.25/1M
  },
  {
    id: "gpt-4o-mini",
    label: "GPT-4o mini",
    encoding: "o200k_base",
    inputPricePerMToken: 0.15,         // $0.15/1M
    outputPricePerMToken: 0.6,         // $0.60/1M
    cachedInputPricePerMToken: 0.075,  // $0.075/1M
  },
  {
    id: "gpt-4.1",
    label: "GPT-4.1",
    encoding: "o200k_base",
    inputPricePerMToken: 2.0,          // $2.00/1M ※要確認の仮値
    outputPricePerMToken: 8.0,         // $8.00/1M ※要確認の仮値
    cachedInputPricePerMToken: 0.5,    // $0.50/1M ※要確認の仮値
  },
  {
    id: "gpt-4.1-mini",
    label: "GPT-4.1 mini",
    encoding: "o200k_base",
    inputPricePerMToken: 0.4,          // $0.40/1M ※要確認の仮値
    outputPricePerMToken: 1.6,         // $1.60/1M ※要確認の仮値
    cachedInputPricePerMToken: 0.1,    // $0.10/1M ※要確認の仮値
  },
  {
    id: "gpt-4.1-nano",
    label: "GPT-4.1 nano",
    encoding: "o200k_base",
    inputPricePerMToken: 0.1,          // $0.10/1M ※要確認の仮値
    outputPricePerMToken: 0.4,         // $0.40/1M ※要確認の仮値
  },
  // ── cl100k_base (legacy) ───────────────────────────────────
  {
    id: "gpt-4-turbo",
    label: "GPT-4 Turbo (legacy)",
    encoding: "cl100k_base",
    inputPricePerMToken: 10.0,         // $10.00/1M ※要確認の仮値
    outputPricePerMToken: 30.0,        // $30.00/1M ※要確認の仮値
  },
  {
    id: "gpt-3.5-turbo",
    label: "GPT-3.5 Turbo (legacy)",
    encoding: "cl100k_base",
    inputPricePerMToken: 0.5,          // $0.50/1M ※要確認の仮値
    outputPricePerMToken: 1.5,         // $1.50/1M ※要確認の仮値
  },
];
