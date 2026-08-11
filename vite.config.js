import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function contentWatcherPlugin() {
  return {
    name: 'vite-plugin-content-watcher',
    configureServer(server) {
      const contentPath = path.resolve(__dirname, 'content');
      server.watcher.add(contentPath);
      server.watcher.on('change', (filePath) => {
        if (filePath.includes('content')) {
          console.log(`\n📝 Markdown content updated: ${path.basename(filePath)}. Recompiling data...`);
          try {
            execSync('node scripts/build-content-data.js', { stdio: 'inherit' });
          } catch (err) {
            console.error('Error rebuilding content data:', err);
          }
        }
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    contentWatcherPlugin()
  ],
});
