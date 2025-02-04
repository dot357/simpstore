import { defineConfig } from "vite";
import path from "path";
import type { UserConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "SimpleStateStore",
      fileName: (format) => `simple-state-store.${format}.js`,
    },
    rollupOptions: {
      // Ensure no external dependencies are bundled
      external: [],
      output: {
        globals: {},
      },
    },
    // Prevent TypeScript from trying to bundle Rollup's internal modules
    commonjsOptions: {
      transformMixedEsModules: true,
      exclude: ['rollup/parseAst']
    },
  },
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ['./src/tests/setup.ts'],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
    },
  },
}) as UserConfig;