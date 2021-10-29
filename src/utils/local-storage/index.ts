const storage = window.localStorage;
const MAX_TAG_NUM = 50;
const PREFIX_KEY = 'zet_storage_cache_';

const LocalStorage = {
  add: (key: string, value: any) => {
    try {
      if (typeof value === 'string') storage.setItem(key, value);
      else storage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(`添加localStorage失败==>key:${key}.`, err);
    }
  },
  /**
   * 添加，根据tag增加最大存储条数功能
   * @param key
   * @param value
   * @param tag 同一个tag最多可以存储MAX_TAG_NUM条记录
   * @returns
   */
  addTag: (key: string, value: any, tag: string) => {
    try {
      if (tag) {
        let cacheArr: string[] = JSON.parse(
          storage.getItem(PREFIX_KEY + tag) || '[]',
        );

        cacheArr.push(key);

        if (cacheArr.length > MAX_TAG_NUM) {
          for (let i = 0; i <= cacheArr.length - MAX_TAG_NUM; i++) {
            const delKey = cacheArr.shift() || '';
            storage.removeItem(delKey);
          }
        }

        storage.setItem(PREFIX_KEY + tag, JSON.stringify(cacheArr));
      } else {
        console.error(
          `缺少第三个参数tag。tag：同一个tag最多可以存储MAX_TAG_NUM=${MAX_TAG_NUM}条记录`,
        );
      }

      storage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(`添加localStorage失败==>key:${key}.`, err);
    }
  },
  get: (key: string): any => {
    const result = storage.getItem(key);
    try {
      let obj = JSON.parse(result || '');
      return result ? obj : null;
    } catch (err) {
      return result;
    }
  },
  remove: (key: string) => {
    storage.removeItem(key);
  },
  /**
   *
   * @param key
   * @param tag
   */
  removeTag: (key: string, tag: string) => {
    storage.removeItem(key);

    if (tag) {
      const cacheArr: string[] = JSON.parse(
        storage.getItem(PREFIX_KEY + tag) || '[]',
      );

      const newArr = cacheArr.filter((item) => {
        if (item !== key) {
          return true;
        }
      });

      storage.setItem(PREFIX_KEY + tag, JSON.stringify(newArr));
    } else {
      console.error(
        `缺少第二个参数tag。tag：同一个tag最多可以存储MAX_TAG_NUM条记录`,
      );
    }
  },
  clear: () => {
    storage.clear();
  },
};

export default LocalStorage;
