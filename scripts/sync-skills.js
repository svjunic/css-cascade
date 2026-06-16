#!/usr/bin/env node
/**
 * ビルド後に bin/ と src/core/ を css-verify スキルへ同期する。
 * package.json の postbuild から呼ばれる。
 */
import { copyFileSync, mkdirSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const SKILL_DIR = join(ROOT, ".claude/skills/css-verify");

const copies = [
  [join(ROOT, "bin/css-diff.js"), join(SKILL_DIR, "bin/css-diff.js")],
  ...readdirSync(join(ROOT, "src/core"))
    .filter((f) => f.endsWith(".js"))
    .map((f) => [join(ROOT, "src/core", f), join(SKILL_DIR, "src/core", f)]),
];

mkdirSync(join(SKILL_DIR, "bin"), { recursive: true });
mkdirSync(join(SKILL_DIR, "src/core"), { recursive: true });

for (const [src, dest] of copies) {
  copyFileSync(src, dest);
}

console.log(`✓ synced ${copies.length} files to .claude/skills/css-verify/`);
