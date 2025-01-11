import { fetchJsonData } from './common.js';

const clusterFilePaths = {
    군집1: [
        '/WEB/web-layout/data/군집1/항공및우주기술_1.json',
        '/WEB/web-layout/data/군집1/항공및우주기술_2.json',
        '/WEB/web-layout/data/군집1/항공및우주기술_3.json',
        '/WEB/web-layout/data/군집1/항공및우주기술_4.json',
    ],
    군집2: [
        '/WEB/web-layout/data/군집2/해양방위및조선업_1.json',
        '/WEB/web-layout/data/군집2/해양방위및조선업_2.json',
        '/WEB/web-layout/data/군집2/해양방위및조선업_3.json',
    ],
    군집3: [
        '/WEB/web-layout/data/군집3/지상방위및무기시스템_1.json',
        '/WEB/web-layout/data/군집3/지상방위및무기시스템_2.json',
        '/WEB/web-layout/data/군집3/지상방위및무기시스템_3.json',
        '/WEB/web-layout/data/군집3/지상방위및무기시스템_4.json',
    ],
    군집4: [
        '/WEB/web-layout/data/군집4/전자및시스템주요제품_1.json',
        '/WEB/web-layout/data/군집4/전자및시스템주요제품_2.json',
        '/WEB/web-layout/data/군집4/전자및시스템주요제품_3.json',
    ],
    군집5: [
        '/WEB/web-layout/data/군집5/독일/라인메탈.json',
        '/WEB/web-layout/data/군집5/미국/록히드마틴.json',
        '/WEB/web-layout/data/군집5/미국/노스롭그루먼.json',
        '/WEB/web-layout/data/군집5/미국/레이시온테크놀로지스.json',
        '/WEB/web-layout/data/군집5/미국/보잉.json',
        '/WEB/web-layout/data/군집5/미국/제너럴다이내믹스.json',
        '/WEB/web-layout/data/군집5/영국/BAE시스템스.json',
        '/WEB/web-layout/data/군집5/중국/중국항공공업집단.json',
        '/WEB/web-layout/data/군집5/프랑스/탈레스그룹_사프란.json',
    ],    
};

const numberToColorMap = {
    1: '#FFB3BA', 2: '#FFDFBA', 3: '#FFFFBA', 4: '#BAFFC9', 5: '#BAE1FF',
    6: '#D5AAFF', 7: '#FFABAB', 8: '#FFC3A0', 9: '#FFDAC1', 10: '#D5F4E6',
    11: '#C0C0FF', 12: '#FAFAD2', 13: '#D8BFD8', 14: '#FFD700', 15: '#B0E0E6',
    16: '#ADD8E6', 17: '#90EE90', 18: '#FF7F50', 19: '#FF6347', 20: '#6A5ACD',
    21: '#8A2BE2', 22: '#4682B4'
};

document.addEventListener('DOMContentLoaded', async () => {
    const pieChartCanvas = document.getElementById('companyImportPieChart')?.getContext('2d');
    let importPieChart;

    async function fetchCategoryCountsForCompanies(cluster, companies) {
        const categoryCounts = {};
        const productDetails = {};
    
        for (const company of companies) {
            let path;
    
            // 군집5일 때 국가 폴더를 포함한 경로 처리
            if (cluster === '군집5') {
                const country = getCountryForCompany(company.trim()); // 회사에 해당하는 국가 정보 가져오기
                if (!country) {
                    alert(`선택된 기업(${company})에 대한 국가를 찾을 수 없습니다.`);
                    continue;
                }
                path = `/WEB/web-layout/data/${cluster}/${country}/${company}.json`;
            } else {
                // 군집5 외 다른 군집의 경로
                path = `/WEB/web-layout/data/${cluster}/${company}.json`;
            }
    
            try {
                console.log(`Fetching data from: ${path}`);
                const response = await fetch(path);
    
                // Fetch 상태 확인
                if (!response.ok) {
                    console.error(`Failed to fetch: ${path} - Status: ${response.status}`);
                    continue;
                }
    
                const data = await response.json();
                console.log(`Data fetched from ${path}:`, data);
    
                if (!Array.isArray(data) || data.length === 0) {
                    console.warn(`Empty or invalid JSON at ${path}`);
                    continue;
                }
    
                // 카테고리와 제품 세부 정보를 집계
                data.forEach((item) => {
                    if (item.Category && typeof item.Category === 'string' && item.Category.trim() !== '') {
                        categoryCounts[item.Category] = (categoryCounts[item.Category] || 0) + 1;
    
                        if (!productDetails[item.Category]) {
                            productDetails[item.Category] = [];
                        }
                        productDetails[item.Category].push(item.Main_Selling_Product);
                    } else {
                        console.warn(`Invalid data format in ${path}: ${JSON.stringify(item)}`);
                    }
                });
            } catch (error) {
                console.error(`Error fetching data from ${path}:`, error);
            }
        }
    
        console.log('Final category counts:', categoryCounts);
        console.log('Final product details:', productDetails);
    
        return { categoryCounts, productDetails };
    }

    function initializePieChart(labels, values, productDetails) {
        if (importPieChart) {
            importPieChart.destroy(); // 기존 차트 제거
        }
    
        importPieChart = new Chart(pieChartCanvas, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [
                    {
                        data: values,
                        backgroundColor: labels.map(label => numberToColorMap[parseInt(label, 10)] || '#CCCCCC'),
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            font: { size: 14 },
                            padding: 20,
                        },
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                const category = context.label;
                                const products = productDetails[category] || [];
                                return [
                                    `Category: ${category}`,
                                    `Products: ${products.join(', ')}`,
                                ];
                            },
                        },
                    },
                    title: {
                        display: true,
                        text: 'Category Distribution',
                        font: { size: 18, weight: 'normal' },
                        padding: { top: 20, bottom: 20 },
                    },
                },
                layout: {
                    padding: { top: 20, bottom: 20, left: 20, right: 20 },
                },
            },
        });
    }    

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
                        data: values,
                        backgroundColor: categories.map(cat => numberToColorMap[parseInt(cat, 10)] || '#CCCCCC'),
                        hoverOffset: 10,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: (tooltipItem) => {
                                const category = tooltipItem.label;
                                const descriptionList = descriptions[category] || [];
                                return [`${category}: ${tooltipItem.raw}`, ...descriptionList];
                            },
                        },
                    },
                    title: {
                        display: true,
                        text: 'Weapon Imports Distribution',
                        font: { size: 15, weight: 'normal' },
                    },
                },
            },
        });
    }
    

// HTML에 적절한 크기를 설정
const pieChartContainer = document.getElementById('companyImportPieChart').parentElement;
pieChartContainer.style.width = '570px'; // 차트 컨테이너 너비
pieChartContainer.style.height = '570px'; // 차트 컨테이너 높이


// 군집 이름과 해당 설명을 매핑
const clusterNames = {
    군집1: '항공 및 우주기술 기업',
    군집2: '해양방위 및 조선 기업',
    군집3: '지상방위 및 무기시스템 기업',
    군집4: '전자 및 시스템 기업',
    군집5: '해외 기업',
};

// 회사 드롭다운을 채우고 "전체 기업" 옵션 추가
function populateCompanyDropdown(cluster) {
    const companySelector = document.getElementById('companySelector');
    const companies = clusterFilePaths[cluster] || [];

    companySelector.innerHTML = '<option value="" disabled selected>기업을 선택하세요</option>';

    companies.forEach((filePath) => {
        const companyName = filePath.split('/').pop().replace('.json', '');
        const option = document.createElement('option');
        option.value = companyName;
        option.textContent = companyName;
        companySelector.appendChild(option);
    });

    // "전체 기업" 옵션 추가
    const allOption = document.createElement('option');
    allOption.value = 'all';
    allOption.textContent = `전체 ${clusterNames[cluster] || '전체 기업'}`;
    companySelector.appendChild(allOption);
}

    document.getElementById('clusterSelector').addEventListener('change', () => {
        const cluster = document.getElementById('clusterSelector').value;
        if (cluster) {
            populateCompanyDropdown(cluster);
        }
    });

    document.getElementById('companySelector').addEventListener('change', async () => {
        const cluster = document.getElementById('clusterSelector').value;
        const company = document.getElementById('companySelector').value;

        if (!cluster || !company) {
            alert('군집과 회사를 모두 선택하세요.');
            return;
        }

        let companiesToFetch = [];
        if (company === 'all') {
            companiesToFetch = (clusterFilePaths[cluster] || []).map((filePath) =>
                filePath.split('/').pop().replace('.json', '')
            );
        } else {
            companiesToFetch = [company];   
        }

        const { categoryCounts, productDetails } = await fetchCategoryCountsForCompanies(cluster, companiesToFetch);

        if (Object.keys(categoryCounts).length === 0) {
            alert(`유효한 데이터를 가져올 수 없습니다. 파일을 확인하세요.`);
            return;
        }        
        const labels = Object.keys(categoryCounts);
        const values = Object.values(categoryCounts);

        initializePieChart(labels, values, productDetails);
    });
});