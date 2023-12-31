export function getLocale() {
  if (navigator.languages) return navigator.languages[0];
  return navigator.language;
}

export function createLocaleDate(
  locale,
  options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  },
) {
  return new Date().toLocaleDateString(locale, options);
}

export function formatToLocaleDate(
  date,
  options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  },
) {
  return new Date(date).toLocaleDateString(getLocale(), options);
}
