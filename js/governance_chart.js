// import { fetchJsonData, initializeCountryDropdown, filterDataByCountry } from './common.js';

// const jsonFiles = {
//     governance: '/WEB/web-layout/data/governance_data.json',
// };

// document.addEventListener('DOMContentLoaded', async () => {
//     const countrySelectorId = 'countrySelector';
//     const chartContainer = document.getElementById('chartContainer');
//     const lineChartCanvas = document.getElementById('lineChart')?.getContext('2d');
//     let lineChart;

//     // Initialize Line Chart
//     function initializeLineChart() {
//         lineChart = new Chart(lineChartCanvas, {
//             type: 'line',
//             data: {},
//             options: {
//                 responsive: true,
//                 plugins: {

//                     title: {
//                         display: true, // 타이틀 표시 여부
//                         text: 'Governance Indicators', // 타이틀 텍스트
//                         font: {
//                             size: 15, // 폰트 크기
//                             weight: 'normal'
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
//                     x: {
//                         title: {
//                             display: true,
//                             text: '',
//                         },
//                     },
//                     y: {
//                         title: {
//                             display: true,
//                             text: 'Standard Deviation (stddev)',
//                         },
//                     },
//                 },
//             },
//         });
//     }

//     // Update Line Chart Data
//     function updateLineChart(filteredData) {
//         if (!filteredData.governance || filteredData.governance.length === 0) return;

//         const selectedCountryData = filteredData.governance;
//         const years = [...new Set(selectedCountryData.map((data) => data.year))].sort((a, b) => a - b);
//         const indicators = ['cc', 'ge', 'pv', 'rl', 'rq', 'va'];

//         const datasets = indicators.map((indicator, index) => {
//             const dataPoints = years.map((year) => {
//                 const data = selectedCountryData.find(
//                     (item) => item.year === year && item.indicator === indicator
//                 );
//                 return data ? data.stddev : null;
//             });

//             return {
//                 label: indicator.toUpperCase(),
//                 data: dataPoints,
//                 borderColor: `hsl(${index * 60}, 70%, 50%)`, // Different color for each line
//                 backgroundColor: `hsl(${index * 60}, 70%, 50%, 0.3)`,
//                 borderWidth: 2,
//                 tension: 0.2, // 부드러운 곡선
//                 fill: false,
//             };
//         });

//         lineChart.data = {
//             labels: years,
//             datasets: datasets,
//         };

//         lineChart.update();
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
//             chartContainer.style.display = 'block';
//             updateLineChart(filteredData);
//         } else {
//             chartContainer.style.display = 'none';
//         }
//     });

//     initializeLineChart();
// });

import { fetchJsonData, initializeCountryDropdown, filterDataByCountry } from './common.js';

const jsonFiles = {
    governance: '/WEB/web-layout/data/governance_data.json',
};

let lineChart = null; // 전역 변수로 차트를 초기화 상태로 설정

document.addEventListener('DOMContentLoaded', async () => {
    const countrySelectorId = 'countrySelector';
    const chartContainer = document.getElementById('chartContainer');
    const lineChartCanvas = document.getElementById('lineChart')?.getContext('2d');

    // 1. Line Chart Canvas 확인
    if (!lineChartCanvas) {
        console.error('Line chart canvas element not found.');
        return; // Canvas가 없는 경우 초기화 중단
    }

    // 2. Line Chart 초기화 함수
    function initializeLineChart() {
        lineChart = new Chart(lineChartCanvas, {
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
                        text: 'Governance Indicators',
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
                    x: {
                        title: {
                            display: true,
                            text: 'Years',
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Standard Deviation (stddev)',
                        },
                    },
                },
            },
        });
    }

    // 3. Line Chart 업데이트 함수
    function updateLineChart(filteredData) {
        if (!lineChart) {
            console.error('Line chart is not initialized.');
            return; // 차트가 초기화되지 않은 경우 처리 중단
        }

        if (!filteredData.governance || filteredData.governance.length === 0) {
            chartContainer.style.display = 'none';
            return; // 데이터가 없는 경우 차트를 숨김
        }

        const selectedCountryData = filteredData.governance;
        const years = [...new Set(selectedCountryData.map((data) => data.year))].sort((a, b) => a - b);
        const indicators = ['cc', 'ge', 'pv', 'rl', 'rq', 'va'];

        const datasets = indicators.map((indicator, index) => {
            const dataPoints = years.map((year) => {
                const data = selectedCountryData.find(
                    (item) => item.year === year && item.indicator === indicator
                );
                return data ? data.stddev : null;
            });

            return {
                label: indicator.toUpperCase(),
                data: dataPoints,
                borderColor: `hsl(${index * 60}, 70%, 50%)`,
                borderWidth: 2,
                tension: 0.2,
                fill: false,
            };
        });

        lineChart.data = {
            labels: years,
            datasets: datasets,
        };

        lineChart.update();
        chartContainer.style.display = 'block';
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
            initializeLineChart(); // 차트 초기화
            updateLineChart(filteredData); // URL로 받은 국가 데이터로 차트 갱신
            document.getElementById(countrySelectorId).value = countryFromUrl; // 드롭다운 값 설정
        }
    } else {
        initializeLineChart(); // URL에 국가 정보가 없는 경우에도 차트를 초기화
    }

    // 8. 드롭다운 변경 이벤트 처리
    const countrySelector = document.getElementById(countrySelectorId);
    countrySelector.addEventListener('change', () => {
        const selectedCountry = countrySelector.value;
        history.pushState({}, '', `?country=${selectedCountry}`);
        const filteredData = filterDataByCountry(jsonDataCache, selectedCountry);
        updateLineChart(filteredData);
    });
});

