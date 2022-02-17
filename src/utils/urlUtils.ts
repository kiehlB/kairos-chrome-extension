export function computeSearchParams(
  paramsString: string,
  newParams: { [queryName: string]: string | null }
) {
  const params = new URLSearchParams(paramsString);
  for (const [key, value] of Object.entries(newParams)) {
    if (value === null) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
  }
  params.sort();

  return params;
}

export function pickSearchParams(paramsString: string, paramKeys: string[]) {
  const params = new URLSearchParams(paramsString);
  const newParams = new URLSearchParams();
  for (const key of paramKeys) {
    const value = params.get(key);
    if (value) {
      newParams.set(key, value);
    }
  }
  newParams.sort();

  return newParams;
}
