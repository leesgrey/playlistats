type HashParams = Record<string, string>;

const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce((initial: HashParams, item: string) => {
    if (item) {
      var parts = item.split("=");
      const key = parts[0];
      const value = parts[1];

      if (key) {
        initial[key] = decodeURIComponent(value || "");
      }
    }
    return initial;
  }, {} as HashParams);

window.location.hash = "";

export default hash;
