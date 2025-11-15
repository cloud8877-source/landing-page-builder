const { onRequest } = require("firebase-functions/v2/https");
const path = require('path');
const { existsSync, readFileSync } = require('fs');

let nextServer = null;
let isNextInitializing = false;
let nextInitError = null;

async function initializeNextApp() {
  if (nextServer || isNextInitializing) {
    return nextServer;
  }

  isNextInitializing = true;
  nextInitError = null;

  try {
    console.log('Initializing Next.js server...');

    // Import Next.js
    const next = require('next');

    // Initialize Next.js with minimal configuration for Firebase Functions
    const app = next({
      dev: false,
      dir: path.join(__dirname),
      conf: {
        distDir: '.next',
        // Minimal configuration for Firebase Functions
        compress: false,
        poweredByHeader: false,
        images: {
          unoptimized: true,
          domains: ['firebasestorage.googleapis.com'],
        },
        // Disable problematic features
        experimental: {
          serverComponentsExternalPackages: [],
        },
        // Minimal headers and redirects
        async headers() {
          return [];
        },
        async redirects() {
          return [];
        },
      },
    });

    await app.prepare();
    nextServer = app;
    console.log('Next.js server initialized successfully');
    return nextServer;

  } catch (error) {
    console.error('Failed to initialize Next.js:', error);
    nextInitError = error;
    isNextInitializing = false;
    throw error;
  }
}

async function serveStaticFile(res, filePath) {
  try {
    const fullPath = path.join(__dirname, '.next', filePath);
    if (existsSync(fullPath)) {
      const content = readFileSync(fullPath);
      res.setHeader('Cache-Control', 'public, max-age=31536000');
      res.send(content);
      return true;
    }
  } catch (error) {
    console.error('Error serving static file:', error);
  }
  return false;
}

exports.nextServer = onRequest({
  region: "asia-southeast1",
  cors: true,
  minInstances: 0,
  maxInstances: 10,
  runtime: "nodejs20",
}, async (req, res) => {
  try {
    // Handle static assets first
    if (req.path.startsWith('/_next/static/') || req.path.startsWith('/static/')) {
      const staticPath = req.path.replace(/^\//, '');
      if (await serveStaticFile(res, staticPath)) {
        return;
      }
    }

    // Handle health check
    if (req.path === '/health' || req.path === '/api/health') {
      return res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        message: 'Landing page builder is running',
        nextInitialized: !!nextServer
      });
    }

    // Initialize Next.js if not already done
    if (!nextServer && !nextInitError) {
      // Add retry logic for failed initializations
      const maxRetries = 3;
      let retryCount = 0;

      while (!nextServer && !nextInitError && retryCount < maxRetries) {
        try {
          console.log(`Next.js initialization attempt ${retryCount + 1}/${maxRetries}`);
          await initializeNextApp();
        } catch (error) {
          retryCount++;
          console.error(`Initialization attempt ${retryCount} failed:`, error);
          if (retryCount < maxRetries) {
            console.log(`Retrying in 2 seconds...`);
            await new Promise(resolve => setTimeout(resolve, 2000));
          }
        }
      }
    }

    // If Next.js failed to initialize, return an error page
    if (nextInitError) {
      console.error('Next.js initialization failed:', nextInitError);
      return res.status(500).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Application Error</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; background: #f5f5f5; }
            .container { max-width: 600px; margin: 50px auto; background: white; padding: 30px; border-radius: 8px; }
            h1 { color: #e74c3c; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>⚠️ Application Error</h1>
            <p>The application is temporarily unavailable due to a server initialization error.</p>
            <p><strong>Error:</strong> ${nextInitError.message}</p>
            <p>We're working to resolve this issue. Please try again in a few minutes.</p>
          </div>
        </body>
        </html>
      `);
    }

    // Handle request with Next.js
    if (nextServer) {
      const handler = nextServer.getRequestHandler();
      return handler(req, res);
    }

    // Fallback error response
    res.status(500).json({
      error: 'Server not ready',
      message: 'Next.js server is still initializing',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Function error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});
