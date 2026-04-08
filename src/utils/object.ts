export function getNestedProperty(obj: unknown, path: string): unknown {
  const keys = path.split(".");
  return keys.reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}
