import store from 'store';

let that = {}

that.setStorage = (key, value) => {
  if (value === null) {
    store.remove(key);
  } else {
    store.set(key, value);
  }
}

that.removeStorage = (item) => {
  store.remove(item);
}

that.getStorage = (key) => {
  if (key === undefined) {
    let allKeys = [];
    store.each((value, key) => allKeys.push({ key, value }))
    return allKeys;
  }
  return store.get(key);
}

export default that;