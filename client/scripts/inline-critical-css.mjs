import fs from 'fs';
import path from 'path';
import CleanCSS from 'clean-css';

const DIST_DIR = path.join(process.cwd(), 'dist');

// Define CSS files corresponding to different parts of your SPA
const cssFiles = [
  'index_critical.min.css',
];

let combinedCss = '';

cssFiles.forEach((cssFile, index) => {
  const cssFilePath = path.join(DIST_DIR, cssFile);
  let cssContent = fs.readFileSync(cssFilePath, 'utf-8');

  // For all files after the first, remove any @charset declarations
  if (index > 0) {
    cssContent = cssContent.replace(/@charset\s+"UTF-8";\s*\n?/g, '');
  }

  combinedCss += cssContent;
});

// Minify the combined CSS
const output = new CleanCSS().minify(combinedCss).styles;

// Inline the minified combined CSS into index.html
const htmlFilePath = path.join(DIST_DIR, 'index.html');
let htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');
const cssInline = `<style>${output}</style>`;
htmlContent = htmlContent.replace('</head>', `${cssInline}</head>`);

fs.writeFileSync(htmlFilePath, htmlContent);

console.log('Combined and minified critical CSS inlined successfully.');