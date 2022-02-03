/*
  -- Countries.js
 Checks country availability by id, country name or country code.

 -- Made for Old and New-Gen. 
*/

const Logger = require.main.require("./Logger")

const Countries = [
    {
        Id: 8399,
        Country: "France",
        Code: "FR"
    }, {
        Id: 8401,
        Country: "Andorra",
        Code: "AD"
    }, {
        Id: 8402,
        Country: "Austria",
        Code: "AT"
    }, {
        Id: 8403,
        Country: "Antigua and Barbuda",
        Code: "AG"
    }, {
        Id: 8404,
        Country: "Argentina",
        Code: "AR"
    }, {
        Id: 8405,
        Country: "Anguilla",
        Code: "AI"
    }, {
        Id: 8406,
        Country: "Albania",
        Code: "AL"
    }, {
        Id: 8407,
        Country: "Angola",
        Code: "AO"
    }, {
        Id: 8408,
        Country: "Australia",
        Code: "AU"
    }, {
        Id: 8409,
        Country: "Aruba",
        Code: "AW"
    }, {
        Id: 8410,
        Country: "Azerbaijan",
        Code: "AZ"
    }, {
        Id: 8411,
        Country: "Bosnia and Herzegovina",
        Code: "BA"
    }, {
        Id: 8412,
        Country: "Barbados",
        Code: "BB"
    }, {
        Id: 11863,
        Country: "Israel",
        Code: "IL"
    }, {
        Id: 11864,
        Country: "Lebanon",
        Code: "LB"
    }, {
        Id: 11865,
        Country: "Ukraine",
        Code: "UA"
    }, {
        Id: 8413,
        Country: "Belgium",
        Code: "BE"
    }, {
        Id: 8414,
        Country: "Bulgaria",
        Code: "BG"
    }, {
        Id: 8415,
        Country: "Bahrain",
        Code: "BH"
    }, {
        Id: 8416,
        Country: "Bermuda",
        Code: "BM"
    }, {
        Id: 8417,
        Country: "Bolivia",
        Code: "BO"
    }, {
        Id: 8418,
        Country: "Brazil",
        Code: "BR"
    }, {
        Id: 8419,
        Country: "Bahamas",
        Code: "BS"
    }, {
        Id: 8420,
        Country: "Botswana",
        Code: "BW"
    }, {
        Id: 8421,
        Country: "Belize",
        Code: "BZ"
    }, {
        Id: 8422,
        Country: "Canada",
        Code: "CA"
    }, {
        Id: 8423,
        Country: "China",
        Code: "CN"
    }, {
        Id: 8424,
        Country: "Chile",
        Code: "CL"
    }, {
        Id: 8425,
        Country: "Colombia",
        Code: "CO"
    }, {
        Id: 8426,
        Country: "Costa Rica",
        Code: "CR"
    }, {
        Id: 8427,
        Country: "Cyprus",
        Code: "CY"
    }, {
        Id: 8428,
        Country: "Czech Republic",
        Code: "CZ"
    }, {
        Id: 8429,
        Country: "Germany",
        Code: "DE"
    }, {
        Id: 8430,
        Country: "Djibouti",
        Code: "DJ"
    }, {
        Id: 8431,
        Country: "Denmark",
        Code: "DK"
    }, {
        Id: 8432,
        Country: "Dominica",
        Code: "DM"
    }, {
        Id: 8433,
        Country: "Dominican Republic",
        Code: "DO"
    }, {
        Id: 8434,
        Country: "Ecuador",
        Code: "EC"
    }, {
        Id: 8435,
        Country: "Estonia",
        Code: "EE"
    }, {
        Id: 8436,
        Country: "Egypt",
        Code: "EG"
    }, {
        Id: 8437,
        Country: "Eritrea",
        Code: "ER"
    }, {
        Id: 8438,
        Country: "Spain",
        Code: "ES"
    }, {
        Id: 8439,
        Country: "Finland",
        Code: "FI"
    }, {
        Id: 8440,
        Country: "French Guiana",
        Code: "GF"
    }, {
        Id: 8441,
        Country: "Grenada",
        Code: "GD"
    }, {
        Id: 8442,
        Country: "Guernsey",
        Code: "GG"
    }, {
        Id: 8443,
        Country: "Ghana",
        Code: "GH"
    }, {
        Id: 8444,
        Country: "Gibraltar",
        Code: "GI"
    }, {
        Id: 8445,
        Country: "Guadeloupe",
        Code: "GP"
    }, {
        Id: 8446,
        Country: "Greece",
        Code: "GR"
    }, {
        Id: 8447,
        Country: "Guatemala",
        Code: "GT"
    }, {
        Id: 8448,
        Country: "Guyana",
        Code: "GY"
    }, {
        Id: 8449,
        Country: "Hong Kong",
        Code: "HK"
    }, {
        Id: 8450,
        Country: "Honduras",
        Code: "HN"
    }, {
        Id: 8451,
        Country: "Croatia",
        Code: "HR"
    }, {
        Id: 8452,
        Country: "Haiti",
        Code: "HT"
    }, {
        Id: 8453,
        Country: "Hungary",
        Code: "HU"
    }, {
        Id: 8454,
        Country: "Indonesia",
        Code: "ID"
    }, {
        Id: 8455,
        Country: "Ireland",
        Code: "IE"
    }, {
        Id: 8456,
        Country: "Isle of Man",
        Code: "IM"
    }, {
        Id: 8457,
        Country: "India",
        Code: "IN"
    }, {
        Id: 8458,
        Country: "Iceland",
        Code: "IS"
    }, {
        Id: 8459,
        Country: "Italy",
        Code: "IT"
    }, {
        Id: 8460,
        Country: "Jersey",
        Code: "JE"
    }, {
        Id: 8461,
        Country: "Jamaica",
        Code: "JM"
    }, {
        Id: 8462,
        Country: "Jordan",
        Code: "JO"
    }, {
        Id: 8463,
        Country: "Japan",
        Code: "JP"
    }, {
        Id: 8464,
        Country: "Saint Kitts and Nevis",
        Code: "KN"
    }, {
        Id: 8465,
        Country: "South Korea",
        Code: "KR"
    }, {
        Id: 8466,
        Country: "Kuwait",
        Code: "KW"
    }, {
        Id: 8467,
        Country: "Cayman Islands",
        Code: "KY"
    }, {
        Id: 8468,
        Country: "Saint Lucia",
        Code: "LE"
    }, {
        Id: 8469,
        Country: "Liechtenstein",
        Code: "LI"
    }, {
        Id: 8470,
        Country: "Lesotho",
        Code: "LS"
    }, {
        Id: 8471,
        Country: "Lithuania",
        Code: "LT"
    }, {
        Id: 8472,
        Country: "Luxembourg",
        Code: "LU"
    }, {
        Id: 8473,
        Country: "Latvia",
        Code: "LV"
    }, {
        Id: 8474,
        Country: "Monaco",
        Code: "MC"
    }, {
        Id: 8475,
        Country: "Montenegro",
        Code: "ME"
    }, {
        Id: 8476,
        Country: "Macedonia",
        Code: "MK"
    }, {
        Id: 8477,
        Country: "Mali",
        Code: "ML"
    }, {
        Id: 8478,
        Country: "Macau",
        Code: "MO"
    }, {
        Id: 8479,
        Country: "Martinique",
        Code: "MQ"
    }, {
        Id: 8480,
        Country: "Mauritania",
        Code: "MR"
    }, {
        Id: 8481,
        Country: "Montserrat",
        Code: "MS"
    }, {
        Id: 8482,
        Country: "Malta",
        Code: "MT"
    }, {
        Id: 8483,
        Country: "Mexico",
        Code: "MX"
    }, {
        Id: 8484,
        Country: "Malaysia",
        Code: "MY"
    }, {
        Id: 8485,
        Country: "Mozambique",
        Code: "MZ"
    }, {
        Id: 8486,
        Country: "Namibia",
        Code: "NA"
    }, {
        Id: 8487,
        Country: "Niger",
        Code: "NE"
    }, {
        Id: 8488,
        Country: "Nigeria",
        Code: "NG"
    }, {
        Id: 8489,
        Country: "Nicaragua",
        Code: "NI"
    }, {
        Id: 8490,
        Country: "Netherlands",
        Code: "NL"
    }, {
        Id: 8491,
        Country: "Norway",
        Code: "NO"
    }, {
        Id: 8492,
        Country: "New Zealand",
        Code: "NZ"
    }, {
        Id: 8493,
        Country: "Oman",
        Code: "OM"
    }, {
        Id: 8494,
        Country: "Panama",
        Code: "PA"
    }, {
        Id: 8495,
        Country: "Peru",
        Code: "PE"
    }, {
        Id: 8496,
        Country: "Philippines",
        Code: "PH"
    }, {
        Id: 8497,
        Country: "Poland",
        Code: "PL"
    }, {
        Id: 8498,
        Country: "Portugal",
        Code: "PT"
    }, {
        Id: 8499,
        Country: "Paraguay",
        Code: "PY"
    }, {
        Id: 8500,
        Country: "Qatar",
        Code: "QA"
    }, {
        Id: 8501,
        Country: "Romania",
        Code: "RO"
    }, {
        Id: 8502,
        Country: "Serbia",
        Code: "RS"
    }, {
        Id: 8503,
        Country: "Russian Federation",
        Code: "RU"
    }, {
        Id: 8504,
        Country: "Saudi Arabia",
        Code: "SA"
    }, {
        Id: 8505,
        Country: "Sudan",
        Code: "SD"
    }, {
        Id: 8506,
        Country: "Sweden",
        Code: "SE"
    }, {
        Id: 8507,
        Country: "Singapore",
        Code: "SG"
    }, {
        Id: 8508,
        Country: "Slovenia",
        Code: "SI"
    }, {
        Id: 8509,
        Country: "Slovakia",
        Code: "SK"
    }, {
        Id: 8510,
        Country: "San Marino",
        Code: "SM"
    }, {
        Id: 8511,
        Country: "Somalia",
        Code: "SO"
    }, {
        Id: 8512,
        Country: "Suriname",
        Code: "SR"
    }, {
        Id: 8513,
        Country: "El Salvador",
        Code: "SV"
    }, {
        Id: 8514,
        Country: "Syrian Arab Republic",
        Code: "SY"
    }, {
        Id: 8515,
        Country: "Swaziland",
        Code: "SZ"
    }, {
        Id: 8516,
        Country: "Taiwan",
        Code: "TW"
    }, {
        Id: 8517,
        Country: "Chad",
        Code: "TD"
    }, {
        Id: 8518,
        Country: "Thailand",
        Code: "TH"
    }, {
        Id: 8519,
        Country: "Turkey",
        Code: "TR"
    }, {
        Id: 8520,
        Country: "Trinidad and Tobago",
        Code: "TT"
    }, {
        Id: 8521,
        Country: "United States",
        Code: "US"
    }, {
        Id: 8758,
        Country: "United Kingdom",
        Code: "UK"
    }, {
        Id: 8522,
        Country: "Uruguay",
        Code: "UY"
    }, {
        Id: 8523,
        Country: "Holy See (Vatican City State)",
        Code: "VA"
    }, {
        Id: 8524,
        Country: "Saint Vincent and the Grenadines",
        Code: "VC"
    }, {
        Id: 8525,
        Country: "Venezuela",
        Code: "VE"
    }, {
        Id: 8526,
        Country: "Turks and Caicos Islands",
        Code: "TC"
    }, {
        Id: 8528,
        Country: "United States Virgin Islands",
        Code: "VI"
    }, {
        Id: 8529,
        Country: "South Africa",
        Code: "ZA"
    }, {
        Id: 8530,
        Country: "Zambia",
        Code: "ZM"
    }, {
        Id: 8531,
        Country: "Zimbabwe",
        Code: "ZW"
    }, {
        Id: 8830,
        Country: "United Arab Emirates",
        Code: "AE"
    }, {
        Id: 8831,
        Country: "Netherlands Antilles",
        Code: "AN"
    }, {
        Id: 8833,
        Country: "British Virgin Islands",
        Code: "VG"
    }
]

// Find country by the Id.
function FindById(id) {
  return Countries.filter(c => {return c.Id == Number(id)})
}

// Find country by the name.
function FindByCountry(country) {
  return Countries.filter(c => {return c.Country == country})
}

// Find country by its two-digit code.
function FindByCode(code) {
  return Countries.filter(c => {return c.Code == code})
}

// Checks if a country is in the list.
function IsCountryAvailable(id) {
  let result = FindById(id)
  
  if (result[0]) return true;
  else {
    Logger.info(`Countries.IsCountryAvailable - ${id} is not an available country, are we sure it's not missing?`)
    return false;
  }
}


module.exports = {
  FindById,
  FindByCountry,
  FindByCode,
  IsCountryAvailable
}