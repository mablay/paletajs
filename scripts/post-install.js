var fs = require('fs');
var Path = require('path');

var dir = Path.resolve(__dirname, '..');

/** Patch unsplash-js node module **/
console.log();
console.log('[POST-INSTALL] Patch unsplash-js node module');
var srcFile = Path.join(dir, 'scripts', 'patches', 'photos.js');
var dstFile = Path.join(dir, 'node_modules', 'unsplash-js', 'lib', 'methods', 'photos.js');
console.log('[POST-INSTALL] \tCopying scripts/patches/photos.js to node_modules/unsplash-js/lib/methods/photos.js');
console.log('[POST-INSTALL] \tSRC %s', srcFile);
console.log('[POST-INSTALL] \tDST %s', dstFile);
if ( fs.existsSync(srcFile) && fs.existsSync(dstFile) )
  fs.unlinkSync(dstFile);
if ( fs.existsSync(srcFile) && !fs.existsSync(dstFile) ) {
  fs.writeFileSync(dstFile, fs.readFileSync(srcFile));
}