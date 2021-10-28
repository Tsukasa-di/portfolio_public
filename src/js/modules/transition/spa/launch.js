import { GetDocuments } from "./_libs/getDocuments";
import { getSitemap } from "./_libs/getSitemap"
import { SPA } from "./_app";
import { promise } from "../../../_libs/async/promise";

export async function launch() {
  const sitemap = await promise( resolve => {
    getSitemap(resolve);
  });
  await promise( resolve => {
    const getDocuments = new GetDocuments(sitemap);
    getDocuments.ajax(docs => {
      SPA.docs = docs;
      console.log(
        ' ==================================\n' +
        ' %cLaunch SPA\n', 'background: green; color: #fff;',
        '==================================\n',
        SPA
      );
    });
    resolve();
  });
}
