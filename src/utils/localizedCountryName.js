import countries from "i18n-iso-countries";

// Load locale data for Arabic and English
import enLocale from "i18n-iso-countries/langs/en.json";
import arLocale from "i18n-iso-countries/langs/ar.json";

countries.registerLocale(enLocale);
countries.registerLocale(arLocale);

export function localizedCountryName(countryCode, lang) {
    return countries.getName(countryCode, lang) || countryCode;
}
