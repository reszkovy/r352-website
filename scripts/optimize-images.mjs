/**
 * Image Optimization Script for R352 Website
 * Converts PNG images in src/assets/ to WebP format
 *
 * Usage: node scripts/optimize-images.mjs
 * Requires: npm install sharp (run first if not installed)
 */

import sharp from 'sharp';
import { readdir, stat, unlink, rename } from 'fs/promises';
import { join, extname, basename } from 'path';
import { existsSync } from 'fs';

const ASSETS_DIR = 'src/assets';
const QUALITY = 82;

async function optimizeImages() {
  console.log('🔍 Scanning for PNG images...\n');

  const files = await readdir(ASSETS_DIR);
  const pngs = files.filter(f => extname(f).toLowerCase() === '.png');

  if (pngs.length === 0) {
    console.log('No PNG files found.');
    return;
  }

  let totalBefore = 0;
  let totalAfter = 0;
  let converted = 0;
  let errors = 0;

  for (const file of pngs) {
    const pngPath = join(ASSETS_DIR, file);
    const webpPath = join(ASSETS_DIR, file.replace('.png', '.webp'));

    try {
      const beforeSize = (await stat(pngPath)).size;
      totalBefore += beforeSize;

      await sharp(pngPath)
        .webp({ quality: QUALITY, effort: 4 })
        .toFile(webpPath);

      const afterSize = (await stat(webpPath)).size;
      totalAfter += afterSize;

      // Remove original PNG
      await unlink(pngPath);
      converted++;

      const savings = ((1 - afterSize / beforeSize) * 100).toFixed(0);
      if (beforeSize > 500_000) {
        console.log(`  ✅ ${file}: ${(beforeSize/1024/1024).toFixed(1)}MB → ${(afterSize/1024/1024).toFixed(1)}MB (${savings}% smaller)`);
      }
    } catch (err) {
      console.error(`  ❌ ${file}: ${err.message}`);
      errors++;
    }
  }

  console.log(`\n${'─'.repeat(50)}`);
  console.log(`✅ Converted: ${converted} images`);
  if (errors > 0) console.log(`❌ Errors: ${errors}`);
  console.log(`   Before: ${(totalBefore/1024/1024).toFixed(1)} MB`);
  console.log(`   After:  ${(totalAfter/1024/1024).toFixed(1)} MB`);
  console.log(`   Saved:  ${((totalBefore-totalAfter)/1024/1024).toFixed(1)} MB (${((1-totalAfter/totalBefore)*100).toFixed(0)}%)`);

  console.log(`\n⚠️  NEXT STEP: Update all .png imports to .webp in your codebase.`);
  console.log(`   Run: grep -r '\.png' src/imports/ --files-with-matches`);
  console.log(`   Then: sed -i '' 's/\\.png/.webp/g' src/imports/*.ts`);
}

optimizeImages().catch(console.error);
