export function RetriveData(name: string, type: string): string | null {
  const storage = type == "session" ? sessionStorage : localStorage;
  if (name) {
    const data = storage.getItem(name);
    return JSON.stringify(data)[0];
  }
  return null;
}

export function StoreData(name: string, type: string, value: string): boolean {
  const storage = type == "session" ? sessionStorage : localStorage;
  if (name) {
    storage.setItem(name, value);
    return true;
  }
  return false;
}
