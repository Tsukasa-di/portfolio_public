import { OBJECTS } from "../global/variables";

export async function launch(resolve) {
  console.log(
    ' ==================================\n' +
    ' %cPrepared All Objects.\n', 'background: green; color: #fff;',
    '==================================\n'
  );

  OBJECTS.creator.init();
  console.log(OBJECTS.creator.create());
  Object.keys(OBJECTS.op).forEach(key => {
    OBJECTS.op[key].init();
  });

  resolve();
}
