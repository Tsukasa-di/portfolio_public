import { PATHS } from "../../../global/variables";

export class GetDocuments {
  constructor(sitemap) {
    this.sitemap = sitemap;
    this.count = 0;
    this.DOCS = {};
  }

  ajax(resolve) {
    this.sitemap.forEach( path => {
      const request = new XMLHttpRequest();
      request.responseType = 'document';
      request.onreadystatechange = this.get.bind({path: path, it: this, resolve: resolve});
      request.open('GET', PATHS.root + path, true);
      request.send();
    });
  }

  get(event) {
    if (event.target.readyState === XMLHttpRequest.DONE) {
      if (event.target.status === 200) {
        this.it.count++;
        const path = PATHS.root.replace(location.origin, '') + this.path;
        this.it.DOCS[path] = event.target.response;
        if (this.it.sitemap.length === this.it.count) this.resolve(this.it.DOCS);
      } else {
        console.error(event.target);
      }
    }
  }
}
