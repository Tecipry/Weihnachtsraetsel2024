export function getParamValue(key) {
    const url = document.URL;
    var paramPairs = {};
    if (url.includes("?") && url.includes("=")) {
        var params = url.split("?")[1].split("&");
        paramPairs = params.reduce(function (acc, param) {
            var [key, value] = param.split("=");
            acc[key] = value;
            return acc;
        }, {});
    }
    if (key in paramPairs) {
        return paramPairs[key];
    }
    return null;
}