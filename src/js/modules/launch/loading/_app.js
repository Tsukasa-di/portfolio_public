import { LOADERS, OBJECTS } from '../../global/variables';
import { launch } from '../../transition/spa/launch';
import { promise } from '../../../_libs/async/promise';

export async function loading() {
  await promise( resolve => {
    console.log(
      ' ==================================\n' +
      ' %cWe\'re launching project members.\n', 'background: blue; color: #fff;',
      '=================================='
    );
    resolve();
  });
  await import('./loaders').then( module => {
    return Promise.all([...module.loaders, launch()]);
  });
  await promise( resolve => {
    console.log(
      ' ==================================\n' +
      ' %cLoaded assets\n', 'background: blue; color: #fff;',
      '==================================\n',
      LOADERS
    );
    resolve();
  });
  await new Promise( resolve => {
    OBJECTS.launch(resolve);
  });
}
