import { INST } from "../../../global/objects";

export function getSitemap() {
  return fetch(INST.spa.url.sitemap)
    .then( response => {
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      return response.json();
    });
}
