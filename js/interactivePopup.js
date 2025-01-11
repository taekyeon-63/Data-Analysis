document.addEventListener('DOMContentLoaded', async () => {
    // 팝업 컨테이너 생성
    const popupContainer = document.createElement('div');
    popupContainer.id = 'popup-container';
    popupContainer.className = 'popup-container';
    popupContainer.style.display = 'none'; // 초기에는 숨김
    document.body.appendChild(popupContainer);

    // 닫기 버튼 생성
    const closeButton = document.createElement('button');
    closeButton.className = 'close-btn';
    closeButton.innerHTML = '&times;';
    closeButton.addEventListener('click', () => {
        popupContainer.style.display = 'none'; // 팝업 숨기기
    });
    popupContainer.appendChild(closeButton);

    // CSS 추가
    const style = document.createElement('style');
    style.textContent = `
        .popup-container {
            position: absolute;
            background: white;
            border: 1px solid #ccc;
            border-radius: 8px;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
            padding: 10px;
            z-index: 1000;
            width: 400px;
            max-height: 500px;
            overflow-y: auto;
            pointer-events: auto;
            overflow-x: hidden;
        }
        .popup-container h3 {
            margin: 0;
            padding: 5px 0;
            font-size: 18px;
            font-weight: bold;
            text-align: center;
        }
        .popup-container .chart {
            height: 200px;
            margin-top: 10px;
        }
        .popup-container .close-btn {
            position: absolute;
            top: 5px;
            right: 5px;
            background: #ff0000;
            color: #fff;
            border: none;
            border-radius: 50%;
            width: 25px;
            height: 25px;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);

    // GeoJSON과 JSON 데이터 간의 매핑 키 설정
  // 국가 이름 매핑 테이블
  const countryMapping = {
    'Korea': 'South Korea',
    'Russia': 'Russian Federation',
    'Turkey': 'Turkiye',
    'Czech Rep.': 'Czech Republic',
    "Côte d'Ivoire": "Cote d'Ivoire",
    'Dem. Rep. Congo': 'Republic of the Congo',
    'Iran': 'Iran, Islamic Rep.',
    'Venezuela': 'Venezuela, RB',
    'Central African Rep.': 'Central African Republic',
    'Bosnia and Herz.': 'Bosnia and Herzegovina',
    'N. cyprus': 'Northern Cyprus',
    'Dominican Rep.': 'Dominican Republic',
    'Falkland is.': 'Falkland Islands',
    'Eq. Guinea': 'Equatorial Guinea',
    'Lao PDR': 'Laos',
    'Macedonia': 'North Macedonia',
    'Dem. Rep. Korea': 'North Korea',
    'W. sahara': 'Western Sahara',
    'S. sudan': 'South Sudan',
    'Solomon Is.': 'Solomon Islands',
    'Swaziland': 'Eswatini',
    'Syria': 'Syrian Arab Republic',
    'Yemen': 'Yemen, Rep.',
    'New caledonia': 'New Caledonia',
    'Antarctica': 'Antarctica',
    'Frsantarcticlands': 'French Southern Lands',
    'Ncyprus': 'Northern Cyprus',
    'Czechrep': 'Czechia',
    'Falklandis': 'Falkland Islands',
    'Greenland': 'Greenland',
    'Puertorico': 'Puerto Rico',
    'Wsahara': 'Western Sahara',
    'Somalia': 'Somalia',
    'Taiwan': 'TAIWAN',
    'Greenland' : 'Greenland'
};



fetch('https://raw.githubusercontent.com/datasets/geo-boundaries-world-110m/master/countries.geojson')
    .then(response => response.json())
    .then(data => {
        data.features.forEach(feature => {
            const geoCountry = feature.properties.ADMIN || feature.properties.name || 'Unknown';
            const mappedCountry = getMappedCountryName(geoCountry);
            console.log(`GeoJSON country: ${geoCountry}, Mapped: ${mappedCountry}`);
        });
    })
    .catch(error => console.error('Error loading GeoJSON:', error));

 // 디버깅용 함수 (GeoJSON과 JSON 매핑되지 않는 국가 출력)
 async function debugUnmatchedCountries(jsonData, geoJsonData) {
    const unmatched = [];

    geoJsonData.features.forEach(feature => {
        const geoCountry = feature.properties.ADMIN || feature.properties.name || 'Unknown';
        const mappedCountry = getMappedCountryName(geoCountry);
        const existsInJson = Object.values(jsonData).some(data =>
            data.some(item => item.Country === mappedCountry)
        );

        if (!existsInJson) {
            unmatched.push(geoCountry);
        }
    });

    console.log('Unmatched countries:', unmatched);
}


// 함수 실행
(async () => {
    const jsonData = await loadJsonData();
    const geoJsonData = await fetch('https://raw.githubusercontent.com/datasets/geo-boundaries-world-110m/master/countries.geojson').then(res => res.json());

    debugUnmatchedCountries(jsonData, geoJsonData);
})();


// 함수 실행
(async () => {
    const jsonData = await loadJsonData();
    const geoJsonData = await fetch('https://raw.githubusercontent.com/datasets/geo-boundaries-world-110m/master/countries.geojson').then(res => res.json());

    debugUnmatchedCountries(jsonData, geoJsonData);
})();

function  getMappedCountryName(inputCountry, countryMapping) {
    // 입력 국가 이름을 표준화
    const standardizedInput = inputCountry
        .trim()
        .toLowerCase()
        .replace(/[\s'.,-]/g, '')
        .normalize('NFD') // Unicode 정규화 (예: á -> a)
        .replace(/[\u0300-\u036f]/g, ''); // 악센트 제거

    // 국가 매핑 테이블에서 가장 유사한 키 찾기
    const matchedKey = Object.keys(countryMapping).find(key => {
        const standardizedKey = key
            .trim()
            .toLowerCase()
            .replace(/[\s'.,-]/g, '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');

        // 포함하거나 포함되어 있는지 확인
        return standardizedKey.includes(standardizedInput) || standardizedInput.includes(standardizedKey);
    });

    // 매칭 결과 출력
    if (matchedKey) {
        console.log(`Input "${inputCountry}" matched with "${matchedKey}" -> Mapped to "${countryMapping[matchedKey]}"`);
        return countryMapping[matchedKey];
    } else {
        console.warn(`No match found for "${inputCountry}"`);
        return null;
    }
}

    // JSON 데이터 로드 함수
    async function loadJsonData() {
        const jsonFiles = {
            economy: '/WEB/web-layout/data/Economy_data.json',
            politics: '/WEB/web-layout/data/governance_data.json',
            military: '/WEB/web-layout/data/military_expenses_data.json',
            armsExports: '/WEB/web-layout/data/arms_exports_data.json',
            armsImports: '/WEB/web-layout/data/arms_import_data.json',
            weaponSystems: '/WEB/web-layout/data/weapon_system_Data.json',
            weaponImports: '/WEB/web-layout/data/weapon_import.json',
            };

        const jsonData = {};

        for (const key in jsonFiles) {
            try {
                const response = await fetch(jsonFiles[key]);
                if (response.ok) {
                    jsonData[key] = await response.json();
                } else {
                    console.error(`Failed to load ${key}: ${response.statusText}`);
                }
            } catch (error) {
                console.error(`Error loading ${key}: ${error}`);
            }
        }

        return jsonData;
    }


// 차트 생성 함수
// 차트 생성 함수
async function createChart(container, countryName, data, title, yAxisLabel, chartType) {
    const mappedName = countryMapping[countryName] || countryName;
    const countryData = data?.filter(item => item.Country === mappedName);

    if (!countryData || countryData.length === 0) {
        const noDataMessage = document.createElement('p');
        noDataMessage.textContent = `${title} 데이터가 없습니다.`;
        container.appendChild(noDataMessage);
        return;
    }

    let labels = [], datasets = [], backgroundColors = [];

  // Major Economic Indicators
if (title === 'Major Economic Indicators') {
    const indicators = [
        'GDP Growth Weighted', 'GDP Military Weighted', 'Int. Cap Weighted',
        'Income Weighted', 'Trade Weighted', 'Unemployment Weighted',
        'CPI Weighted', 'Dollar Weighted', 'GDP Debt Weighted'
    ];
    labels = indicators;

    // 로그 변환된 값과 원본 값을 저장
    const logTransformedData = indicators.map(indicator => {
        const value = countryData[0][indicator] || 0;
        return {
            original: value,
            log: value > 0 ? Math.log10(value) : 0 // 로그10 변환
        };
    });

    // 데이터셋 설정
    datasets = [{
        label: `${title}`,
        data: logTransformedData.map(item => item.log),
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
    }];

    // 툴팁과 차트 옵션 설정 (글씨 크기 추가)
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const index = context.dataIndex;
                        const originalValue = logTransformedData[index].original;
                        const logValue = logTransformedData[index].log.toFixed(2);
                        return `${labels[index]}: Log(${logValue}) | Original: ${originalValue.toLocaleString()}`;
                    }
                }
            },
            title: {
                display: true,
                text: `${title} (Log Transformed with Original Values)`,
                font: {
                    size: 14 // 제목 글씨 크기
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Log Scale (Base 10)',
                    font: {
                        size: 12 // Y축 제목 글씨 크기
                    }
                },
                ticks: {
                    font: {
                        size: 10 // Y축 눈금 글씨 크기
                    }
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Indicators',
                    font: {
                        size: 8 // X축 제목 글씨 크기
                    }
                },
                ticks: {
                    font: {
                        size: 9 // X축 눈금 글씨 크기
                    },
                    maxRotation: 0, // 레이블을 수평으로 유지
                    minRotation: 0
                }
            }
        }
    };
    
     
    // Governance Stability Over Time
    } else if (title === 'Governance Stability Over Time') {
        const indicators = ['CC', 'GE', 'PV', 'RL', 'RQ', 'VA'];
        const colors = ['#FF0000', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#FF00FF'];

        labels = [...new Set(countryData.map(item => item.year))]; // 연도 추출
        datasets = indicators.map((indicator, index) => {
            return {
                label: indicator,
                data: labels.map(year => {
                    const record = countryData.find(item => item.year === year && item.indicator === indicator.toLowerCase());
                    return record ? record.estimate : null;
                }),
                borderColor: colors[index],
                backgroundColor: colors[index],
                fill: false,
                tension: 0.4,
            };
        });

    // Weapon Systems Distribution (파이 차트)
    } else if (title === 'Weapon Systems Distribution') {
        labels = [...new Set(countryData.map(item => item.Category))];
        backgroundColors = generateColors(labels.length);
        datasets = [{
            data: labels.map(category => countryData.filter(item => item.Category === category).length),
            backgroundColor: backgroundColors,
        }];

    // Weapon Imports Distribution (파이 차트)
    } else if (title === 'Weapon Imports Distribution') {
        labels = [...new Set(countryData.map(item => item['USML Category']))];
        backgroundColors = generateColors(labels.length);
        datasets = [{
            data: labels.map(category => countryData.filter(item => item['USML Category'] === category).length),
            backgroundColor: backgroundColors,
        }];

    // 일반 데이터 처리
    } else {
        labels = Object.keys(countryData[0]).filter(key => !isNaN(key)).sort();
        datasets = [{
            label: title,
            data: labels.map(year => countryData[0][year] || 0),
            backgroundColor: 'rgba(54, 162, 235, 0.7)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
        }];
    }

    // 차트 생성
    const canvas = document.createElement('canvas');
    canvas.style.height = '300px';
    container.appendChild(canvas);

    new Chart(canvas.getContext('2d'), {
        type: chartType,
        data: { labels: labels, datasets: datasets },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: true },
                title: { display: true, text: title },
            },
            scales: chartType === 'bar' || chartType === 'line' ? {
                x: { title: { display: true, text: 'Year' } },
                y: { title: { display: true, text: yAxisLabel } },
            } : {}, // 파이 차트에는 scales 적용 안 함
        }
    });
}

// 색상 생성 함수
function generateColors(length) {
    const colors = [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
        '#FF9F40', '#C9CBCF', '#4D5360', '#AC92EC', '#4FC1E9'
    ];
    return Array.from({ length }, (_, i) => colors[i % colors.length]);
}




// 국가별 차트 로드
async function loadChartsForCountry(countryName, container) {
    container.innerHTML = ''; // 기존 내용을 초기화
    container.appendChild(closeButton); // 닫기 버튼 유지


    const jsonData = await loadJsonData();

    // 차트 정보
    const chartInfo = [
        { key: 'economy', title: 'Major Economic Indicators', yAxisLabel: 'Value', type: 'bar' },
        { key: 'military', title: 'Military Expenditure', yAxisLabel: 'Expenditure (in billions)', type: 'line' },
        { key: 'politics', title: 'Governance Stability Over Time', yAxisLabel: 'Stability Score', type: 'line' },
        { key: 'armsExports', title: 'Arms Exports Over Time', yAxisLabel: 'Export Value (in billions)', type: 'line' },
        { key: 'armsImports', title: 'Arms Imports Over Time', yAxisLabel: 'Import Value (in billions)', type: 'line' },
        { key: 'weaponSystems', title: 'Weapon Systems Distribution', yAxisLabel: 'Import Value (in billions)', type: 'pie' },
        { key: 'weaponImports', title: 'Weapon Imports Distribution', yAxisLabel: 'Import Value (in billions)', type: 'pie' },
    ];

    for (const chart of chartInfo) {
        const chartContainer = document.createElement('div');
        chartContainer.className = 'chart';
        container.appendChild(chartContainer);

        await createChart(chartContainer, countryName, jsonData[chart.key], chart.title, chart.yAxisLabel, chart.type);
    }
}

    // GeoJSON 데이터 로드 및 지도 렌더링
    fetch('https://raw.githubusercontent.com/datasets/geo-boundaries-world-110m/master/countries.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            style: () => ({ color: '#999', weight: 1.5, fillColor: '#888', fillOpacity: 0.4 }),
            onEachFeature: (feature, layer) => {
                layer.on({
                    click: e => {
                        const countryName = feature.properties.ADMIN || feature.properties.name || 'Unknown';

                        // 팝업창 내부 HTML 생성
                        popupContainer.style.display = 'block';
                        adjustPopupPosition(e.originalEvent, popupContainer);
                        popupContainer.innerHTML = `
                           <h3 class="popup-country-name" style="cursor: pointer; color: black; text-decoration: none;">${countryName}</h3>
    <div id="popup-charts"></div>
`;

                        // 팝업 클릭 시 이동 이벤트 추가 (나라 선택 및 URL 업데이트)
                        const popupCountryName = document.querySelector('.popup-country-name');
                        popupCountryName.addEventListener('click', () => {
                            const targetUrl = new URL('/WEB/web-layout/html/data/analysis_1.html', window.location.origin);
                            targetUrl.searchParams.set('country', countryName); // 쿼리 파라미터에 나라 추가
                            window.location.href = targetUrl; // 페이지 이동
                        });

                        // 시각화 데이터 로드
                        loadChartsForCountry(countryName, document.getElementById('popup-charts'));
                    },
                });
            },
        }).addTo(window.map);
    })
    .catch(error => console.error('Error loading GeoJSON:', error));

// 팝업 위치 조정 함수
function adjustPopupPosition(event, container) {
    const popupWidth = container.offsetWidth;
    const popupHeight = container.offsetHeight;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    let left = event.pageX + 15;
    let top = event.pageY + 15;

    if (left + popupWidth > windowWidth) left = windowWidth - popupWidth - 15;
    if (top + popupHeight > windowHeight) top = windowHeight - popupHeight - 15;

    container.style.left = `${left}px`;
    container.style.top = `${top}px`;
}

});
