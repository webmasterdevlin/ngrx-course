/* simple localStorage usage */

const key = "jwt";

export const storeJwt = (value: any) => {
  /* stringify it first */
  window.localStorage.setItem(key, JSON.stringify(value));
};

/* without type "any" as a fallback value in the generics,
 * it returns unknown type. */
export const getJwt = () => {
  /* get data from localStorage */
  const value: string | null = window.localStorage.getItem(key);

  /* return null if empty data */
  if (!value) return null;

  /* parse the data from localStorage because the data is in string state */
  return JSON.parse(value);
};

export const removeJwt = () => {
  window.localStorage.removeItem(key);
};
