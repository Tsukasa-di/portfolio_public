import { INST, LOCATION } from "../../../global/objects";

export function getDocuments(sitemaps) {
  const promises = [];

  sitemaps.forEach( sitemap => {
    promises.push(
      fetch(LOCATION.origin + '/' + sitemap)
        .then( response => {
          if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
          return response.blob();
        })
        .then( blob => {
          const name = sitemap == 'index.html' ? 'home' : sitemap.split('.html')[0];
          readAsText(blob, 'shift-jis').then( html => {
            const doc = new DOMParser().parseFromString(html, 'text/html');
            INST.spa.docs[name] = doc;
            return doc;
          });
        })
    );
  });

  return Promise.all(promises);
}

function readAsText(blob, encoding = null) { 
  const reader = new FileReader();
  return new Promise( resolve => {
    reader.readAsText(blob, encoding);
    reader.addEventListener("load", () => {
      resolve(reader.result);
    }, false);
  })
}
