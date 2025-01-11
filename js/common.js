// 공통 기능: JSON 데이터 로드
export async function fetchJsonData(jsonFiles) {
    const jsonDataCache = {};
    const promises = Object.entries(jsonFiles).map(([key, url]) =>
        fetch(url)
            .then(res => {
                if (!res.ok) throw new Error(`Failed to load ${url}`);
                return res.json();
            })
            .then(data => {
                jsonDataCache[key] = data;
            })
    );
    await Promise.all(promises);
    return jsonDataCache;
}

// 공통 기능: 국가 선택 드롭다운 초기화
export function initializeCountryDropdown(selectorId) {
    const countrySelector = document.getElementById(selectorId);
    const dropdown = document.getElementById(selectorId);
    if (!countrySelector) {
        // console.error(`Dropdown with id "${selectorId}" not found.`);
        return;
    }

    // 기존 드롭다운 초기화 (중복 방지)
    countrySelector.innerHTML = '<option value="" selected disabled>Select a country</option>';

    // 국가 리스트
    const countries = [
        "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
        "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain",
        "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
        "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
        "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Central African Republic",
        "Chad", "Chile", "China", "Colombia", "Comoros", "Congo, Dem. Rep.",
        "Republic of the Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
        "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt",
        "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia",
        "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana",
        "Greece", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras",
        "Hong Kong SAR, China", "Hungary", "Iceland", "India", "Indonesia",
        "Iran, Islamic Rep.", "Iraq", "Ireland", "Israel", "Italy", "Côte d'Ivoire",
        "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "South Korea",
        "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya",
        "Liechtenstein", "Lithuania", "Luxembourg", "Macao SAR, China", "Madagascar", "Malawi",
        "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania",
        "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro",
        "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands",
        "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman",
        "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines",
        "Poland", "Portugal", "Qatar", "Romania", "Russian Federation", "Rwanda", "Samoa",
        "San Marino", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone",
        "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa",
        "South Sudan", "Spain", "Sri Lanka", "St. Kitts and Nevis", "St. Lucia",
        "St. Vincent and the Grenadines", "Sudan", "Suriname", "Sweden", "Switzerland",
        "Syrian Arab Republic", "Tajikistan", "Tanzania", "Thailand", "East Timor", "Togo",
        "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
        "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
        "Vanuatu", "Venezuela, RB", "Vietnam", "Yemen, Rep.", "Zambia", "Zimbabwe"
    ];

    dropdown.innerHTML =
        `<option value="" disabled selected>Select a country</option>` +
        countries
            .sort()
            .map((country) => `<option value="${country}">${country}</option>`)
            .join('');

    // // 알파벳 순서로 정렬하여 드롭다운에 추가
    // countries.sort().forEach(country => {
    //     const option = document.createElement('option');
    //     option.value = country;
    //     option.textContent = country;
    //     countrySelector.appendChild(option);
    // });
}

// 공통 기능: 국가별 데이터 필터링
// export function filterDataByCountry(jsonDataCache, country) {
//     const filteredData = {};
//     Object.entries(jsonDataCache).forEach(([key, data]) => {
//         if (Array.isArray(data)) {
//             filteredData[key] = data.filter(item => item.Country?.trim().toLowerCase() === country.trim().toLowerCase());
//         } else {
//             filteredData[key] = [];
//         }
//     });
//     return filteredData;
// }

export function filterDataByCountry(data, country) {
    return Object.keys(data).reduce((acc, key) => {
        acc[key] = data[key].filter(
            (item) => item.Country && item.Country.toLowerCase() === country.toLowerCase()
        );
        return acc;
    }, {});
}

// URL 파라미터에서 국가 가져오기 및 이벤트 트리거
export function triggerEventFromUrl(selectorId, callback) {
    const params = new URLSearchParams(window.location.search);
    const country = params.get('country');

    if (country) {
        const countrySelector = document.getElementById(selectorId);
        if (countrySelector) {
            countrySelector.value = country; // 드롭다운 값 설정

            // 콜백 함수로 이벤트 트리거
            if (typeof callback === 'function') {
                callback(country);
            }
        }
    }
}

// 국가 URL 생성
export function createCountryPageUrl(countryName) {
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
    if (countryPages.hasOwnProperty(countryName)) {
        return `/WEB/web-layout/html/data/analysis_1.html?country=${encodeURIComponent(countryPages[countryName])}`;
    } else {
        throw new Error("해당 국가의 데이터 페이지를 찾을 수 없습니다.");
    }
}

// 팝업 콘텐츠 생성 함수
export function createPopupContent(countryName, flagCode) {
    return `
        <div style="text-align: center; cursor: pointer;" onclick="navigateToAnalysis('${countryName}')">
            <img src="https://flagcdn.com/w80/${flagCode}.png"
                alt="${countryName}" style="width: 50px; height: 30px; margin-bottom: 8px;" />
            <div style="font-size: 16px; font-weight: bold;">${countryName}</div>
        </div>
    `;
}

// 팝업 클릭 시 데이터 페이지 이동
export function handlePopupClick(countryName) {
    try {
        const countryPageUrl = createCountryPageUrl(countryName);
        window.location.href = countryPageUrl;
    } catch (error) {
        alert(error.message);
    }
}
// 드롭다운 선택 시 페이지 이동
export function setupCountryDropdownNavigation(selectorId) {
    const countrySelector = document.getElementById(selectorId);
    if (!countrySelector) return;
    countrySelector.addEventListener('change', (event) => {
        const selectedCountry = event.target.value;
        handlePopupClick(selectedCountry);
    });
}

// 국가 선택 시 차트를 업데이트하는 콜백 연결
export function setupCountryEventHandlers(selectorId, updateFunction) {
    const countrySelector = document.getElementById(selectorId);
    if (!countrySelector) return;

    // URL에서 국가 파라미터 가져오기
    const getCountryFromUrl = () => {
        const params = new URLSearchParams(window.location.search);
        return params.get('country');
    };

    // URL 업데이트 함수
    const updateUrlWithCountry = (country) => {
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set('country', country);
        window.history.pushState({}, '', currentUrl);
    };

    // 드롭다운 변경 이벤트 처리
    countrySelector.addEventListener('change', () => {
        const selectedCountry = countrySelector.value;
        if (selectedCountry) {
            updateUrlWithCountry(selectedCountry);
            updateFunction(selectedCountry);
        }
    });

    // 뒤로/앞으로 가기 버튼 처리
    window.addEventListener('popstate', () => {
        const countryFromUrl = getCountryFromUrl();
        if (countryFromUrl) {
            countrySelector.value = countryFromUrl;
            updateFunction(countryFromUrl);
        }
    });

    // URL 파라미터로 초기화
    const countryFromUrl = getCountryFromUrl();
    if (countryFromUrl) {
        countrySelector.value = countryFromUrl;
        updateFunction(countryFromUrl);
    }
}

