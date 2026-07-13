import { defineWorkspace } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'

export default defineWorkspace([
  {
    // CSS ロジックテスト: 実ブラウザ (Playwright Chromium) で実行
    configFile: false,
    root: '.',
    test: {
      name: 'browser',
      include: [
        'tests/diff.test.js',
        'tests/diff-shorthand.test.js',
        'tests/layer.test.js',
        'tests/normalize.test.js',
        'tests/order-risk.test.js',
        'tests/resolve.test.js',
        'tests/shorthand-risk.test.js',
        'tests/specificity.test.js',
      ],
      browser: {
        enabled: true,
        provider: playwright(),
        instances: [{ browser: 'chromium' }],
      },
    },
  },
  {
    // Node.js 専用テスト (fs API 等を使用するもの)
    configFile: false,
    root: '.',
    test: {
      name: 'node',
      include: [
        'tests/artifacts.test.js',
        'tests/cli.test.js',
      ],
      environment: 'node',
    },
  },
])
