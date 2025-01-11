// import { fetchJsonData, initializeCountryDropdown, filterDataByCountry } from './common.js';

// const jsonFiles = {
//     governance: '/WEB/web-layout/data/governance_data.json',
// };

// document.addEventListener('DOMContentLoaded', async () => {
//     const countrySelectorId = 'countrySelector';
//     const radarChartContainer = document.getElementById('radarChartContainer');
//     const radarChartCanvas = document.getElementById('radarChart')?.getContext('2d');
//     let radarChart;

//     // Initialize Radar Chart
//     function initializeRadarChart() {
//         radarChart = new Chart(radarChartCanvas, {
//             type: 'radar',
//             data: {},
//             options: {
//                 responsive: true,
//                 plugins: {
//                     title: {
//                         display: true,
//                         text: 'Governance Indicators (Radar Chart)',
//                         font: {
//                             size: 15,
//                             weight: 'normal',
//                         },
//                     },
//                     tooltip: {
//                         callbacks: {
//                             label: function (tooltipItem) {
//                                 return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
//                             },
//                         },
//                     },
//                 },
//                 scales: {
//                     r: {
//                         angleLines: {
//                             display: true,
//                         },
//                         suggestedMin: 0,
//                         suggestedMax: 1,
//                     },
//                 },
//                 elements: {
//                     line: {
//                         tension: 0.1, // 부드러운 곡선 설정 (0.4는 곡선의 정도를 조정)
//                     },
//                 },
//             },
//         });
//     }

//     // Update Radar Chart Data
//     function updateRadarChart(filteredData) {
//         if (!filteredData.governance || filteredData.governance.length === 0) return;

//         const selectedCountryData = filteredData.governance.filter(
//             (data) => data.year === 2020
//         ); // 2020년도 데이터만 사용
//         const indicators = ['cc', 'ge', 'pv', 'rl', 'rq', 'va'];
//         const dataPoints = indicators.map((indicator) => {
//             const data = selectedCountryData.find((item) => item.indicator === indicator);
//             return data ? data.pctrank : 0;
//         });

//         radarChart.data = {
//             labels: indicators.map((indicator) => indicator.toUpperCase()),
//             datasets: [
//                 {
//                     label: '2020 Governance Data',
//                     data: dataPoints,
//                     borderColor: 'rgba(54, 162, 235, 1)',
//                     backgroundColor: 'rgba(54, 162, 235, 0.2)',
//                     borderWidth: 2,
//                 },
//             ],
//         };

//         radarChart.update();
//         radarChartContainer.style.display = 'block';
//     }

//     // Fetch and Initialize Data
//     const jsonDataCache = await fetchJsonData(jsonFiles);

//     // Initialize Country Dropdown
//     initializeCountryDropdown(jsonDataCache, countrySelectorId);

//     // Country Selection Event Listener
//     const countrySelector = document.getElementById(countrySelectorId);
//     countrySelector.addEventListener('change', () => {
//         const selectedCountry = countrySelector.value;
//         const filteredData = filterDataByCountry(jsonDataCache, selectedCountry);

//         if (filteredData.governance && filteredData.governance.length > 0) {
//             updateRadarChart(filteredData);
//         } else {
//             radarChartContainer.style.display = 'none';
//         }
//     });

//     initializeRadarChart();
// });


import { fetchJsonData, initializeCountryDropdown, filterDataByCountry } from './common.js';

const jsonFiles = {
    governance: '/WEB/web-layout/data/governance_data.json',
};

let radarChart = null; // 전역 변수로 초기화

document.addEventListener('DOMContentLoaded', async () => {
    const countrySelectorId = 'countrySelector';
    const radarChartContainer = document.getElementById('radarChartContainer');
    const radarChartCanvas = document.getElementById('radarChart')?.getContext('2d');

    // 1. Radar Chart Canvas 확인
    if (!radarChartCanvas) {
        console.error('Radar chart canvas element not found.');
        return; // Canvas가 없는 경우 초기화 중단
    }

    // 2. Radar Chart 초기화 함수
    function initializeRadarChart() {
        radarChart = new Chart(radarChartCanvas, {
            type: 'radar',
            data: {
                labels: [],
                datasets: [],
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Governance Indicators (Radar Chart)',
                        font: {
                            size: 15,
                            weight: 'normal',
                        },
                    },
                    tooltip: {
                        callbacks: {
                            label: function (tooltipItem) {
                                return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                            },
                        },
                    },
                },
                scales: {
                    r: {
                        angleLines: {
                            display: true,
                        },
                        suggestedMin: 0,
                        suggestedMax: 1,
                    },
                },
                elements: {
                    line: {
                        tension: 0.1, // 부드러운 곡선 설정
                    },
                },
            },
        });
    }

    // 3. Radar Chart 업데이트 함수
    function updateRadarChart(filteredData) {
        if (!radarChart) {
            console.error('Radar chart is not initialized.');
            return; // 차트가 초기화되지 않은 경우 처리 중단
        }

        if (!filteredData.governance || filteredData.governance.length === 0) {
            radarChartContainer.style.display = 'none';
            return; // 데이터가 없는 경우 차트를 숨김
        }

        const selectedCountryData = filteredData.governance.filter(
            (data) => data.year === 2020 // 2020년도 데이터만 사용
        );
        const indicators = ['cc', 'ge', 'pv', 'rl', 'rq', 'va'];
        const dataPoints = indicators.map((indicator) => {
            const data = selectedCountryData.find((item) => item.indicator === indicator);
            return data ? data.pctrank : 0;
        });

        radarChart.data = {
            labels: indicators.map((indicator) => indicator.toUpperCase()),
            datasets: [
                {
                    label: '2020 Governance Data',
                    data: dataPoints,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderWidth: 2,
                },
            ],
        };

        radarChart.update();
        radarChartContainer.style.display = 'block';
    }

    // 4. 데이터 로드
    const jsonDataCache = await fetchJsonData(jsonFiles);

    // 5. URL 파라미터에서 국가 읽기
    const params = new URLSearchParams(window.location.search);
    const countryFromUrl = params.get('country');

    // 6. 드롭다운 초기화
    initializeCountryDropdown(jsonDataCache, countrySelectorId);

    // 7. URL 기반 데이터 처리
    if (countryFromUrl) {
        const filteredData = filterDataByCountry(jsonDataCache, countryFromUrl);
        if (filteredData.governance && filteredData.governance.length > 0) {
            initializeRadarChart(); // 차트 초기화
            updateRadarChart(filteredData); // URL로 받은 국가 데이터로 차트 갱신
            document.getElementById(countrySelectorId).value = countryFromUrl; // 드롭다운 값 설정
        }
    } else {
        initializeRadarChart(); // URL에 국가 정보가 없는 경우에도 차트를 초기화
    }

    // 8. 드롭다운 변경 이벤트 처리
    const countrySelector = document.getElementById(countrySelectorId);
    countrySelector.addEventListener('change', () => {
        const selectedCountry = countrySelector.value;
        history.pushState({}, '', `?country=${selectedCountry}`);
        const filteredData = filterDataByCountry(jsonDataCache, selectedCountry);
        updateRadarChart(filteredData);
    });
});
