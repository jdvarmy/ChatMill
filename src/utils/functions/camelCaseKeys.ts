export function camelCaseKeys(obj: object) {
  return Object.entries(obj).reduce((carry, [key, value]) => {
    const newKey = key
      .split('_')
      .map((v, i) => (i === 0 ? v : v.charAt(0).toUpperCase() + v.slice(1).toLowerCase()))
      .join('');

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    carry[newKey] = value;

    return carry;
  }, {});
}
