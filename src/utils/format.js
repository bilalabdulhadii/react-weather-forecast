import moment from "moment";

export function formatNumber(num, lang = "en") {
    return new Intl.NumberFormat(lang, {
        numberingSystem: lang === "ar" ? "arab" : "latn",
    }).format(num);
}

/* export function formatDate(momentObj, lang) {
    if (!momentObj || !moment.isMoment(momentObj)) return "";
    const isArabic = lang === "ar";
    return momentObj
        .clone()
        .locale(lang)
        .format(isArabic ? "dddd - YYYY/MM/DD" : "DD/MM/YYYY - ddd");
} */

        export function formatDate(momentObj, lang) {
            /* if (!momentObj || !moment.isMoment(momentObj)) {
                console.warn("Invalid momentObj in formatDate:", momentObj);
                return "";
            } */

            

                try {
                    return momentObj
                        .clone()
                        .locale(lang)
                        .format(
                            lang === "ar"
                                ? "dddd - YYYY/MM/DD"
                                : "DD/MM/YYYY - ddd"
                        );
                } catch (e) {
                    console.error("Moment formatting failed:", e, momentObj);
                    return "";
                }
        }

export function formatSunriseOrSunset(unixTimestamp, lang) {
    if (!unixTimestamp) return "";
    const isArabic = lang === "ar";
    return moment.unix(unixTimestamp).locale(lang).format(isArabic ? "mm:HH" : "HH:mm");
}
