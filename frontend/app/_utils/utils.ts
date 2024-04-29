export function toSnakeCase<T extends Record<string, any>>(
  obj: T
): Record<string, any> {
  const newObj: Record<string, any> = {};
  Object.keys(obj).forEach((key) => {
    const newKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
    newObj[newKey] = obj[key];
  });
  return newObj;
}

export function toCamelCase<T extends Record<string, any>>(
  obj: T
): Record<string, any> {
  const newObj: Record<string, any> = {};
  Object.keys(obj).forEach((key) => {
    const newKey = key.replace(/_([a-z])/g, (_, g1) => g1.toUpperCase());
    newObj[newKey] = obj[key];
  });
  return newObj;
}
