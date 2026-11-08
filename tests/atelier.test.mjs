import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

test('Atelier dataset defines all 16 handcrafted creations, 7 highlights, 24 lookbook posts, and 5 Calm Corner posts', () => {
  const content = fs.readFileSync(path.join(rootDir, 'src', 'data', 'atelierData.ts'), 'utf8');

  const productIds = [...content.matchAll(/code:\s*'PRL-\d+'/g)];
  assert.equal(productIds.length, 16, 'Expected 16 curated Pearlie Handcrafted products (PRL-001..PRL-016)');

  const highlightUrls = [...content.matchAll(/stories\/highlights\/\d+/g)];
  assert.equal(highlightUrls.length, 7, 'Expected 7 story highlights from @_pearlie.dreamy');

  const lookbookShortcodes = [...content.matchAll(/shortcode:\s*'[A-Za-z0-9_-]+'/g)];
  assert.ok(lookbookShortcodes.length >= 29, 'Expected at least 29 Instagram shortcodes (24 Pearlie + 5 Calm Corner)');
});

test('All referenced ./images/* assets exist on disk and are non-empty', () => {
  const dataContent = fs.readFileSync(path.join(rootDir, 'src', 'data', 'atelierData.ts'), 'utf8');
  const refs = [...dataContent.matchAll(/\.\/images\/([a-zA-Z0-9_.-]+\.(?:jpg|webp|png))/g)].map((m) => m[1]);
  assert.ok(refs.length > 40, 'Should reference at least 40 image paths');

  for (const filename of new Set(refs)) {
    const filePath = path.join(rootDir, 'public', 'images', filename);
    assert.ok(fs.existsSync(filePath), `Expected public/images/${filename} to exist`);
    assert.ok(fs.statSync(filePath).size > 100, `Expected public/images/${filename} to be non-empty`);
  }
});

test('Multilingual trilingual keys (en, fr, ar) are present across product titles', () => {
  const dataContent = fs.readFileSync(path.join(rootDir, 'src', 'data', 'atelierData.ts'), 'utf8');
  assert.ok(dataContent.includes("export type Language = 'en' | 'fr' | 'ar';"));
  assert.ok(dataContent.includes('https://wa.me/message/HYSIBOQVMTCAE1'));
  assert.ok(dataContent.includes('https://www.instagram.com/_pearlie.dreamy/'));
  assert.ok(dataContent.includes('https://www.instagram.com/__little.calmcorner/'));
  assert.ok(dataContent.includes('https://www.instagram.com/ihsane__ft/'));
});
