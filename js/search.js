document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('btnNavbarSearch');
    const searchInput = document.querySelector('.form-control');
 
    

    // 검색창 자동완성 기능 추가
    const searchResults = document.createElement('ul');
    searchResults.style.position = 'absolute';
    searchResults.style.backgroundColor = 'white';
    searchResults.style.border = '1px solid #ccc';
    searchResults.style.zIndex = 1000;
    searchResults.style.listStyle = 'none';
    searchResults.style.padding = '0';
    searchResults.style.margin = '0';
    searchResults.style.width = `${searchInput.offsetWidth}px`; // 템플릿 리터럴 사용
    searchResults.style.maxHeight = '200px'; // 최대 높이 200px
    searchResults.style.overflowY = 'auto'; // 세로 스크롤 활성화
    searchInput.parentElement.appendChild(searchResults);

  let currentIndex = -1;

    // 국가와 좌표 데이터
    const countryCoordinates = {
        "Afghanistan": [33.93911, 67.709953],
        "Albania": [41.153332, 20.168331],
        "Algeria": [28.033886, 1.659626],
        "Andorra": [42.546245, 1.601554],
        "Angola": [-11.202692, 17.873887],
        "Antigua and Barbuda": [17.060816, -61.796428],
        "Argentina": [-38.416097, -63.616672],
        "Armenia": [40.069099, 45.038189],
        "Australia": [-25.274398, 133.775136],
        "Austria": [47.516231, 14.550072],
        "Azerbaijan": [40.143105, 47.576927],
        "Bahamas": [25.03428, -77.39628],
        "Bahrain": [26.0667, 50.5577],
        "Bangladesh": [23.684994, 90.356331],
        "Barbados": [13.193887, -59.543198],
        "Belarus": [53.709807, 27.953389],
        "Belgium": [50.503887, 4.469936],
        "Belize": [17.189877, -88.49765],
        "Benin": [9.30769, 2.315834],
        "Bhutan": [27.514162, 90.433601],
        "Bolivia": [-16.290154, -63.588653],
        "Bosnia and Herzegovina": [43.915886, 17.679076],
        "Botswana": [-22.328474, 24.684866],
        "Brazil": [-14.235004, -51.92528],
        "Brunei": [4.535277, 114.727669],
        "Bulgaria": [42.733883, 25.48583],
        "Burkina Faso": [12.238333, -1.561593],
        "Burundi": [-3.373056, 29.918886],
        "Cambodia": [12.565679, 104.990963],
        "Cameroon": [7.369722, 12.354722],
        "Canada": [56.130366, -106.346771],
        "Central African Republic": [6.611111, 20.939444],
        "Chad": [15.454166, 18.732207],
        "Chile": [-35.675147, -71.542969],
        "China": [35.86166, 104.195397],
        "Colombia": [4.570868, -74.297333],
        "Comoros": [-11.875001, 43.872219],
        "Congo, Dem. Rep.": [-4.038333, 21.758664],
        "Republic of the Congo": [-0.228021, 15.827659],
        "Costa Rica": [9.748917, -83.753428],
        "Croatia": [45.1, 15.2],
        "Cuba": [21.521757, -77.781167],
        "Cyprus": [35.126413, 33.429859],
        "Czech Republic": [49.817492, 15.472962],
        "Denmark": [56.26392, 9.501785],
        "Djibouti": [11.825138, 42.590275],
        "Dominica": [15.414999, -61.370976],
        "Dominican Republic": [18.735693, -70.162651],
        "Ecuador": [-1.831239, -78.183406],
        "Egypt": [26.820553, 30.802498],
        "El Salvador": [13.794185, -88.89653],
        "Equatorial Guinea": [1.650801, 10.267895],
        "Eritrea": [15.179384, 39.782334],
        "Estonia": [58.595272, 25.013607],
        "Ethiopia": [9.145, 40.489673],
        "Fiji": [-16.578193, 179.414413],
        "Finland": [61.92411, 25.748151],
        "France": [46.603354, 1.888334],
        "Gabon": [-0.803689, 11.609444],
        "Gambia": [13.443182, -15.310139],
        "Georgia": [42.315407, 43.356892],
        "Germany": [51.165691, 10.451526],
        "Ghana": [7.946527, -1.023194],
        "Greece": [39.074208, 21.824312],
        "Guatemala": [15.783471, -90.230759],
        "Guinea": [9.945587, -9.696645],
        "Guinea-Bissau": [11.803749, -15.180413],
        "Guyana": [4.860416, -58.93018],
        "Haiti": [18.971187, -72.285215],
        "Honduras": [15.199999, -86.241905],
        "Hungary": [47.162494, 19.503304],
        "Iceland": [64.963051, -19.020835],
        "India": [20.593684, 78.96288],
        "Indonesia": [-0.789275, 113.921327],
        "Iran, Islamic Rep.": [32.427908, 53.688046],
        "Iraq": [33.223191, 43.679291],
        "Ireland": [53.41291, -8.24389],
        "Israel": [31.046051, 34.851612],
        "Italy": [41.87194, 12.56738],
        "Japan": [36.204824, 138.252924],
        "Jordan": [30.585164, 36.238414],
        "Kazakhstan": [48.019573, 66.923684],
        "Kenya": [-1.286389, 36.817223],
        "South Korea": [35.907757, 127.766922],
        "Kuwait": [29.31166, 47.481766],
        "Latvia": [56.879635, 24.603189],
        "Lebanon": [33.854721, 35.862285],
        "Lithuania": [55.169438, 23.881275],
        "Luxembourg": [49.815273, 6.129583],
        "Madagascar": [-18.766947, 46.869107],
        "Malaysia": [4.210484, 101.975766],
        "Mexico": [23.634501, -102.552784],
        "Netherlands": [52.132633, 5.291266],
        "New Zealand": [-40.900557, 174.885971],
        "Norway": [60.472024, 8.468946],
        "Pakistan": [30.375321, 69.345116],
        "Philippines": [12.879721, 121.774017],
        "Poland": [51.919438, 19.145136],
        "Portugal": [39.399872, -8.224454],
        "Qatar": [25.354826, 51.183884],
        "Russian Federation": [61.52401, 105.318756],
        "Saudi Arabia": [23.885942, 45.079162],
        "South Africa": [-30.559482, 22.937506],
        "Spain": [40.463667, -3.74922],
        "Sri Lanka": [7.873054, 80.771797],
        "Sweden": [60.128161, 18.643501],
        "Switzerland": [46.818188, 8.227512],
        "Thailand": [15.870032, 100.992541],
        "Turkey": [38.963745, 35.243322],
        "United Arab Emirates": [23.424076, 53.847818],
        "United Kingdom": [55.378051, -3.435973],
        "United States": [37.09024, -95.712891],
        "Vietnam": [14.058324, 108.277199],
        "Zambia": [-13.133897, 27.849332],
        "Zimbabwe": [-19.015438, 29.154857],  
        "Côte d'Ivoire": [7.539989, -5.54708],
        "East Timor": [-8.874217, 125.727539],
        "Kiribati": [1.870883, -157.363026],
        "Kyrgyzstan": [41.20438, 74.766098],
        "Laos": [19.85627, 102.495496],
        "Lesotho": [-29.609988, 28.233608],
        "Liberia": [6.428055, -9.429499],
        "Libya": [26.3351, 17.228331],
        "Liechtenstein": [47.166, 9.555373],
        "Macao SAR, China": [22.198745, 113.543873],
        "Madagascar": [-18.766947, 46.869107],
        "Malawi": [-13.254308, 34.301525],
        "Maldives": [3.202778, 73.22068],
        "Mali": [17.570692, -3.996166],
        "Malta": [35.937496, 14.375416],
        "Marshall Islands": [7.131474, 171.184478],
        "Mauritania": [21.00789, -10.940835],
        "Mauritius": [-20.348404, 57.552152],
        "Micronesia": [7.425554, 150.550812],
        "Moldova": [47.411631, 28.369885],
        "Monaco": [43.750298, 7.412841],
        "Mongolia": [46.862496, 103.846656],
        "Montenegro": [42.708678, 19.37439],
        "Morocco": [31.791702, -7.09262],
        "Mozambique": [-18.665695, 35.529562],
        "Myanmar": [21.916221, 95.955974],
        "Namibia": [-22.95764, 18.49041],
        "Nauru": [-0.522778, 166.931503],
        "Nepal": [28.394857, 84.124008],
        "Nicaragua": [12.865416, -85.207229],
        "Niger": [17.607789, 8.081666],
        "Nigeria": [9.081999, 8.675277],
        "North Macedonia": [41.608635, 21.745275],
        "Oman": [21.512583, 55.923255],
        "Palau": [7.51498, 134.58252],
        "Panama": [8.537981, -80.782127],
        "Papua New Guinea": [-6.314993, 143.95555],
        "Paraguay": [-23.442503, -58.443832],
        "Peru": [-9.189967, -75.015152],
        "Romania": [45.943161, 24.96676],
        "Rwanda": [-1.940278, 29.873888],
        "Samoa": [-13.759029, -172.104629],
        "San Marino": [43.933594, 12.447383],
        "Senegal": [14.497401, -14.452362],
        "Serbia": [44.016521, 21.005859],
        "Seychelles": [-4.679574, 55.491977],
        "Sierra Leone": [8.460555, -11.779889],
        "Singapore": [1.352083, 103.819836],
        "Slovakia": [48.669026, 19.699024],
        "Slovenia": [46.151241, 14.995463],
        "Solomon Islands": [-9.64571, 160.156194],
        "Somalia": [5.152149, 46.199616],
        "South Sudan": [7.862684, 29.694923],
        "Sri Lanka": [7.873054, 80.771797],
        "St. Kitts and Nevis": [17.357822, -62.782998],
        "St. Lucia": [13.909444, -60.978893],
        "St. Vincent and the Grenadines": [12.984305, -61.287228],
        "Sudan": [12.862807, 30.217636],
        "Suriname": [3.919305, -56.027783],
        "Syrian Arab Republic": [34.802075, 38.996815],
        "Tajikistan": [38.861034, 71.276093],
        "Tanzania": [-6.369028, 34.888822],
        "Togo": [8.619543, 0.824782],
        "Tonga": [-21.178986, -175.198242],
        "Trinidad and Tobago": [10.691803, -61.222503],
        "Tunisia": [33.886917, 9.537499],
        "Turkmenistan": [38.969719, 59.556278],
        "Tuvalu": [-7.109535, 177.64933],
        "Uganda": [1.373333, 32.290275],
        "Ukraine": [48.379433, 31.16558],
        "Uruguay": [-32.522779, -55.765835],
        "Uzbekistan": [41.377491, 64.585262],
        "Vanuatu": [-15.376706, 166.959158],
        "Venezuela, RB": [6.42375, -66.58973],
        "Yemen, Rep.": [15.552727, 48.516388],
        "Hong Kong SAR, China": [22.396428, 114.109497],
        "Jamaica": [18.109581, -77.297508]
    };
    
    //국가 국기 설정//
    const countryFlags = {
        "Afghanistan": "af",
        "Albania": "al",
        "Algeria": "dz",
        "Andorra": "ad",
        "Angola": "ao",
        "Antigua and Barbuda": "ag",
        "Argentina": "ar",
        "Armenia": "am",
        "Australia": "au",
        "Austria": "at",
        "Azerbaijan": "az",
        "Bahamas": "bs",
        "Bahrain": "bh",
        "Bangladesh": "bd",
        "Barbados": "bb",
        "Belarus": "by",
        "Belgium": "be",
        "Belize": "bz",
        "Benin": "bj",
        "Bhutan": "bt",
        "Bolivia": "bo",
        "Bosnia and Herzegovina": "ba",
        "Botswana": "bw",
        "Brazil": "br",
        "Brunei": "bn",
        "Bulgaria": "bg",
        "Burkina Faso": "bf",
        "Burundi": "bi",
        "Cambodia": "kh",
        "Cameroon": "cm",
        "Canada": "ca",
        "Central African Republic": "cf",
        "Chad": "td",
        "Chile": "cl",
        "China": "cn",
        "Colombia": "co",
        "Comoros": "km",
        "Congo, Dem. Rep.": "cd",
        "Republic of the Congo": "cg",
        "Costa Rica": "cr",
        "Croatia": "hr",
        "Cuba": "cu",
        "Cyprus": "cy",
        "Czech Republic": "cz",
        "Denmark": "dk",
        "Djibouti": "dj",
        "Dominica": "dm",
        "Dominican Republic": "do",
        "Ecuador": "ec",
        "Egypt": "eg",
        "El Salvador": "sv",
        "Equatorial Guinea": "gq",
        "Eritrea": "er",
        "Estonia": "ee",
        "Ethiopia": "et",
        "Fiji": "fj",
        "Finland": "fi",
        "France": "fr",
        "Gabon": "ga",
        "Gambia": "gm",
        "Georgia": "ge",
        "Germany": "de",
        "Ghana": "gh",
        "Greece": "gr",
        "Guatemala": "gt",
        "Guinea": "gn",
        "Guinea-Bissau": "gw",
        "Guyana": "gy",
        "Haiti": "ht",
        "Honduras": "hn",
        "Hungary": "hu",
        "Iceland": "is",
        "India": "in",
        "Indonesia": "id",
        "Iran, Islamic Rep.": "ir",
        "Iraq": "iq",
        "Ireland": "ie",
        "Israel": "il",
        "Italy": "it",
        "Japan": "jp",
        "Jordan": "jo",
        "Kazakhstan": "kz",
        "Kenya": "ke",
        "South Korea": "kr",
        "Kuwait": "kw",
        "Latvia": "lv",
        "Lebanon": "lb",
        "Lithuania": "lt",
        "Luxembourg": "lu",
        "Madagascar": "mg",
        "Malaysia": "my",
        "Mexico": "mx",
        "Netherlands": "nl",
        "New Zealand": "nz",
        "Norway": "no",
        "Pakistan": "pk",
        "Philippines": "ph",
        "Poland": "pl",
        "Portugal": "pt",
        "Qatar": "qa",
        "Russian Federation": "ru",
        "Saudi Arabia": "sa",
        "South Africa": "za",
        "Spain": "es",
        "Sri Lanka": "lk",
        "Sweden": "se",
        "Switzerland": "ch",
        "Thailand": "th",
        "Turkey": "tr",
        "United Arab Emirates": "ae",
        "United Kingdom": "gb",
        "United States": "us",
        "Vietnam": "vn",
        "Zambia": "zm",
        "Zimbabwe": "zw",
        "Côte d'Ivoire": "ci",
        "East Timor": "tl",
        "Kiribati": "ki",
        "Kyrgyzstan": "kg",
        "Laos": "la",
        "Lesotho": "ls",
        "Liberia": "lr",
        "Libya": "ly",
        "Liechtenstein": "li",
        "Macao SAR, China": "mo",
        "Malawi": "mw",
        "Maldives": "mv",
        "Mali": "ml",
        "Malta": "mt",
        "Marshall Islands": "mh",
        "Mauritania": "mr",
        "Mauritius": "mu",
        "Micronesia": "fm",
        "Moldova": "md",
        "Monaco": "mc",
        "Mongolia": "mn",
        "Montenegro": "me",
        "Morocco": "ma",
        "Mozambique": "mz",
        "Myanmar": "mm",
        "Namibia": "na",
        "Nauru": "nr",
        "Nepal": "np",
        "Nicaragua": "ni",
        "Niger": "ne",
        "Nigeria": "ng",
        "North Macedonia": "mk",
        "Oman": "om",
        "Palau": "pw",
        "Panama": "pa",
        "Papua New Guinea": "pg",
        "Paraguay": "py",
        "Peru": "pe",
        "Romania": "ro",
        "Rwanda": "rw",
        "Samoa": "ws",
        "San Marino": "sm",
        "Senegal": "sn",
        "Serbia": "rs",
        "Seychelles": "sc",
        "Sierra Leone": "sl",
        "Singapore": "sg",
        "Slovakia": "sk",
        "Slovenia": "si",
        "Solomon Islands": "sb",
        "Somalia": "so",
        "South Sudan": "ss",
        "St. Kitts and Nevis": "kn",
        "St. Lucia": "lc",
        "St. Vincent and the Grenadines": "vc",
        "Sudan": "sd",
        "Suriname": "sr",
        "Syrian Arab Republic": "sy",
        "Tajikistan": "tj",
        "Tanzania": "tz",
        "Togo": "tg",
        "Tonga": "to",
        "Trinidad and Tobago": "tt",
        "Tunisia": "tn",
        "Turkmenistan": "tm",
        "Tuvalu": "tv",
        "Uganda": "ug",
        "Ukraine": "ua",
        "Uruguay": "uy",
        "Uzbekistan": "uz",
        "Vanuatu": "vu",
        "Venezuela, RB": "ve",
        "Yemen, Rep.": "ye",
        "Hong Kong SAR, China": "hk",
        "Jamaica": "jm"
    };

    //국가 페이지 연동
    const countryPages = {
        "Afghanistan": "Afghanistan",
        "Albania": "Albania",
        "Algeria": "Algeria",
        "Andorra": "Andorra",
        "Angola": "Angola",
        "Antigua and Barbuda": "Antigua_and_Barbuda",
        "Argentina": "Argentina",
        "Armenia": "Armenia",
        "Australia": "Australia",
        "Austria": "Austria",
        "Azerbaijan": "Azerbaijan",
        "Bahamas": "Bahamas",
        "Bahrain": "Bahrain",
        "Bangladesh": "Bangladesh",
        "Barbados": "Barbados",
        "Belarus": "Belarus",
        "Belgium": "Belgium",
        "Belize": "Belize",
        "Benin": "Benin",
        "Bhutan": "Bhutan",
        "Bolivia": "Bolivia",
        "Bosnia and Herzegovina": "Bosnia_and_Herzegovina",
        "Botswana": "Botswana",
        "Brazil": "Brazil",
        "Brunei": "Brunei",
        "Bulgaria": "Bulgaria",
        "Burkina Faso": "Burkina_Faso",
        "Burundi": "Burundi",
        "Cambodia": "Cambodia",
        "Cameroon": "Cameroon",
        "Canada": "Canada",
        "Central African Republic": "Central_African_Republic",
        "Chad": "Chad",
        "Chile": "Chile",
        "China": "China",
        "Colombia": "Colombia",
        "Comoros": "Comoros",
        "Congo, Dem. Rep.": "Congo_Dem_Rep",
        "Republic of the Congo": "Republic_of_the_Congo",
        "Costa Rica": "Costa_Rica",
        "Croatia": "Croatia",
        "Cuba": "Cuba",
        "Cyprus": "Cyprus",
        "Czech Republic": "Czech_Republic",
        "Denmark": "Denmark",
        "Djibouti": "Djibouti",
        "Dominica": "Dominica",
        "Dominican Republic": "Dominican_Republic",
        "Ecuador": "Ecuador",
        "Egypt": "Egypt",
        "El Salvador": "El_Salvador",
        "Equatorial Guinea": "Equatorial_Guinea",
        "Eritrea": "Eritrea",
        "Estonia": "Estonia",
        "Ethiopia": "Ethiopia",
        "Fiji": "Fiji",
        "Finland": "Finland",
        "France": "France",
        "Gabon": "Gabon",
        "Gambia": "Gambia",
        "Georgia": "Georgia",
        "Germany": "Germany",
        "Ghana": "Ghana",
        "Greece": "Greece",
        "Guatemala": "Guatemala",
        "Guinea": "Guinea",
        "Guinea-Bissau": "Guinea-Bissau",
        "Guyana": "Guyana",
        "Haiti": "Haiti",
        "Honduras": "Honduras",
        "Hungary": "Hungary",
        "Iceland": "Iceland",
        "India": "India",
        "Indonesia": "Indonesia",
        "Iran, Islamic Rep.": "Iran_Islamic_Rep",
        "Iraq": "Iraq",
        "Ireland": "Ireland",
        "Israel": "Israel",
        "Italy": "Italy",
        "Japan": "Japan",
        "Jordan": "Jordan",
        "Kazakhstan": "Kazakhstan",
        "Kenya": "Kenya",
        "South Korea": "South_Korea",
        "Kuwait": "Kuwait",
        "Latvia": "Latvia",
        "Lebanon": "Lebanon",
        "Lithuania": "Lithuania",
        "Luxembourg": "Luxembourg",
        "Madagascar": "Madagascar",
        "Malaysia": "Malaysia",
        "Mexico": "Mexico",
        "Netherlands": "Netherlands",
        "New Zealand": "New_Zealand",
        "Norway": "Norway",
        "Pakistan": "Pakistan",
        "Philippines": "Philippines",
        "Poland": "Poland",
        "Portugal": "Portugal",
        "Qatar": "Qatar",
        "Russian Federation": "Russian_Federation",
        "Saudi Arabia": "Saudi_Arabia",
        "South Africa": "South_Africa",
        "Spain": "Spain",
        "Sri Lanka": "Sri_Lanka",
        "Sweden": "Sweden",
        "Switzerland": "Switzerland",
        "Thailand": "Thailand",
        "Turkey": "Turkey",
        "United Arab Emirates": "United_Arab_Emirates",
        "United Kingdom": "United_Kingdom",
        "United States": "United_States",
        "Vietnam": "Vietnam",
        "Zambia": "Zambia",
        "Zimbabwe": "Zimbabwe",
        "Côte d'Ivoire": "Côte_d'Ivoire",
        "East Timor": "East_Timor",
        "Kiribati": "Kiribati",
        "Kyrgyzstan": "Kyrgyzstan",
        "Laos": "Laos",
        "Lesotho": "Lesotho",
        "Liberia": "Liberia",
        "Libya": "Libya",
        "Liechtenstein": "Liechtenstein",
        "Macao SAR, China": "Macao_SAR_China",
        "Malawi": "Malawi",
        "Maldives": "Maldives",
        "Mali": "Mali",
        "Malta": "Malta",
        "Marshall Islands": "Marshall_Islands",
        "Mauritania": "Mauritania",
        "Mauritius": "Mauritius",
        "Micronesia": "Micronesia",
        "Moldova": "Moldova",
        "Monaco": "Monaco",
        "Mongolia": "Mongolia",
        "Montenegro": "Montenegro",
        "Morocco": "Morocco",
        "Mozambique": "Mozambique",
        "Myanmar": "Myanmar",
        "Namibia": "Namibia",
        "Nauru": "Nauru",
        "Nepal": "Nepal",
        "Nicaragua": "Nicaragua",
        "Niger": "Niger",
        "Nigeria": "Nigeria",
        "North Macedonia": "North_Macedonia",
        "Oman": "Oman",
        "Palau": "Palau",
        "Panama": "Panama",
        "Papua New Guinea": "Papua_New_Guinea",
        "Paraguay": "Paraguay",
        "Peru": "Peru",
        "Romania": "Romania",
        "Rwanda": "Rwanda",
        "Samoa": "Samoa",
        "San Marino": "San_Marino",
        "Senegal": "Senegal",
        "Serbia": "Serbia",
        "Seychelles": "Seychelles",
        "Sierra Leone": "Sierra_Leone",
        "Singapore": "Singapore",
        "Slovakia": "Slovakia",
        "Slovenia": "Slovenia",
        "Solomon Islands": "Solomon_Islands",
        "Somalia": "Somalia",
        "South Sudan": "South_Sudan",
        "St. Kitts and Nevis": "St_Kitts_and_Nevis",
        "St. Lucia": "St_Lucia",
        "St. Vincent and the Grenadines": "St_Vincent_and_the_Grenadines",
        "Sudan": "Sudan",
        "Suriname": "Suriname",
        "Syrian Arab Republic": "Syrian_Arab_Republic",
        "Tajikistan": "Tajikistan",
        "Tanzania": "Tanzania",
        "Togo": "Togo",
        "Tonga": "Tonga",
        "Trinidad and Tobago": "Trinidad_and_Tobago",
        "Tunisia": "Tunisia",
        "Turkmenistan": "Turkmenistan",
        "Tuvalu": "Tuvalu",
        "Uganda": "Uganda",
        "Ukraine": "Ukraine",
        "Uruguay": "Uruguay",
        "Uzbekistan": "Uzbekistan",
        "Vanuatu": "Vanuatu",
        "Venezuela, RB": "Venezuela_RB",
        "Yemen, Rep.": "Yemen_Rep",
        "Hong Kong SAR, China": "Hong_Kong_SAR_China",
        "Jamaica": "Jamaica"
    };
    
    const countryList = Object.keys(countryCoordinates);
    
    // 검색창 입력 이벤트
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim().toLowerCase();
        searchResults.innerHTML = '';
        currentIndex = -1; // 키보드 탐색 인덱스 초기화

        if (!query) {
            searchResults.style.display = 'none';
            return;
        }

        const matches = countryList.filter(country =>
            country.toLowerCase().includes(query)
        );

        if (matches.length > 0) {
            searchResults.style.display = 'block';
            matches.forEach(match => {
                const listItem = document.createElement('li');
                listItem.style.display = 'flex';
                listItem.style.alignItems = 'center';
                listItem.style.padding = '8px';
                listItem.style.cursor = 'pointer';

                // 스크롤 국기 이미지 추가
                const flagCode = countryFlags[match];
                if (flagCode) {
                    const flagImg = document.createElement('img');
                    flagImg.src = `https://flagcdn.com/w40/${flagCode}.png`; // 문자열 템플릿 수정
                    flagImg.alt = match;
                    flagImg.style.width = '20px';
                    flagImg.style.height = '14px';
                    flagImg.style.marginRight = '8px';
                    listItem.appendChild(flagImg);
                }

                // 스크롤 국가 이름 추가
                const countryName = document.createElement('span');
                countryName.textContent = match;
                listItem.appendChild(countryName);

                listItem.addEventListener('click', () => {
                    handleSelection(match);
                });

                searchResults.appendChild(listItem);
            });
        } else {
            searchResults.style.display = 'none';
        }
    });

   // 선택된 국가 처리 함수
function handleSelection(selectedCountry) {
    searchInput.value = selectedCountry;
    searchResults.innerHTML = '';
    searchResults.style.display = 'none';

    const coordinates = countryCoordinates[selectedCountry];
    const flagCode = countryFlags[selectedCountry];
    if (coordinates && flagCode) {
        window.map.flyTo(coordinates, 5.5); // 지도 이동


        //팝업 추가
        const popupContent = `
        <div style="text-align: center; cursor: pointer;" onclick="navigateToAnalysis('${selectedCountry}')"> 
            <img src="https://flagcdn.com/w80/${flagCode}.png" 
                alt="${selectedCountry}"
                style="width: 50px; height: 30px; margin-bottom: 8px;" /> 
            <div style="font-size: 16px; font-weight: bold;">${selectedCountry}</div>
        </div>
    `;

        const popup = L.popup()
            .setLatLng(coordinates)
            .setContent(popupContent)
            .openOn(window.map);
    } else {
        alert('해당 국가 데이터를 찾을 수 없습니다.');
    }
}


    // 키보드 탐색 관련 변수
    // let currentIndex = -1;

    // 키보드 탐색 기능 추가
    searchInput.addEventListener('keydown', (e) => {
        const items = searchResults.querySelectorAll('li');

        if (e.key === 'ArrowDown') { // 아래 방향키
            if (currentIndex < items.length - 1) {
                currentIndex++;
            }
            updateSelection(items);
            e.preventDefault();
        } else if (e.key === 'ArrowUp') { // 위 방향키
            if (currentIndex > 0) {
                currentIndex--;
            }
            updateSelection(items);
            e.preventDefault();
        } else if (e.key === 'Enter') { // 엔터 키
            e.preventDefault();
            if (currentIndex >= 0 && currentIndex < items.length) {
                const selectedCountry = items[currentIndex].querySelector('span').textContent;
                handleSelection(selectedCountry);
            }
        }
    });

    // 선택 항목 업데이트 함수
    function updateSelection(items) {
        items.forEach((item, index) => {
            if (index === currentIndex) {
                item.style.backgroundColor = '#ddd'; // 선택된 항목 스타일
                item.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); // 스크롤 이동
            } else {
                item.style.backgroundColor = ''; // 기본 스타일
            }
        });
    }

    // 검색 버튼 클릭 이벤트 처리
    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (!query) {
            alert('검색어를 입력하세요.');
            return;
        }

        const normalizedQuery = query.toLowerCase();
        const foundKey = countryList.find(
            country => country.toLowerCase() === normalizedQuery
        );

        if (foundKey) {
            handleSelection(foundKey);
        } else {
            alert('해당 국가를 찾을 수 없습니다.');
        }
    });

    // 검색창이 포커스를 잃으면 결과 숨기기
    searchInput.addEventListener('blur', () => {
        setTimeout(() => {
            searchResults.style.display = 'none';
        }, 200);
    });
});


// 팝업 클릭 시 나라 데이터 저장
document.querySelectorAll('.popup').forEach(popup => {
    popup.addEventListener('click', function () {
        const countryName = this.getAttribute('data-country'); // 팝업의 국가명
        localStorage.setItem('selectedCountry', countryName); // localStorage에 저장
        window.location.href = '/WEB/web-layout/html/data/analysis_1.html'; // 분석 페이지로 이동
    });
});
