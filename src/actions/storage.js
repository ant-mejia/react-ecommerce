import store from 'store';

this.setStorage = (key, value) => {
  if (value === null) {
    store.remove(key);
  } else {
    store.set(key, value);
  }
}

this.removeStorage = (item) => {
  store.remove(item);
}

this.getStorage = (key) => {
  if (key === undefined) {
    let allKeys = [];
    store.each((value, key) => allKeys.push({ key, value }))
    return allKeys;
  }
  return store.get(key);
}

export default this;