// document.addEventListener('DOMContentLoaded', () => {
//     const jsonFiles = {
//         economy: '/WEB/web-layout/data/Economy_data.json',
//         politics: '/WEB/web-layout/data/governance_data.json',
//         ucdp: '/WEB/web-layout/data/UCDP_data.json',
//         military: '/WEB/web-layout/data/military_expenses_data.json',
//         armsExports: '/WEB/web-layout/data/arms_exports_data.json',
//         armsImports: '/WEB/web-layout/data/arms_import_data.json',
//         weaponSystems: '/WEB/web-layout/data/weapon_system_Data.json',
//         weaponImports: '/WEB/web-layout/data/weapon_import.json',
//     };

//     const chartTableMapping = {
//         economy: 'economyDataTableContainer',
//         politics: 'governanceDataTableContainer',
//         radar: 'governanceRadarDataTableContainer',
//         armsImports: 'armsTradeDataTableContainer',
//         armsExports: 'armsTradeDataTableContainer',
//         military: 'militaryDataTableContainer',
//         weaponSystems: 'weaponSystemDataTableContainer',
//         weaponImports: 'weaponImportDataTableContainer',
//     };

//     const tableNameMapping = {
//         economy: '경제 데이터',
//         politics: '정치 데이터',
//         ucdp: '분쟁 데이터',
//         military: '군사비 지출 데이터',
//         armsExports: '무기 수출 데이터',
//         armsImports: '무기 수입 데이터',
//         weaponSystems: '무기 체계 데이터',
//         weaponImports: '무기수입 항목 데이터',
//     };

//     const countrySelector = document.getElementById('countrySelector');

//     // 초기화: 모든 테이블 컨테이너 숨기기
//     Object.values(chartTableMapping).forEach((containerId) => {
//         const container = document.getElementById(containerId);
//         if (container) container.style.display = 'none';
//     });

//     // JSON 데이터를 가져오고 국가별로 필터링
//     function fetchAndFilterJsonData(selectedCountry) {
//         if (!selectedCountry) {
//             console.error('Invalid country selected:', selectedCountry);
//             return Promise.reject('Invalid country selected');
//         }

//         return Promise.all(
//             Object.keys(jsonFiles).map((key) =>
//                 fetch(jsonFiles[key])
//                     .then((res) => res.json())
//                     .then((data) =>
//                         data.filter(
//                             (row) =>
//                                 row.Country &&
//                                 row.Country.toLowerCase() === selectedCountry.toLowerCase()
//                         )
//                     )
//             )
//         );
//     }

//     // 선택된 국가 데이터 표시
//     function displayCountryData(selectedCountry) {
//         if (!selectedCountry) {
//             console.error('No country selected.');
//             return;
//         }

//         Object.keys(chartTableMapping).forEach((key) => {
//             const container = document.getElementById(chartTableMapping[key]);
//             if (container) {
//                 container.style.display = 'none'; // 초기 상태를 명시적으로 설정
//                 const tableContainer = container.querySelector('.table-container');
//                 if (tableContainer) tableContainer.innerHTML = ''; // 기존 테이블 초기화
//             }
//         });

//         fetchAndFilterJsonData(selectedCountry)
//             .then((allFilteredData) => {
//                 allFilteredData.forEach((filteredData, index) => {
//                     const key = Object.keys(jsonFiles)[index];
//                     if (key === 'armsExports' || key === 'armsImports') {
//                         createArmsTradeTables(key, filteredData); // 무기 수출/수입 테이블 처리
//                     } else if (filteredData.length > 0) {
//                         createTable(key, filteredData, tableNameMapping[key]);
//                     }
//                 });
//             })
//             .catch((error) =>
//                 console.error('Error displaying country data:', error)
//             );
//     }

//     // 테이블 생성 함수 수정
//     function createTable(key, data, displayName) {
//         const container = document.getElementById(chartTableMapping[key]);
//         if (!container) return;

//         container.style.display = 'block';

//         // 기존 table 요소 가져오기
//         const table = container.querySelector('table');
//         if (!table) {
//             console.error(`Table not found in container: ${chartTableMapping[key]}`);
//             return;
//         }

//         // 테이블 초기화
//         table.innerHTML = '';

//         // 데이터 정렬: Country 컬럼을 첫 번째로 이동
//         const headers = Object.keys(data[0]);
//         const reorderedHeaders = ['Country', ...headers.filter((header) => header !== 'Country')];

//         // 테이블 헤더 생성
//         const thead = document.createElement('thead');
//         const headerRow = document.createElement('tr');
//         reorderedHeaders.forEach((header) => {
//             const th = document.createElement('th');
//             th.textContent = header;
//             th.style.whiteSpace = 'nowrap'; // 줄바꿈 방지
//             headerRow.appendChild(th);
//         });
//         thead.appendChild(headerRow);
//         table.appendChild(thead);

//         // 테이블 본문 생성
//         const tbody = document.createElement('tbody');
//         data.forEach((row, rowIndex) => {
//             const dataRow = document.createElement('tr');
//             reorderedHeaders.forEach((header) => {
//                 const td = document.createElement('td');
//                 td.textContent = row[header] || '-';
//                 dataRow.appendChild(td);
//             });

//             // 스타일링: 행 음영
//             dataRow.style.backgroundColor = rowIndex % 2 === 0 ? '#f9f9f9' : '#ffffff'; // 홀수/짝수 행 색상
//             dataRow.addEventListener('mouseover', () => {
//                 dataRow.style.backgroundColor = '#e9ecef'; // 마우스 호버 시
//             });
//             dataRow.addEventListener('mouseout', () => {
//                 dataRow.style.backgroundColor = rowIndex % 2 === 0 ? '#f9f9f9' : '#ffffff'; // 마우스 아웃 시 원래 색상
//             });

//             tbody.appendChild(dataRow);
//         });
//         table.appendChild(tbody);
//     }

//     function createArmsTradeTables(key, data) {
//         const containerId =
//             key === 'armsExports'
//                 ? 'armsExportsDataTableContainer'
//                 : 'armsImportsDataTableContainer';
//         const container = document.getElementById(containerId);
//         if (!container) return;
    
//         container.style.display = 'block';
    
//         // 제목 텍스트가 있는 <p> 태그 가져오기
//         const title = container.querySelector('p');
//         if (title) title.style.display = 'block';
    
//         const table = document.createElement('table');
//         table.classList.add('table', 'table-bordered', 'table-sm', 'custom-table');
    
//         const headers = Object.keys(data[0]);
    
//         // 테이블 헤더 생성
//         const thead = document.createElement('thead');
//         const headerRow = document.createElement('tr');
//         headers.forEach((header) => {
//             const th = document.createElement('th');
//             th.textContent = header;
//             headerRow.appendChild(th);
//         });
//         thead.appendChild(headerRow);
//         table.appendChild(thead);
    
//         // 테이블 본문 생성
//         const tbody = document.createElement('tbody');
//         data.forEach((row, rowIndex) => {
//             const dataRow = document.createElement('tr');
//             headers.forEach((header) => {
//                 const td = document.createElement('td');
//                 td.textContent = row[header] || '-';
//                 dataRow.appendChild(td);
//             });
//             tbody.appendChild(dataRow);
//         });
//         table.appendChild(tbody);
    
//         container.innerHTML = ''; // 기존 내용을 초기화
//         container.appendChild(title); // 제목 다시 추가
//         container.appendChild(table); // 테이블 추가
//     }
    
    

//     // 국가 선택 이벤트
//     if (countrySelector) {
//         countrySelector.addEventListener('change', (event) => {
//             const selectedCountry = event.target.value;
//             displayCountryData(selectedCountry);
//         });
//     }

//     // 국가 선택 초기화 (예: JSON에서 국가 목록 가져오기)
//     function initializeCountrySelector() {
//         fetch(jsonFiles.economy)
//             .then((res) => res.json())
//             .then((data) => {
//                 const countries = [...new Set(data.map((row) => row.Country))].sort();
//                 countries.forEach((country) => {
//                     const option = document.createElement('option');
//                     option.value = country;
//                     option.textContent = country;
//                     countrySelector.appendChild(option);
//                 });
//             })
//             .catch((error) => console.error('Error initializing country selector:', error));
//     }

//     initializeCountrySelector();
// });

document.addEventListener('DOMContentLoaded', () => {
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

    const chartTableMapping = {
        economy: 'economyDataTableContainer',
        politics: 'governanceDataTableContainer',
        radar: 'governanceRadarDataTableContainer',
        armsImports: 'armsTradeDataTableContainer',
        armsExports: 'armsTradeDataTableContainer',
        military: 'militaryDataTableContainer',
        weaponSystems: 'weaponSystemDataTableContainer',
        weaponImports: 'weaponImportDataTableContainer',
    };

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

    const countrySelector = document.getElementById('countrySelector');

    // 초기화: 모든 테이블 컨테이너 숨기기
    Object.values(chartTableMapping).forEach((containerId) => {
        const container = document.getElementById(containerId);
        if (container) container.style.display = 'none';
    });

    // JSON 데이터를 가져오고 국가별로 필터링
    function fetchAndFilterJsonData(selectedCountry) {
        if (!selectedCountry) {
            console.error('Invalid country selected:', selectedCountry);
            return Promise.reject('Invalid country selected');
        }

        return Promise.all(
            Object.keys(jsonFiles).map((key) =>
                fetch(jsonFiles[key])
                    .then((res) => res.json())
                    .then((data) =>
                        data.filter(
                            (row) =>
                                row.Country &&
                                row.Country.toLowerCase() === selectedCountry.toLowerCase()
                        )
                    )
            )
        );
    }

    // 선택된 국가 데이터 표시
    function displayCountryData(selectedCountry) {
        if (!selectedCountry) {
            console.error('No country selected.');
            return;
        }

        Object.keys(chartTableMapping).forEach((key) => {
            const container = document.getElementById(chartTableMapping[key]);
            if (container) {
                container.style.display = 'none'; // 초기 상태를 명시적으로 설정
                const tableContainer = container.querySelector('.table-container');
                if (tableContainer) tableContainer.innerHTML = ''; // 기존 테이블 초기화
            }
        });

        fetchAndFilterJsonData(selectedCountry)
            .then((allFilteredData) => {
                allFilteredData.forEach((filteredData, index) => {
                    const key = Object.keys(jsonFiles)[index];
                    if (key === 'armsExports' || key === 'armsImports') {
                        createArmsTradeTables(key, filteredData); // 무기 수출/수입 테이블 처리
                    } else if (filteredData.length > 0) {
                        createTable(key, filteredData, tableNameMapping[key]);
                    }
                });
            })
            .catch((error) =>
                console.error('Error displaying country data:', error)
            );
    }

    // URL 파라미터 처리
    function handleUrlParameters() {
        const params = new URLSearchParams(window.location.search);
        const countryFromUrl = params.get('country');

        if (countryFromUrl) {
            displayCountryData(countryFromUrl);
            if (countrySelector) {
                countrySelector.value = countryFromUrl;
            }
        }
    }

    // 드롭다운 변경 이벤트 처리
    if (countrySelector) {
        countrySelector.addEventListener('change', (event) => {
            const selectedCountry = event.target.value;
            history.pushState({}, '', `?country=${selectedCountry}`);
            displayCountryData(selectedCountry);
        });
    }

    // 국가 선택 초기화 (예: JSON에서 국가 목록 가져오기)
    function initializeCountrySelector() {
        fetch(jsonFiles.economy)
            .then((res) => res.json())
            .then((data) => {
                const countries = [...new Set(data.map((row) => row.Country))].sort();
                countries.forEach((country) => {
                    const option = document.createElement('option');
                    option.value = country;
                    option.textContent = country;
                    countrySelector.appendChild(option);
                });

                // URL 파라미터 처리
                handleUrlParameters();
            })
            .catch((error) => console.error('Error initializing country selector:', error));
    }

    initializeCountrySelector();

    // 테이블 생성 함수
    function createTable(key, data, displayName) {
        const container = document.getElementById(chartTableMapping[key]);
        if (!container) return;

        container.style.display = 'block';

        const table = container.querySelector('table');
        if (!table) {
            console.error(`Table not found in container: ${chartTableMapping[key]}`);
            return;
        }

        table.innerHTML = '';

        const headers = Object.keys(data[0]);
        const reorderedHeaders = ['Country', ...headers.filter((header) => header !== 'Country')];

        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        reorderedHeaders.forEach((header) => {
            const th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        data.forEach((row, rowIndex) => {
            const dataRow = document.createElement('tr');
            reorderedHeaders.forEach((header) => {
                const td = document.createElement('td');
                td.textContent = row[header] || '-';
                dataRow.appendChild(td);
            });

            tbody.appendChild(dataRow);
        });
        table.appendChild(tbody);
    }

    function createArmsTradeTables(key, data) {
        const containerId =
            key === 'armsExports'
                ? 'armsExportsDataTableContainer'
                : 'armsImportsDataTableContainer';
        const container = document.getElementById(containerId);
        if (!container) return;

        container.style.display = 'block';

        const title = container.querySelector('p');
        if (title) title.style.display = 'block';

        const table = document.createElement('table');
        table.classList.add('table', 'table-bordered', 'table-sm', 'custom-table');

        const headers = Object.keys(data[0]);

        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        headers.forEach((header) => {
            const th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        data.forEach((row) => {
            const dataRow = document.createElement('tr');
            headers.forEach((header) => {
                const td = document.createElement('td');
                td.textContent = row[header] || '-';
                dataRow.appendChild(td);
            });
            tbody.appendChild(dataRow);
        });
        table.appendChild(tbody);

        container.innerHTML = '';
        container.appendChild(title);
        container.appendChild(table);
    }
});
