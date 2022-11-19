export function cloneDeep<T extends object = object>(obj: T) {
  return (function _cloneDeep(item: T): T | Date | Set<unknown> | Map<unknown, unknown> | object | T[] {
    // * null
    // * undefined
    // * boolean
    // * number
    // * string
    // * symbol
    // * function
    if (item === null || typeof item !== 'object') {
      return item;
    }

    // * Date
    if (item instanceof Date) {
      return new Date(item.valueOf());
    }

    // * Array
    if (item instanceof Array) {
      const copy: [] = [];

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      item.forEach((_, i) => (copy[i] = _cloneDeep(item[i])));

      return copy;
    }

    // * Set
    if (item instanceof Set) {
      const copy = new Set();

      item.forEach((v) => copy.add(_cloneDeep(v)));

      return copy;
    }

    // * Map
    if (item instanceof Map) {
      const copy = new Map();

      item.forEach((v, k) => copy.set(k, _cloneDeep(v)));

      return copy;
    }

    // * Object
    if (item instanceof Object) {
      const copy: object = {};

      // * Object.symbol
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      Object.getOwnPropertySymbols(item).forEach((s) => (copy[s] = _cloneDeep(item[s])));

      // * Object.name (other)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      Object.keys(item).forEach((k) => (copy[k] = _cloneDeep(item[k])));

      return copy;
    }

    throw new Error(`Unable to copy object: ${item}`);
  })(obj);
}

export default cloneDeep;
