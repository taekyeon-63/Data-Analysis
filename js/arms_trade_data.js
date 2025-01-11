// import { fetchJsonData, initializeCountryDropdown, filterDataByCountry } from './common.js';

// const jsonFiles = {
//     armsExports: '/WEB/web-layout/data/arms_exports_data.json',
//     armsImports: '/WEB/web-layout/data/arms_import_data.json',
// };

// document.addEventListener('DOMContentLoaded', async () => {
//     const armsCountrySelectorId = 'countrySelector'; // 동일한 국가 선택 드롭다운 사용
//     const armsTradeContainer = document.getElementById('armsTradeContainer');
//     const armsTradeCanvas = document.getElementById('armsTradeChart')?.getContext('2d');
//     let armsTradeChart;

//     // Initialize Arms Trade Chart
//     function initializeArmsTradeChart() {
//         if (armsTradeChart) {
//             armsTradeChart.destroy(); // 기존 차트를 삭제
//         }
//         armsTradeChart = new Chart(armsTradeCanvas, {
//             type: 'line',
//             data: {},
//             options: {
//                 responsive: true,
//                 plugins: {
//                     title: {
//                         display: true,
//                         text: 'Arms Exports and Imports',
//                         font: {
//                             size: 15,
//                             weight: 'normal',
//                         },
//                     },
//                     tooltip: {
//                         callbacks: {
//                             label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.raw}`,
//                         },
//                     },
//                 },
//                 scales: {
//                     x: {
//                         title: {
//                             display: true,
//                             text: '',
//                         },
//                     },
//                     y: {
//                         title: {
//                             display: true,
//                             text: 'Arms imports and exports (SIPRI trend indicator values)',
//                         },
//                     },
//                 },
//             },
//         });
//     }

//     // Update Arms Trade Chart Data
//     function updateArmsTradeChart(filteredData) {
//         const selectedExports = filteredData.armsExports?.[0] || {};
//         const selectedImports = filteredData.armsImports?.[0] || {};
    
//         // Export와 Import 데이터가 모두 없는 경우 처리
//         if (Object.keys(selectedExports).length === 0 && Object.keys(selectedImports).length === 0) {
//             console.error('No arms trade data available for the selected country.');
//             armsTradeContainer.style.display = 'none';
//             return;
//         }
    
//         // 공통된 연도를 추출하거나 수출/수입 데이터의 모든 연도를 사용
//         const years = [
//             ...new Set([
//                 ...Object.keys(selectedExports).filter((key) => !isNaN(key)),
//                 ...Object.keys(selectedImports).filter((key) => !isNaN(key)),
//             ]),
//         ].sort();
    
//         // 수출 및 수입 데이터를 추출하며 값이 없는 경우 기본 값 0 설정
//         const exportData = years.map((year) => selectedExports[year] || 0);
//         const importData = years.map((year) => selectedImports[year] || 0);
    
//         // 차트 업데이트
//         armsTradeChart.data = {
//             labels: years,
//             datasets: [
//                 {
//                     label: 'Arms Exports',
//                     data: exportData,
//                     borderColor: 'rgb(75, 192, 192)',
//                     backgroundColor: 'rgba(75, 192, 192, 0.5)',
//                     borderWidth: 2,
//                     tension: 0.2, // 부드러운 곡선
//                 },
//                 {
//                     label: 'Arms Imports',
//                     data: importData,
//                     borderColor: 'rgb(255, 99, 132)',
//                     backgroundColor: 'rgba(255, 99, 132, 0.5)',
//                     borderWidth: 2,
//                     tension: 0.2, // 부드러운 곡선
//                 },
//             ],
//         };
    
//         armsTradeChart.update();
//         armsTradeContainer.style.display = 'block';
//     }
    
    

//     // Fetch and Initialize Data
//     const jsonDataCache = await fetchJsonData(jsonFiles);

//     // Event Listener for Country Selection
//     const armsCountrySelector = document.getElementById(armsCountrySelectorId);
//     armsCountrySelector.addEventListener('change', () => {
//         const selectedCountry = armsCountrySelector.value;
//         const filteredData = filterDataByCountry(jsonDataCache, selectedCountry);

//         updateArmsTradeChart(filteredData);
//     });

//     initializeArmsTradeChart();
// });

import { fetchJsonData, initializeCountryDropdown, filterDataByCountry } from './common.js';

const jsonFiles = {
    armsExports: '/WEB/web-layout/data/arms_exports_data.json',
    armsImports: '/WEB/web-layout/data/arms_import_data.json',
};

let armsTradeChart = null; // 전역 변수로 초기화

document.addEventListener('DOMContentLoaded', async () => {
    const armsCountrySelectorId = 'countrySelector'; // 동일한 국가 선택 드롭다운 사용
    const armsTradeContainer = document.getElementById('armsTradeContainer');
    const armsTradeCanvas = document.getElementById('armsTradeChart')?.getContext('2d');

    // 1. Arms Trade Chart Canvas 확인
    if (!armsTradeCanvas) {
        console.error('Arms trade chart canvas element not found.');
        return; // Canvas가 없는 경우 초기화 중단
    }

    // 2. Arms Trade Chart 초기화 함수
    function initializeArmsTradeChart() {
        armsTradeChart = new Chart(armsTradeCanvas, {
            type: 'line',
            data: {
                labels: [],
                datasets: [],
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Arms Exports and Imports',
                        font: {
                            size: 15,
                            weight: 'normal',
                        },
                    },
                    tooltip: {
                        callbacks: {
                            label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.raw}`,
                        },
                    },
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Years',
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Arms imports and exports (SIPRI trend indicator values)',
                        },
                    },
                },
            },
        });
    }

    // 3. Arms Trade Chart 업데이트 함수
    function updateArmsTradeChart(filteredData) {
        if (!armsTradeChart) {
            console.error('Arms trade chart is not initialized.');
            return; // 차트가 초기화되지 않은 경우 처리 중단
        }

        const selectedExports = filteredData.armsExports?.[0] || {};
        const selectedImports = filteredData.armsImports?.[0] || {};

        // 수출/수입 데이터가 모두 없는 경우 처리
        if (Object.keys(selectedExports).length === 0 && Object.keys(selectedImports).length === 0) {
            console.error('No arms trade data available for the selected country.');
            armsTradeContainer.style.display = 'none';
            return;
        }

        // 공통된 연도 추출
        const years = [
            ...new Set([
                ...Object.keys(selectedExports).filter((key) => !isNaN(key)),
                ...Object.keys(selectedImports).filter((key) => !isNaN(key)),
            ]),
        ].sort();

        // 수출 및 수입 데이터 추출
        const exportData = years.map((year) => selectedExports[year] || 0);
        const importData = years.map((year) => selectedImports[year] || 0);

        // 차트 업데이트
        armsTradeChart.data = {
            labels: years,
            datasets: [
                {
                    label: 'Arms Exports',
                    data: exportData,
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    borderWidth: 2,
                    tension: 0.2, // 부드러운 곡선
                },
                {
                    label: 'Arms Imports',
                    data: importData,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderWidth: 2,
                    tension: 0.2, // 부드러운 곡선
                },
            ],
        };

        armsTradeChart.update();
        armsTradeContainer.style.display = 'block';
    }

    // 4. 데이터 로드
    const jsonDataCache = await fetchJsonData(jsonFiles);

    // 5. URL 파라미터에서 국가 읽기
    const params = new URLSearchParams(window.location.search);
    const countryFromUrl = params.get('country');

    // 6. 드롭다운 초기화
    initializeCountryDropdown(jsonDataCache, armsCountrySelectorId);

    // 7. URL 기반 데이터 처리
    if (countryFromUrl) {
        const filteredData = filterDataByCountry(jsonDataCache, countryFromUrl);
        if (filteredData.armsExports || filteredData.armsImports) {
            initializeArmsTradeChart(); // 차트 초기화
            updateArmsTradeChart(filteredData); // URL로 받은 국가 데이터로 차트 갱신
            document.getElementById(armsCountrySelectorId).value = countryFromUrl; // 드롭다운 값 설정
        }
    } else {
        initializeArmsTradeChart(); // URL에 국가 정보가 없는 경우에도 차트를 초기화
    }

    // 8. 드롭다운 변경 이벤트 처리
    const armsCountrySelector = document.getElementById(armsCountrySelectorId);
    armsCountrySelector.addEventListener('change', () => {
        const selectedCountry = armsCountrySelector.value;
        history.pushState({}, '', `?country=${selectedCountry}`);
        const filteredData = filterDataByCountry(jsonDataCache, selectedCountry);
        updateArmsTradeChart(filteredData);
    });
});
