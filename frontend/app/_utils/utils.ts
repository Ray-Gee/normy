export const toCamelCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((item) => toCamelCase(item));
  } else if (obj !== null && typeof obj === "object") {
    const camelCaseObj: Record<string, any> = {};
    Object.keys(obj).forEach((key) => {
      const camelKey = key.replace(/(_[a-z])/g, (_, y) => y[1].toUpperCase());
      camelCaseObj[camelKey] = toCamelCase(obj[key]);
    });
    return camelCaseObj;
  } else {
    return obj;
  }
};

export const toSnakeCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((item) => toSnakeCase(item));
  } else if (obj !== null && typeof obj === "object") {
    const snakeCaseObj: Record<string, any> = {};
    Object.keys(obj).forEach((key) => {
      const snakeKey = key
        .replace(/\.?([A-Z]+)/g, (_, y) => `_${y.toLowerCase()}`)
        .replace(/^_/, "");
      snakeCaseObj[snakeKey] = toSnakeCase(obj[key]);
    });
    return snakeCaseObj;
  } else {
    return obj;
  }
};
