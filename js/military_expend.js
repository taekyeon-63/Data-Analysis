// import { fetchJsonData, initializeCountryDropdown, filterDataByCountry } from './common.js';

// const jsonFiles = {
//     military: '/WEB/web-layout/data/military_expenses_data.json',
// };

// document.addEventListener('DOMContentLoaded', async () => {
//     const militaryCountrySelectorId = 'countrySelector'; // Use the same dropdown
//     const militaryChartContainer = document.getElementById('militaryChartContainer');
//     const militaryChartCanvas = document.getElementById('militaryChart')?.getContext('2d');
//     let militaryChart;

//     // Initialize Military Chart
//     function initializeMilitaryChart() {
//         if (militaryChart) {
//             militaryChart.destroy(); // Destroy the previous chart if it exists
//         }
//         militaryChart = new Chart(militaryChartCanvas, {
//             type: 'line',
//             data: {},
//             options: {
//                 responsive: true,
//                 plugins: {
//                     title: {
//                         display: true,
//                         text: 'Military Expenditure (% of GDP)',
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
//                             text: 'Expenditure (% of GDP)',
//                         },
//                     },
//                 },
//             },
//         });
//     }

//     // Update Military Chart Data
//     function updateMilitaryChart(filteredData) {
//         if (!filteredData.military || filteredData.military.length === 0) {
//             console.error('No military data available for the selected country.');
//             militaryChartContainer.style.display = 'none';
//             return;
//         }

//         const selectedCountryData = filteredData.military[0];
//         const years = Object.keys(selectedCountryData).filter((key) => !isNaN(key)).sort();
//         const dataPoints = years.map((year) => selectedCountryData[year] || 0);

//         militaryChart.data = {
//             labels: years,
//             datasets: [
//                 {
//                     label: 'Military Expenditure',
//                     data: dataPoints,
//                     borderColor: 'rgb(54, 162, 235)',
//                     backgroundColor: 'rgba(54, 162, 235, 0.3)', // 아래 영역 색칠
//                     borderWidth: 2,
//                     tension: 0.2, // 부드러운 곡선
//                     fill: true, // 아래 영역 채우기
//                 },
//             ],
//         };

//         militaryChart.update();
//         militaryChartContainer.style.display = 'block';
//     }

//     // Fetch and Initialize Data
//     const jsonDataCache = await fetchJsonData(jsonFiles);

//     // Event Listener for Country Selection
//     const militaryCountrySelector = document.getElementById(militaryCountrySelectorId);
//     militaryCountrySelector.addEventListener('change', () => {
//         const selectedCountry = militaryCountrySelector.value;
//         const filteredData = filterDataByCountry(jsonDataCache, selectedCountry);

//         updateMilitaryChart(filteredData);
//     });

//     initializeMilitaryChart();
// });

import { fetchJsonData, initializeCountryDropdown, filterDataByCountry } from './common.js';

const jsonFiles = {
    military: '/WEB/web-layout/data/military_expenses_data.json',
};

let militaryChart = null; // 전역 변수로 초기화

document.addEventListener('DOMContentLoaded', async () => {
    const militaryCountrySelectorId = 'countrySelector'; // 드롭다운 ID
    const militaryChartContainer = document.getElementById('militaryChartContainer');
    const militaryChartCanvas = document.getElementById('militaryChart')?.getContext('2d');

    // 1. Military Chart Canvas 확인
    if (!militaryChartCanvas) {
        console.error('Military chart canvas element not found.');
        return; // Canvas가 없는 경우 초기화 중단
    }

    // 2. Military Chart 초기화 함수
    function initializeMilitaryChart() {
        militaryChart = new Chart(militaryChartCanvas, {
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
                        text: 'Military Expenditure (% of GDP)',
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
                            text: 'Expenditure (% of GDP)',
                        },
                    },
                },
            },
        });
    }

    // 3. Military Chart 업데이트 함수
    function updateMilitaryChart(filteredData) {
        if (!militaryChart) {
            console.error('Military chart is not initialized.');
            return; // 차트가 초기화되지 않은 경우 처리 중단
        }

        if (!filteredData.military || filteredData.military.length === 0) {
            console.error('No military data available for the selected country.');
            militaryChartContainer.style.display = 'none';
            return; // 데이터가 없는 경우 차트를 숨김
        }

        const selectedCountryData = filteredData.military[0];
        const years = Object.keys(selectedCountryData).filter((key) => !isNaN(key)).sort();
        const dataPoints = years.map((year) => selectedCountryData[year] || 0);

        militaryChart.data = {
            labels: years,
            datasets: [
                {
                    label: 'Military Expenditure',
                    data: dataPoints,
                    borderColor: 'rgb(54, 162, 235)',
                    backgroundColor: 'rgba(54, 162, 235, 0.3)', // 아래 영역 색칠
                    borderWidth: 2,
                    tension: 0.2, // 부드러운 곡선
                    fill: true, // 아래 영역 채우기
                },
            ],
        };

        militaryChart.update();
        militaryChartContainer.style.display = 'block';
    }

    // 4. 데이터 로드
    const jsonDataCache = await fetchJsonData(jsonFiles);

    // 5. URL 파라미터에서 국가 읽기
    const params = new URLSearchParams(window.location.search);
    const countryFromUrl = params.get('country');

    // 6. 드롭다운 초기화
    initializeCountryDropdown(jsonDataCache, militaryCountrySelectorId);

    // 7. URL 기반 데이터 처리
    if (countryFromUrl) {
        const filteredData = filterDataByCountry(jsonDataCache, countryFromUrl);
        if (filteredData.military && filteredData.military.length > 0) {
            initializeMilitaryChart(); // 차트 초기화
            updateMilitaryChart(filteredData); // URL로 받은 국가 데이터로 차트 갱신
            document.getElementById(militaryCountrySelectorId).value = countryFromUrl; // 드롭다운 값 설정
        }
    } else {
        initializeMilitaryChart(); // URL에 국가 정보가 없는 경우에도 차트를 초기화
    }

    // 8. 드롭다운 변경 이벤트 처리
    const militaryCountrySelector = document.getElementById(militaryCountrySelectorId);
    militaryCountrySelector.addEventListener('change', () => {
        const selectedCountry = militaryCountrySelector.value;
        history.pushState({}, '', `?country=${selectedCountry}`);
        const filteredData = filterDataByCountry(jsonDataCache, selectedCountry);
        updateMilitaryChart(filteredData);
    });
});
