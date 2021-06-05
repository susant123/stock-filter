module.exports = {
  stringFormat: (str, ...rest) => {
    if (!str || typeof str !== "string") return "";
    return str.replace(/{(\d+)}/g, (match, number) => {
      return typeof rest[number] !== "undefined" ? rest[number] : match;
    });
  },
};
