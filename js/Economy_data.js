// import { fetchJsonData, initializeCountryDropdown, filterDataByCountry} from './common.js';


// const jsonFiles = {
//     economy: '/WEB/web-layout/data/Economy_data.json',
// };

// let jsonDataCache = {};

// async function loadEconomyData() {
//     if (!jsonDataCache.economy) {
//         jsonDataCache = await fetchJsonData(jsonFiles);
//     }
// }

// function updateEconomyCharts(country) {
//     const filteredData = filterDataByCountry(jsonDataCache, country);

//     const chartsContainer = document.getElementById('chartsContainer');
//     if (filteredData.economy && filteredData.economy.length > 0) {
//         chartsContainer.style.display = 'block';
//         console.log(`Economy data for ${country}:`, filteredData.economy);
//         // 차트 업데이트 로직...
//     } else {
//         chartsContainer.style.display = 'none';
//     }
// }


// export async function updateCharts(selectedCountry) {
//     if (!jsonDataCache.economy) {
//         jsonDataCache = await fetchJsonData(jsonFiles);
//     }

//     const filteredData = filterDataByCountry(jsonDataCache, selectedCountry);

//     const chartsContainer = document.getElementById('chartsContainer');
//     if (filteredData.economy && filteredData.economy.length > 0) {
//         chartsContainer.style.display = 'block';
//         updateBarChart(filteredData);
//     } else {
//         chartsContainer.style.display = 'none';
//     }
// }

// function updateCharts(data) {
//     const container = document.getElementById('chartsContainer');
//     if (data && data.length > 0) {
//         container.style.display = 'block';
//         console.log('Economy data:', data);
//         // 차트 업데이트 로직 추가
//     } else {
//         container.style.display = 'none';
//     }
// }

// document.addEventListener('DOMContentLoaded', async () => {
//     const countrySelectorId = 'countrySelector';
//     const chartsContainer = document.getElementById('chartsContainer');
//     const barChartCanvas = document.getElementById('barChart')?.getContext('2d');
//     let barChart;
//     await loadEconomyData();

//     document.addEventListener('countryChange', (event) => {
//         const country = event.detail;
//         const filteredData = filterDataByCountry(jsonDataCache, country);
//         updateCharts(filteredData.economy);
//     });

//     // 차트 초기화
//     function initializeBarChart() {
//         barChart = new Chart(barChartCanvas, {
//             type: 'bar',
//             data: {},
//             options: {
//                 responsive: true,
//                 scales: {
//                     y: {
//                         type: 'logarithmic',
//                         title: {
//                             display: true,
//                             text: 'Logarithmic Scale',
//                         },
//                         grid: {
//                             drawTicks: true, // 눈금만 그리기
//                             drawBorder: true, // 축 테두리만 유지
//                             tickLength: 5, // 눈금 길이 설정
//                             color: (context) => {
//                                 // 특정 눈금 단계만 유지 (1, 10, 100 등 주요 단계)
//                                 const value = context.tick.value;
//                                 if (
//                                     value === 1 ||
//                                     value === 10 ||
//                                     value === 100 ||
//                                     value === 1000 ||
//                                     value === 10000 ||
//                                     value === 100000 ||
//                                     value === 1000000 ||
//                                     value === 10000000
//                                 ) {
//                                     return '#d2d2d2'; // 주요 눈금 색상
//                                 }
//                                 return 'rgba(0,0,0,0)'; // 보조 눈금 투명 처리
//                             },
//                         },
//                         ticks: {
//                             callback: function (value) {
//                                 // 주요 단계 눈금에만 숫자를 표시
//                                 if (
//                                     value === 1 ||
//                                     value === 10 ||
//                                     value === 100 ||
//                                     value === 1000 ||
//                                     value === 10000 ||
//                                     value === 100000 ||
//                                     value === 1000000
//                                 ) {
//                                     return value.toLocaleString(); // 숫자 포맷팅
//                                 }
//                                 return ''; // 나머지는 공백
//                             },
//                         },
//                     },
//                 },
//                 plugins: {
//                     tooltip: {
//                         callbacks: {
//                             label: function (tooltipItem) {
//                                 const rawData = tooltipItem.dataset.rawData[tooltipItem.dataIndex];
//                                 return `Value: ${rawData.value.toLocaleString()}, Rank: ${rawData.rank}`;
//                             },
//                         },
//                     },
//                     title: {
//                         display: true,
//                         text: 'Economy Indicators',
//                         font: {
//                             size: 15,
//                             weight: 'normal'
//                         },
                        
//                     },
//                 },
//             },
//         });
//     }
    

//     // 차트 데이터 업데이트
//     function updateBarChart(filteredData) {
//         if (!filteredData.economy || filteredData.economy.length === 0) return;
    
//         const selectedData = filteredData.economy[0]; // 첫 번째 데이터 선택
//         console.log('Selected Data:', selectedData); // 데이터 확인
    
//         const labels = [
//             'GDP Growth Weighted',
//             'GDP Military Weighted',
//             'Int. Cap Weighted',
//             'Income Weighted',
//             'Trade Weighted',
//             'Unemployment Weighted',
//             'CPI Weighted',
//             'Dollar Weighted',
//             'GDP Debt Weighted',
//             'Economic Indicator',
//         ];
    
//         const values = labels.map(label => ({
//             value: selectedData[label],
//             rank: selectedData.Rank || 'N/A', // Rank 필드 참조
//         }));
    
//         barChart.data = {
//             labels: labels,
//             datasets: [
//                 {
//                     label: 'Economic Indicators',
//                     data: values.map(item => item.value),
//                     rawData: values, // Rank를 포함한 데이터 전달
//                     backgroundColor: 'rgba(70, 70, 150, 0.5)',
//                     borderColor: 'rgba(70, 70, 150, 0.5)',
//                     borderWidth: 1,
//                 },
//             ],
//         };
    
//         barChart.update();
//     }
    
    

//     // JSON 데이터 로드 및 초기화
//     const jsonDataCache = await fetchJsonData(jsonFiles);

//     // 국가 선택 드롭다운 초기화
//     initializeCountryDropdown(jsonDataCache, countrySelectorId);

//     // 국가 선택 이벤트 처리
//     const countrySelector = document.getElementById(countrySelectorId);
//     countrySelector.addEventListener('change', () => {
//         const selectedCountry = countrySelector.value;
//         updateCharts(selectedCountry);
//         const filteredData = filterDataByCountry(jsonDataCache, selectedCountry);

//         if (filteredData.economy && filteredData.economy.length > 0) {
//             chartsContainer.style.display = 'block';
//             updateBarChart(filteredData);
//         } else {
//             chartsContainer.style.display = 'none';
//         }
//     });

//     // URL 초기화 처리
//     const params = new URLSearchParams(window.location.search);
//     const countryFromUrl = params.get('country');
//     if (countryFromUrl) {
//         updateCharts(countryFromUrl);
//     }

//     initializeBarChart();
// });

import { fetchJsonData, initializeCountryDropdown, filterDataByCountry } from './common.js';

const jsonFiles = {
    economy: '/WEB/web-layout/data/Economy_data.json',
};

let jsonDataCache = {};
let barChart;

async function loadEconomyData() {
    if (!jsonDataCache.economy) {
        jsonDataCache = await fetchJsonData(jsonFiles);
    }
}

function initializeBarChart() {
    const barChartCanvas = document.getElementById('barChart')?.getContext('2d');
    barChart = new Chart(barChartCanvas, {
        type: 'bar',
        data: {},
        options: {
            responsive: true,
            scales: {
                y: {
                    type: 'logarithmic',
                    title: {
                        display: true,
                        text: 'Logarithmic Scale',
                    },
                    grid: {
                        drawTicks: true,
                        drawBorder: true,
                        tickLength: 5,
                        color: (context) => {
                            const value = context.tick.value;
                            if (
                                value === 1 ||
                                value === 10 ||
                                value === 100 ||
                                value === 1000 ||
                                value === 10000 ||
                                value === 100000 ||
                                value === 1000000
                            ) {
                                return '#d2d2d2';
                            }
                            return 'rgba(0,0,0,0)';
                        },
                    },
                    ticks: {
                        callback: (value) => {
                            if (
                                value === 1 ||
                                value === 10 ||
                                value === 100 ||
                                value === 1000 ||
                                value === 10000 ||
                                value === 100000 ||
                                value === 1000000
                            ) {
                                return value.toLocaleString();
                            }
                            return '';
                        },
                    },
                },
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: (tooltipItem) => {
                            const rawData = tooltipItem.dataset.rawData[tooltipItem.dataIndex];
                            return `Value: ${rawData.value.toLocaleString()}, Rank: ${rawData.rank}`;
                        },
                    },
                },
                title: {
                    display: true,
                    text: 'Economy Indicators',
                    font: {
                        size: 15,
                        weight: 'normal',
                    },
                },
            },
        },
    });
}

function updateBarChart(filteredData) {
    if (!filteredData.economy || filteredData.economy.length === 0) return;

    const selectedData = filteredData.economy[0];
    const labels = [
        'GDP Growth Weighted',
        'GDP Military Weighted',
        'Int. Cap Weighted',
        'Income Weighted',
        'Trade Weighted',
        'Unemployment Weighted',
        'CPI Weighted',
        'Dollar Weighted',
        'GDP Debt Weighted',
        'Economic Indicator',
    ];

    const values = labels.map((label) => ({
        value: selectedData[label],
        rank: selectedData.Rank || 'N/A',
    }));

    barChart.data = {
        labels: labels,
        datasets: [
            {
                label: 'Economic Indicators',
                data: values.map((item) => item.value),
                rawData: values,
                backgroundColor: 'rgba(70, 70, 150, 0.5)',
                borderColor: 'rgba(70, 70, 150, 0.5)',
                borderWidth: 1,
            },
        ],
    };
    barChart.update();
}

async function updateCharts(country) {
    await loadEconomyData();
    const filteredData = filterDataByCountry(jsonDataCache, country);

    const chartsContainer = document.getElementById('chartsContainer');
    if (filteredData.economy && filteredData.economy.length > 0) {
        chartsContainer.style.display = 'block';
        updateBarChart(filteredData);
    } else {
        chartsContainer.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const countrySelectorId = 'countrySelector';
    await loadEconomyData();

    // Initialize drop-down
    initializeCountryDropdown(jsonDataCache, countrySelectorId);

    // Initialize bar chart
    initializeBarChart();

    // Listen to country change events
    document.addEventListener('countryChange', async (event) => {
        const country = event.detail;
        await updateCharts(country);
    });

    // URL handling
    const params = new URLSearchParams(window.location.search);
    const countryFromUrl = params.get('country');
    if (countryFromUrl) {
        const countrySelector = document.getElementById(countrySelectorId);
        countrySelector.value = countryFromUrl;
        await updateCharts(countryFromUrl);
    }

    // Drop-down change handling
    const countrySelector = document.getElementById(countrySelectorId);
    countrySelector.addEventListener('change', async () => {
        const selectedCountry = countrySelector.value;
        history.pushState({}, '', `?country=${selectedCountry}`);
        await updateCharts(selectedCountry);
    });
});
