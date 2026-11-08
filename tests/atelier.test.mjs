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

test('Multilingual keys (en, fr, es, ar) are present across product titles', () => {
  const dataContent = fs.readFileSync(path.join(rootDir, 'src', 'data', 'atelierData.ts'), 'utf8');
  assert.ok(dataContent.includes("export type Language = 'en' | 'fr' | 'es' | 'ar';"));

  // Every product defines Spanish title, subtitle, description & materials (16 products)
  const productSection = dataContent.slice(
    dataContent.indexOf('export const PEARLIE_PRODUCTS'),
    dataContent.indexOf('export const ALL_PEARLIE_POSTS')
  );
  const esLines = [...productSection.matchAll(/^\s{6}es:\s/gm)];
  assert.equal(esLines.length, 16 * 4, 'Expected es title/subtitle/description/materials for each of 16 products');

  // Calm Corner posts define Spanish title & soul note
  const calmSection = dataContent.slice(dataContent.indexOf('export const CALM_CORNER_POSTS'), dataContent.indexOf('export const SOUL_AFFIRMATIONS'));
  assert.equal([...calmSection.matchAll(/^\s{6}es:\s/gm)].length, 5 * 2, 'Expected es title & soulNote for 5 Calm Corner posts');

  assert.ok(/SOUL_AFFIRMATIONS[\s\S]*\n  es: \[/.test(dataContent), 'Expected Spanish soul affirmations');
  assert.ok(dataContent.includes('https://wa.me/message/HYSIBOQVMTCAE1'));
  assert.ok(dataContent.includes('https://www.instagram.com/_pearlie.dreamy/'));
  assert.ok(dataContent.includes('https://www.instagram.com/__little.calmcorner/'));
  assert.ok(dataContent.includes('https://www.instagram.com/ihsane__ft/'));
});
