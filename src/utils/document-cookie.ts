const SET_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const DELETE_COOKIE_MAX_AGE = 0;
export function getDocumentCookie(key: string) {
  if (typeof window !== "undefined") {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${key}=`))
      ?.split("=")[1];
  }
}

export function setDocumentCookie(key: string, value: string, age?: number) {
  if (typeof window !== "undefined") {
    document.cookie = `${key}=${value}; path=/; max-age=${age||SET_COOKIE_MAX_AGE}`;
  }
}

export function deleteDocumentCookie(key: string) {
  if (typeof window !== "undefined") {
    document.cookie = `${key}=; path=/; max-age=${DELETE_COOKIE_MAX_AGE}`;
  }
}
