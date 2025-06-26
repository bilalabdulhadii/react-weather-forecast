import moment from "moment";

export function formatNumber(num, lang = "en") {
    return new Intl.NumberFormat(lang, {
        numberingSystem: lang === "ar" ? "arab" : "latn",
    }).format(num);
}

export function formatDate(momentObj, lang) {
    try {
        return momentObj
            .clone()
            .locale(lang)
            .format(lang === "ar" ? "dddd - YYYY/MM/DD" : "DD/MM/YYYY - ddd");
    } catch (e) {
        console.error("Moment formatting failed:", e, momentObj);
        return "";
    }
}

export function formatSunriseOrSunset(unixTimestamp, lang) {
    if (!unixTimestamp) return "";
    return moment
        .unix(unixTimestamp)
        .locale(lang)
        .format("HH:mm");
}
