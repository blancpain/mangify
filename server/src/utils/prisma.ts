// As per prisma docs, excluding a key from a given type
export function exclude<Type, Key extends keyof Type>(type: Type, keys: Key[]): Omit<Type, Key> {
  const filteredEntries = Object.entries(type as Record<string, unknown>).filter(
    ([key]) => !keys.includes(key as Key),
  );
  return Object.fromEntries(filteredEntries) as Omit<Type, Key>;
}
