const objectToQueryString = (params: any) => {
  const esc = encodeURIComponent;
  return Object.keys(params)
    .filter((k) => {
      return params[k];
    })
    .map((k) => {
      if (Array.isArray(params[k])) {
        let result = "";
        for (const item of params[k]) {
          if (result !== "") {
            result = "&" + result;
          }
          result += esc(k) + "=" + esc(item["id"]);
        }
        return result;
      }

      return esc(k) + "=" + esc(params[k]);
    })
    .join("&");
};

const ServiceUtils = {
  objectToQueryString,
};

export { ServiceUtils };
