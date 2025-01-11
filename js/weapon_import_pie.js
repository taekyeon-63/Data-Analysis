// import { fetchJsonData, initializeCountryDropdown, filterDataByCountry } from './common.js';

// const jsonFiles = {
//     weaponImportData: '/WEB/web-layout/data/weapon_import.json',
// };

// let importPieChart = null; // 전역 변수로 초기화

// document.addEventListener('DOMContentLoaded', async () => {
//     const importPieChartCanvas = document.getElementById('weaponImportPieChart')?.getContext('2d');

//     // 1. Pie Chart Canvas 확인
//     if (!importPieChartCanvas) {
//         console.error('Import pie chart canvas element not found.');
//         return; // Canvas가 없는 경우 초기화 중단
//     }

//     // 2. Pie Chart 초기화 함수
//     function initializeImportPieChart(categories, values, descriptions) {
//         if (importPieChart) {
//             importPieChart.destroy(); // 기존 차트 삭제
//         }

//         const pastelColors = [
//             '#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF',
//             '#D5AAFF', '#FFABAB', '#FFC3A0', '#FFDAC1', '#D5F4E6',
//             '#C0C0FF', '#FAFAD2', '#D8BFD8', '#FFD700', '#B0E0E6',
//             '#ADD8E6', '#90EE90', '#FF7F50', '#FF6347', '#6A5ACD'
//         ];

//         importPieChart = new Chart(importPieChartCanvas, {
//             type: 'pie',
//             data: {
//                 labels: categories,
//                 datasets: [
//                     {
//                         label: 'Weapon Imports Distribution',
//                         data: values,
//                         backgroundColor: categories.map((_, index) =>
//                             pastelColors[index % pastelColors.length]
//                         ),
//                         hoverOffset: 10,
//                     },
//                 ],
//             },
//             options: {
//                 responsive: true,
//                 plugins: {
//                     tooltip: {
//                         callbacks: {
//                             label: (tooltipItem) => {
//                                 const category = tooltipItem.label;
//                                 const descriptionList = descriptions[category] || [];
//                                 return [`${category}: Weapon Imports Distribution`, ...descriptionList];
//                             },
//                         },
//                     },
//                     title: {
//                         display: true,
//                         text: 'Weapon Imports Distribution',
//                         font: {
//                             size: 15,
//                             weight: 'normal',
//                         },
//                     },
//                 },
//             },
//         });
//     }

//     // 3. Pie Chart 업데이트 함수
//     function updateImportPieChart(filteredData) {
//         if (!filteredData.weaponImportData || filteredData.weaponImportData.length === 0) {
//             console.error('No import data available for the selected country.');
//             document.getElementById('weaponImportPieChartContainer').style.display = 'none';
//             return;
//         }

//         const categoryMap = {};
//         filteredData.weaponImportData.forEach((row) => {
//             const categories = row['USML Category'].split(',').map((cat) => cat.trim());
//             const value = Math.log(row['Number ordered'] || 1); // 로그 변환
//             categories.forEach((category) => {
//                 if (!categoryMap[category]) {
//                     categoryMap[category] = {
//                         value: 0,
//                         descriptions: new Set(),
//                     };
//                 }
//                 categoryMap[category].value += value;
//                 categoryMap[category].descriptions.add(row['Weapon description']);
//             });
//         });

//         const categories = Object.keys(categoryMap);
//         const values = categories.map((cat) => categoryMap[cat].value);
//         const descriptions = {};
//         categories.forEach((cat) => {
//             descriptions[cat] = Array.from(categoryMap[cat].descriptions);
//         });

//         initializeImportPieChart(categories, values, descriptions);
//         document.getElementById('weaponImportPieChartContainer').style.display = 'block';
//     }

//     // 4. 데이터 로드
//     const jsonDataCache = await fetchJsonData(jsonFiles);

//     // 5. URL 파라미터에서 국가 읽기
//     const params = new URLSearchParams(window.location.search);
//     const countryFromUrl = params.get('country');

//     // 6. 드롭다운 초기화
//     initializeCountryDropdown('countrySelector');

//     // 7. URL 기반 데이터 처리
//     if (countryFromUrl) {
//         const filteredData = filterDataByCountry(jsonDataCache, countryFromUrl);
//         if (filteredData.weaponImportData) {
//             updateImportPieChart(filteredData);
//             document.getElementById('countrySelector').value = countryFromUrl;
//         }
//     }

//     // 8. 드롭다운 변경 이벤트 처리
//     const countrySelector = document.getElementById('countrySelector');
//     countrySelector.addEventListener('change', () => {
//         const selectedCountry = countrySelector.value;
//         history.pushState({}, '', `?country=${selectedCountry}`);
//         const filteredData = filterDataByCountry(jsonDataCache, selectedCountry);
//         updateImportPieChart(filteredData);
//     });
// });

import { fetchJsonData, initializeCountryDropdown, filterDataByCountry } from './common.js';
import './hoverSync.js'; // 차트 동기화 플러그인 추가

const jsonFiles = {
    weaponImportData: '/WEB/web-layout/data/weapon_import.json',
};

const numberToColorMap = {
    1: '#FFB3BA', 2: '#FFDFBA', 3: '#FFFFBA', 4: '#BAFFC9', 5: '#BAE1FF',
    6: '#D5AAFF', 7: '#FFABAB', 8: '#FFC3A0', 9: '#FFDAC1', 10: '#D5F4E6',
    11: '#C0C0FF', 12: '#FAFAD2', 13: '#D8BFD8', 14: '#FFD700', 15: '#B0E0E6',
    16: '#ADD8E6', 17: '#90EE90', 18: '#FF7F50', 19: '#FF6347', 20: '#6A5ACD',
    21: '#8A2BE2', 22: '#4682B4'
};

let importPieChart = null;

document.addEventListener('DOMContentLoaded', async () => {
    const importPieChartCanvas = document.getElementById('weaponImportPieChart')?.getContext('2d');

    // 1. 차트 초기화 함수
    function initializeImportPieChart(categories, values, descriptions) {
        if (importPieChart) {
            importPieChart.destroy(); // 기존 차트 삭제
        }

        importPieChart = new Chart(importPieChartCanvas, {
            type: 'pie',
            data: {
                labels: categories,
                datasets: [
                    {
                        label: 'Weapon Imports Distribution',
                        data: values,
                        backgroundColor: categories.map((cat) => numberToColorMap[+cat] || '#CCCCCC'),
                        hoverOffset: 10,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    hoverSync: true, // 동기화 플러그인 활성화
                    tooltip: {
                        callbacks: {
                            label: (tooltipItem) => {
                                const category = tooltipItem.label;
                                const descriptionList = descriptions[category] || [];
                                return [`Category: ${category}`, ...descriptionList];
                            },
                        },
                    },
                    title: {
                        display: true,
                        text: 'Weapon Imports Distribution',
                        font: {
                            size: 15,
                            weight: 'normal',
                        },
                    },
                },
            },
        });
    }

    // 2. 차트 업데이트 함수
    function updateImportPieChart(filteredData) {
        if (!filteredData.weaponImportData || filteredData.weaponImportData.length === 0) {
            console.error('No import data available for the selected country.');
            document.getElementById('weaponImportPieChartContainer').style.display = 'none';
            return;
        }

        const categoryMap = {};
        filteredData.weaponImportData.forEach((row) => {
            const categories = row['USML Category'].split(',').map((cat) => cat.trim());
            const value = Math.log(row['Number ordered'] || 1); // 로그 변환
            categories.forEach((category) => {
                if (!categoryMap[category]) {
                    categoryMap[category] = {
                        value: 0,
                        descriptions: new Set(),
                    };
                }
                categoryMap[category].value += value;
                categoryMap[category].descriptions.add(row['Weapon description']);
            });
        });

        const categories = Object.keys(categoryMap);
        const values = categories.map((cat) => categoryMap[cat].value);
        const descriptions = {};
        categories.forEach((cat) => {
            descriptions[cat] = Array.from(categoryMap[cat].descriptions);
        });

        initializeImportPieChart(categories, values, descriptions);
        document.getElementById('weaponImportPieChartContainer').style.display = 'block';
    }

    const jsonDataCache = await fetchJsonData(jsonFiles);

    // URL에서 국가 읽기
    const params = new URLSearchParams(window.location.search);
    const countryFromUrl = params.get('country');

    // 드롭다운 초기화
    initializeCountryDropdown('countrySelector');

    if (countryFromUrl) {
        const filteredData = filterDataByCountry(jsonDataCache, countryFromUrl);
        updateImportPieChart(filteredData);
        document.getElementById('countrySelector').value = countryFromUrl;
    }

    // 드롭다운 변경 이벤트
    const countrySelector = document.getElementById('countrySelector');
    countrySelector.addEventListener('change', () => {
        const selectedCountry = countrySelector.value;
        history.pushState({}, '', `?country=${selectedCountry}`);
        const filteredData = filterDataByCountry(jsonDataCache, selectedCountry);
        updateImportPieChart(filteredData);
    });
});
