// //////////////////////////////
//  packages
// //////////////////////////////

const FS = require('fs');

// //////////////////////////////
//  Definition
// //////////////////////////////

const files = [];
let sitemap = '{\n\t"sitemap": [\n';

function fileFactory(file, removePath, removeExt, ext) {
  return file.split(removePath)[1].split(removeExt)[0] + ext;
}

function sitemapFactory(paths, path, sitemap) {
  FS.writeFileSync(paths.src + '/contents/sitemap.json', sitemap, 'utf-8', err => {
    if (err) console.error(err);
  });
  FS.appendFileSync(
    paths.src + '/contents/sitemap.json',
    '\t\t"' + path + '"\n\t]\n}\n',
    'utf-8',
    err => {
      if (err) console.error(err);
    });
  return sitemap + '\t\t"' + path + '",\n';
}

// //////////////////////////////
//  Function
// //////////////////////////////

function SITEMAP(paths) {
  function readFiles(dirpath) {
    FS.readdir(dirpath, { withFileTypes: true }, (err, dirents) => {
      if (err) {
        console.error(err);
        return;
      }

      dirents.forEach(dirent => {
        const file = dirpath + '/' + dirent.name;
        if (
          dirent.isDirectory()
          && dirent.name != '.DS_Store'
        ) {
          readFiles(file);
        } else if (
          !dirent.name.includes('_')
          && dirent.name != '.DS_Store'
        ) {
          const fixed = fileFactory(file, paths.src + '/template/', '.pug', '.html');
          files.push(fixed);
          sitemap = sitemapFactory(paths, fixed, sitemap);
        } else {
          console.log('[' + file + '] isn\'t include sitemap.');
        }
      });
    });
  }

  readFiles(paths.src + '/template');
}

module.exports = SITEMAP;
