#!/bin/bash
set -e

echo "🔧 Installing dependencies..."
npm ci --only=production=false

echo "🧹 Cleaning cache..."
npm cache clean --force

echo "🏗️ Building application..."
npx vite build --mode production

echo "✅ Build completed successfully!"