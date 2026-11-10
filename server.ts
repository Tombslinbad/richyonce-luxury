import express from 'express';
import { createServer as createViteServer } from 'vite';
import { apiRouter } from './src/server/api';
import path from 'path';

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // Mount API router
  app.use('/api', apiRouter);

  // In development, mount Vite middleware for fast HMR & SSR client handling
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve static dist
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Richyonce Server] Full-Stack server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
