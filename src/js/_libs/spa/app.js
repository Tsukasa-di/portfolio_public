import { INST, LOCATION } from "../../global/objects";
import { getDocuments } from "./modules/getDocuments";
import { getSitemap } from "./modules/getSitemap";
import { Reactive } from "./modules/reactive";

export class Spa {
  constructor() {
    this.sitemaps = '';
    this.docs = {};
    this.url = {
      sitemap: LOCATION.origin + '/data/sitemap.json'
    }
  }

  init() {
    const reactive = new Reactive();
    reactive.init();
    return new Promise( resolve => {
      getSitemap().then( sitemap => {
        INST.spa.sitemaps = sitemap.sitemap;
        resolve(INST.spa.sitemaps);
      });
    })
      .then( sitemaps => {
        return getDocuments(sitemaps);
      })
      .then( docs => {
        return true;
      })
  }
}
