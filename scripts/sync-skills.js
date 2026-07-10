#!/usr/bin/env node
/**
 * ビルド後に css-cascade CLI をビルドし、スキルへ同期する。
 * package.json の postbuild から呼ばれる。
 *
 * 生成物:
 *   bin/css-cascade.cjs                              — minified CJS CLI (bin/css-cascade.src.js から生成)
 *   .claude/skills/css-cascade/                   — ESM ソースファイル一式 (ビルド成果物なし)
 *   .claude/skills/css-cascade-npm/hooks/posttooluse.js — minified hook スクリプト
 */
import { build } from "esbuild";
import { cpSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));

const bundledCss = readFileSync(join(ROOT, "src/styles.css"), "utf8");
const cssomSource = readFileSync(join(ROOT, "src/core/parse-cssom.js"), "utf8")
  .replace(/^export /gm, "");
const pkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
const COPYRIGHT = `// Copyright (c) 2026 sv.junic. MIT License. v${pkg.version}\n// Source: https://github.com/svjunic/css-cascade`;
const defines = {
  __BUNDLED_CSS__: JSON.stringify(bundledCss),
  __PKG_VERSION__: JSON.stringify(pkg.version),
  __CSSOM_SOURCE__: JSON.stringify(cssomSource),
};

// CLI ビルド時: parse-cssom.js（ブラウザ専用）→ parse-node.js（Playwright wrapper）にリダイレクト
const parseNodePath = join(ROOT, "src/core/parse-node.js");
const cliRedirectPlugin = {
  name: "cli-parse-redirect",
  setup(b) {
    b.onResolve({ filter: /parse-cssom\.js$/ }, () => ({ path: parseNodePath }));
  },
};

// ── 1. bin/css-cascade.cjs (minified CJS — 処理高速化) ──────────────────────
await build({
  entryPoints: [join(ROOT, "bin/css-cascade.src.js")],
  bundle: true,
  platform: "node",
  format: "cjs",
  minify: true,
  outfile: join(ROOT, "bin/css-cascade.cjs"),
  target: "node18",
  banner: { js: COPYRIGHT },
  define: defines,
  external: ["playwright"],
  plugins: [cliRedirectPlugin],
  logLevel: "error",
});
console.log("✓ minified bin/css-cascade.cjs");

// ── 2. css-cascade スキル向け ESM ソースファイルをコピー ──────────────────────
const SKILL_DIR = join(ROOT, ".claude/skills/css-cascade");
mkdirSync(join(SKILL_DIR, "bin"), { recursive: true });
mkdirSync(join(SKILL_DIR, "src/reporters"), { recursive: true });
mkdirSync(join(SKILL_DIR, "src/ui"), { recursive: true });

cpSync(join(ROOT, "bin/css-cascade.src.js"), join(SKILL_DIR, "bin/css-cascade.src.js"), { force: true });
cpSync(join(ROOT, "src/core"), join(SKILL_DIR, "src/core"), { recursive: true, force: true });
cpSync(join(ROOT, "src/reporters/html.js"), join(SKILL_DIR, "src/reporters/html.js"), { force: true });
cpSync(join(ROOT, "src/ui/render.js"), join(SKILL_DIR, "src/ui/render.js"), { force: true });
cpSync(join(ROOT, "src/styles.css"), join(SKILL_DIR, "src/styles.css"), { force: true });
writeFileSync(join(SKILL_DIR, "package.json"), JSON.stringify({ type: "module", dependencies: { playwright: "^1.61.1" } }, null, 2) + "\n");
console.log("✓ copied ESM sources to .claude/skills/css-cascade/");

