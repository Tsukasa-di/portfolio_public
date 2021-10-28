import { LOADERS, PATHS } from "../../global/variables";
import { status } from "./status";

export class Loader {
  constructor(name, loader, members) {
    this.name = name;
    this.loader = loader;
    this.members = members;
  }

  _loadAsync(path) {
    const Loader = this;
    return new Promise(resolve => {
      Loader.loader.load(path, item => {
        const splitSlash  = path.split('/');
        const name = splitSlash[splitSlash.length - 1].split('.')[0]
        item.name = name;
        LOADERS[Loader.name][name] = item;
        console.log(
          '%c' + Loader.name + '\n', 'color: blue;',
          status[Loader.name].progress++
        );
        resolve(item);
      });
    });
  }

  load() {
    const Loader = this;
    const readers = [];

    this.members.forEach( path => {
      readers.push(
        this._loadAsync(PATHS.root + path)
      );
    });

    const promiseAll = Promise.all(readers);

    promiseAll.then(items => {
      status[Loader.name].fix = true;
      console.log(
        '%c[' + Loader.name + '] load complete.\n', 'background: green; color: white;',
        items, '\n',
        status[Loader.name].fix
      );
    });

    return promiseAll;
  }
}
