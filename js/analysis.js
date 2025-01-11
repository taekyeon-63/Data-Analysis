document.addEventListener('DOMContentLoaded', () => {
    
    // JSON 파일 경로 정의
    const jsonFiles = {
        economy: '/WEB/web-layout/data/Economy_data.json',
        politics: '/WEB/web-layout/data/governance_data.json',
        ucdp: '/WEB/web-layout/data/UCDP_data.json',
        military: '/WEB/web-layout/data/military_expenses_data.json',
        armsExports: '/WEB/web-layout/data/arms_exports_data.json',
        armsImports: '/WEB/web-layout/data/arms_import_data.json',
        weaponSystems: '/WEB/web-layout/data/weapon_system_Data.json',
        weaponImports: '/WEB/web-layout/data/weapon_import.json',
    };

    // JSON 파일 순서 정의 (테이블 표시 순서)
    const orderedKeys = [
        'economy',
        'politics',
        'ucdp',
        'military',
        'armsExports',
        'armsImports',
        'weaponSystems',
        'weaponImports',
    ];

    // 테이블 제목 매핑
    const tableNameMapping = {
        economy: '경제 데이터',
        politics: '정치 데이터',
        ucdp: '분쟁 데이터',
        military: '군사비 지출 데이터',
        armsExports: '무기 수출 데이터',
        armsImports: '무기 수입 데이터',
        weaponSystems: '무기 체계 데이터',
        weaponImports: '무기수입 항목 데이터',
    };

    // HTML 요소 가져오기
    const tablesContainer = document.getElementById('tablesContainer');
    const tableSelector = document.getElementById('tableSelector');

    // 국가 리스트 (CSV에서 가져온 국가들)
    const countries = [
        "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
        "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain",
        "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
        "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
        "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Central African Republic",
        "Chad", "Chile", "China", "Colombia", "Comoros", "Congo, Dem. Rep.",
        "Republic of the Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
        "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt",
        "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Swaziland", "Ethiopia",
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

    // 국가 선택 이벤트
    // const countrySelector = document.getElementById('countrySelector');
    // if (countrySelector) {
    //     countrySelector.addEventListener('change', (event) => {
    //         const selectedCountry = event.target.value;
    //         displayCountryData(selectedCountry, jsonFiles);
    //     });
    // } else {
    //     console.error('ID "countrySelector" 요소를 찾을 수 없습니다.');
    // }

    // 국가 드롭다운에 알파벳 순서로 추가
    countries.sort().forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        // option.textContent = country;
        countrySelector.appendChild(option);
    });

    // JSON 데이터를 가져오고 국가 필터링
    function fetchAndFilterJsonData(jsonFiles, selectedCountry) {
        return Promise.all(
            orderedKeys.map((key) =>
                fetch(jsonFiles[key])
                    .then((res) => res.json())
                    .then((data) => data.filter((row) => row.Country?.toLowerCase() === selectedCountry.toLowerCase()))
            )
        );
    }

    // // 선택된 국가 데이터 표시
    // function displayCountryData(selectedCountry) {
    //     if (!tablesContainer) {
    //         console.error('ID "tablesContainer" 요소를 찾을 수 없습니다.');
    //         return;
    //     }
    //     tablesContainer.innerHTML = ''; // 기존 테이블 초기화

    //     fetchAndFilterJsonData(jsonFiles, selectedCountry)
    //         .then((allFilteredData) => {
    //             allFilteredData.forEach((filteredData, index) => {
    //                 if (filteredData.length > 0) {
    //                     createTable(orderedKeys[index], filteredData, tableNameMapping[orderedKeys[index]]);
    //                 }
    //             });
    //         })
    //         .catch((error) => console.error('Error displaying country data:', error));
    // }

    // // 테이블 생성
    // function createTable(title, data, displayName) {
    //     const existingTable = document.querySelector(`.card[data-title="${title}"]`);
    //     if (existingTable) {
    //         existingTable.remove();
    //     }

    //     const tableWrapper = document.createElement('div');
    //     tableWrapper.classList.add('card', 'mb-4');
    //     tableWrapper.setAttribute('data-title', title);

    //     const tableHeader = document.createElement('div');
    //     tableHeader.classList.add('card-header');
    //     tableHeader.textContent = displayName;

    //     const tableContainer = document.createElement('div');
    //     tableContainer.style.overflowX = 'auto';
    //     tableContainer.style.maxHeight = '400px';

    //     const table = document.createElement('table');
    //     table.classList.add('table', 'table-bordered', 'table-sm');

    //     const headers = Object.keys(data[0]);
    //     const thead = document.createElement('thead');
    //     const headerRow = document.createElement('tr');
    //     headers.forEach(header => {
    //         const th = document.createElement('th');
    //         th.textContent = header;
    //         headerRow.appendChild(th);
    //     });
    //     thead.appendChild(headerRow);
    //     table.appendChild(thead);

    //     const tbody = document.createElement('tbody');
    //     data.forEach(row => {
    //         const dataRow = document.createElement('tr');
    //         headers.forEach(header => {
    //             const td = document.createElement('td');
    //             td.textContent = row[header] || '-';
    //             dataRow.appendChild(td);
    //         });
    //         tbody.appendChild(dataRow);
    //     });
    //     table.appendChild(tbody);

    //     tableContainer.appendChild(table);
    //     tableWrapper.appendChild(tableHeader);
    //     tableWrapper.appendChild(tableContainer);
    //     tablesContainer.appendChild(tableWrapper);
    // }

    // 사이드바 토글 기능
    const sidebarToggle = document.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', (event) => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }
});
