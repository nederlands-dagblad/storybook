export function setData<T extends object>(
  obj: T,
  path: string,
  value: any
): T {
  const keys = path.split(".");

  if (keys.length === 1) {
    return { ...obj, [keys[0]]: value };
  }

  const [firstKey, ...restKeys] = keys;
  return {
    ...obj,
    [firstKey]: setData(obj[firstKey as keyof T] || {}, restKeys.join("."), value),
  };
}
