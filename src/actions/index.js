import * as storage from './storage';

const imports = [storage];
let actions = {};

imports.map((fn) => {
  Object.assign(actions, fn)
});


export default actions;