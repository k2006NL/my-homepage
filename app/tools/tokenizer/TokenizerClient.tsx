"use client";
// app/tools/tokenizer/TokenizerClient.tsx

import { useState, useMemo } from "react";
import {
  encode as encodeO200k,
  decode as decodeO200k,
} from "gpt-tokenizer/encoding/o200k_base";
import {
  encode as encodeCl100k,
  decode as decodeCl100k,
} from "gpt-tokenizer/encoding/cl100k_base";
import { GPT_MODELS, type EncodingKey } from "./pricing";

// ─ 出力量プリセット ────────────────────────────────────────────
const OUTPUT_PRESETS = [
  { id: "summary",     label: "要約",       multiplier: 0.3 },
  { id: "chat",        label: "チャット",   multiplier: 0.5 },
  { id: "translation", label: "翻訳",       multiplier: 1.0 },
  { id: "code",        label: "コード生成", multiplier: 2.0 },
] as const;

type PresetId = (typeof OUTPUT_PRESETS)[number]["id"];

const TOKEN_COLORS = [
  "bg-blue-100 dark:bg-blue-900/40",
  "bg-slate-200 dark:bg-slate-700/60",
];

// ─ 例文定義(判定ロジックなし・固定) ───────────────────────────
const SAMPLE_EXAMPLES = [
  {
    label: "絵文字",
    text: "👨‍👩‍👧‍👦 家族絵文字は何トークン？ 🎌🌸🍣",
  },
  {
    label: "日英比較",
    text: "The quick brown fox jumps over the lazy dog.\n敏速な茶色のキツネが、怠け者の犬の上を跳び越えた。",
  },
  {
    label: "数字列",
    text: "3.14159265358979  /  3,141,592  /  三百十四万千五百九十二",
  },
  {
    label: "地名",
    text: "Tokyo  /  東京  /  とうきょう  /  トウキョウ  /  Tōkyō",
  },
  {
    label: "コード",
    text: "const greet = (name: string) => `Hello, ${name}!`;",
  },
] as const;

const SAMPLE_TEXT =
  "こんにちは、世界！自然言語処理のトークナイザーを可視化します。Hello, world!";

const utf8Encoder = new TextEncoder();

function getEncoder(encoding: EncodingKey) {
  if (encoding === "o200k_base") {
    return { encode: encodeO200k, decode: decodeO200k };
  }
  return { encode: encodeCl100k, decode: decodeCl100k };
}

function formatCost(usd: number): string {
  if (usd === 0) return "$0.00000";
  if (usd < 0.000005) return `$${usd.toExponential(2)}`;
  return `$${usd.toFixed(5)}`;
}

export default function TokenizerClient() {
  const [text, setText] = useState(SAMPLE_TEXT);
  const [modelId, setModelId] = useState(GPT_MODELS[0].id);
  const [presetId, setPresetId] = useState<PresetId>("chat");
  const [manualOutput, setManualOutput] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const selectedModel = GPT_MODELS.find((m) => m.id === modelId) ?? GPT_MODELS[0];

  const result = useMemo(() => {
    const { encode, decode } = getEncoder(selectedModel.encoding);
    if (!text) return { tokens: [] as number[], pieces: [] as string[] };
    try {
      const tokens = encode(text);
      const pieces = tokens.map((t) => decode([t]));
      return { tokens, pieces };
    } catch {
      return { tokens: [] as number[], pieces: [] as string[] };
    }
  }, [text, selectedModel.encoding]);

  const tokenCount = result.tokens.length;
  const charCount = [...text].length;

  const preset = OUTPUT_PRESETS.find((p) => p.id === presetId) ?? OUTPUT_PRESETS[0];
  const parsedManual = parseInt(manualOutput, 10);
  const usingManual = manualOutput !== "" && !isNaN(parsedManual) && parsedManual >= 0;
  const outputTokenCount = usingManual
    ? parsedManual
    : Math.round(tokenCount * preset.multiplier);

  const inputCostUSD = (tokenCount / 1_000_000) * selectedModel.inputPricePerMToken;
  const outputCostUSD = (outputTokenCount / 1_000_000) * selectedModel.outputPricePerMToken;
  const totalCostUSD = inputCostUSD + outputCostUSD;

  return (
    <div className="flex flex-col gap-6">
      {/* 入力カード */}
      <div className="bg-white dark:bg-zinc-900 p-6 rounded border border-gray-300 dark:border-zinc-700">
        {/* 例文ボタン */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-xs font-bold text-gray-400 shrink-0">例文:</span>
          {SAMPLE_EXAMPLES.map((ex) => (
            <button
              key={ex.label}
              onClick={() => setText(ex.text)}
              className="px-2.5 py-1 rounded text-xs font-bold bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-gray-400 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-zinc-700 dark:hover:text-blue-400 border border-gray-300 dark:border-zinc-600 transition-all"
            >
              {ex.label}
            </button>
          ))}
        </div>

        <label className="font-bold text-sm text-gray-600 dark:text-gray-300 mb-2 block">
          テキストを入力
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          className="w-full p-4 rounded border border-gray-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
          placeholder="ここに文章を貼ってね"
        />

        {/* モデル選択 */}
        <p className="font-bold text-xs text-gray-400 uppercase tracking-wider mt-5 mb-2">
          モデル
        </p>
        <div className="flex flex-wrap gap-2">
          {GPT_MODELS.map((model) => (
            <button
              key={model.id}
              onClick={() => setModelId(model.id)}
              className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${
                modelId === model.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-zinc-700 border border-gray-300 dark:border-zinc-600"
              }`}
            >
              {model.label}
            </button>
          ))}
        </div>
      </div>

      {/* 用途プリセットカード */}
      <div className="bg-white dark:bg-zinc-900 p-6 rounded border border-gray-300 dark:border-zinc-700">
        <p className="font-bold text-xs text-gray-400 uppercase tracking-wider mb-2">
          用途(出力量の推定)
        </p>
        <div className="flex flex-wrap gap-2">
          {OUTPUT_PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => { setPresetId(p.id); setManualOutput(""); }}
              className={`px-4 py-2 rounded text-sm font-bold transition-all ${
                presetId === p.id && !usingManual
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-zinc-700 border border-gray-300 dark:border-zinc-600"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="mt-4">
          <button
            onClick={() => setShowAdvanced((v) => !v)}
            className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 font-bold transition-colors"
          >
            {showAdvanced ? "▲ 詳細設定を閉じる" : "▼ 詳細設定(出力トークン数を手動指定)"}
          </button>
          {showAdvanced && (
            <div className="mt-3 flex items-center gap-3 flex-wrap">
              <label className="text-xs font-bold text-gray-500 shrink-0">
                想定出力トークン数
              </label>
              <input
                type="number"
                min={0}
                value={manualOutput}
                onChange={(e) => setManualOutput(e.target.value)}
                placeholder={`プリセット値: ${Math.round(tokenCount * preset.multiplier)}`}
                className="w-44 px-3 py-1.5 rounded border border-gray-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-gray-800 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {usingManual && (
                <button
                  onClick={() => setManualOutput("")}
                  className="text-xs font-bold text-gray-400 hover:text-red-500 transition-colors"
                >
                  リセット
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* サマリー */}
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          <SummaryCell
            label="トークン数(入力)"
            value={tokenCount.toLocaleString()}
            accent="text-blue-600"
            animate
          />
          <SummaryCell
            label="文字数"
            value={charCount.toLocaleString()}
            accent="text-gray-700 dark:text-gray-200"
          />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <SummaryCell
            label="入力コスト"
            value={formatCost(inputCostUSD)}
            accent="text-gray-700 dark:text-gray-200"
          />
          <SummaryCell
            label="出力コスト"
            value={formatCost(outputCostUSD)}
            accent="text-gray-700 dark:text-gray-200"
          />
          <SummaryCell
            label="合計コスト"
            value={formatCost(totalCostUSD)}
            accent="text-blue-600"
          />
        </div>
        <p className="text-[11px] text-gray-400 text-right leading-relaxed">
          出力: 推定 {outputTokenCount.toLocaleString()} トークン
          {usingManual
            ? " (手動指定)"
            : ` (${preset.label}プリセット × ${preset.multiplier})`}
          　/　{selectedModel.label} 基準
        </p>
      </div>

      {/* 可視化カード */}
      <div className="bg-white dark:bg-zinc-900 p-6 rounded border border-gray-300 dark:border-zinc-700">
        <p className="font-bold text-sm text-gray-600 dark:text-gray-300 mb-4 flex items-center gap-2 border-l-4 border-blue-600 pl-3">
          トークン分割の可視化
        </p>
        {tokenCount > 0 ? (
          <div className="flex flex-wrap gap-1 leading-relaxed">
            {result.pieces.map((piece, i) => {
              const tokenId = result.tokens[i];
              const byteCount = utf8Encoder.encode(piece).length;
              const displayPiece = piece.replace(/ /g, "␣").replace(/\n/g, "↵");
              return (
                <span
                  key={i}
                  title={`#${i + 1} · id:${tokenId} · ${byteCount}B`}
                  className="relative inline-block group cursor-default"
                >
                  <span
                    className={`${TOKEN_COLORS[i % TOKEN_COLORS.length]} px-1.5 py-0.5 rounded font-mono text-sm text-gray-800 dark:text-gray-100 whitespace-pre`}
                  >
                    {displayPiece}
                  </span>
                  {/* ホバー時ツールチップ */}
                  <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-1 z-10 px-2 py-1 rounded bg-zinc-900 dark:bg-zinc-700 text-white text-[10px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                    #{i + 1} · id:{tokenId} · {byteCount}B
                  </span>
                </span>
              );
            })}
          </div>
        ) : (
          <div className="text-gray-400 text-sm py-8 text-center border-dashed border-2 border-gray-300 dark:border-zinc-700 rounded">
            テキストを入力すると分割結果が出るよ 🐢
          </div>
        )}
        <p className="text-xs text-gray-400 mt-4">
          ␣ = 半角スペース / ↵ = 改行。各トークンにホバーするとID・バイト数が見えるよ。
        </p>
      </div>
    </div>
  );
}

function SummaryCell({
  label,
  value,
  accent,
  animate = false,
}: {
  label: string;
  value: string;
  accent: string;
  animate?: boolean;
}) {
  return (
    <div className="bg-white dark:bg-zinc-900 p-4 rounded border border-gray-300 dark:border-zinc-700 text-center">
      <p className="text-[10px] font-bold text-gray-400 tracking-wider mb-1">{label}</p>
      {animate ? (
        <p key={value} className={`text-xl md:text-2xl font-extrabold ${accent} animate-value-change`}>
          {value}
        </p>
      ) : (
        <p className={`text-xl md:text-2xl font-extrabold ${accent}`}>
          {value}
        </p>
      )}
    </div>
  );
}
