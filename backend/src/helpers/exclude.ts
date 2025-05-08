function exclude<T, K extends keyof T>(object: T, omit: K[]): Omit<T, K> {
  const data = { ...object };

  omit.forEach((key) => delete data[key]);

  return data;
}

export default exclude;
