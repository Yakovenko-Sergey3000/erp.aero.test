function cleanObject<T extends Record<string, any>>(obj: T): Partial<T> {
  return Object.entries(obj).reduce((acc, [key, val]) => {
    if (val) {
      (acc as any)[key] = val;
    }
    return acc;
  }, {} as Partial<T>);
}

export default cleanObject;
