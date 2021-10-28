import { PATHS } from "../../../global/variables";

export function getSitemap(resolve) {
  const request = new XMLHttpRequest();
  request.onreadystatechange = ajax;
  request.open('GET', PATHS.root + 'contents/sitemap.json', true);
  request.send();

  function ajax() {
    if (request.readyState === XMLHttpRequest.DONE) {
      if (request.status === 200) {
        const json = JSON.parse(request.response);
        resolve(json.sitemap);
      } else {
        console.error(request.response);
      }
    }
  }
}
