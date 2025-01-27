import { defineConfig } from "vite";
import path from "path";

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
  },
});
