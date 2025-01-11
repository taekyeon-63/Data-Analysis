// window.addEventListener('DOMContentLoaded', event => {
//     // Simple-DataTables
//     // https://github.com/fiduswriter/Simple-DataTables/wiki

//     const datatablesSimple = document.getElementById('datatablesSimple');
//     if (datatablesSimple) {
//         new simpleDatatables.DataTable(datatablesSimple);
//     }
// });


window.addEventListener('DOMContentLoaded', (event) => {
    // 기존 기능: 사이드바 토글
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', (event) => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

    // 2. 사이드바 드롭다운 기본 열림
    const defaultOpenDropdownId = 'collapseResearch'; // 기본으로 열릴 드롭다운의 ID
    const defaultDropdown = document.getElementById(defaultOpenDropdownId);

    if (defaultDropdown) {
        // 드롭다운 열기
        defaultDropdown.classList.add('show'); // Bootstrap에서 사용하는 'show' 클래스를 추가하여 열기

        // 삼각형 아이콘 회전 상태 설정
        const toggleButton = document.querySelector(`[data-bs-target="#${defaultOpenDropdownId}"]`);
        if (toggleButton) {
            toggleButton.setAttribute('aria-expanded', 'true'); // 접근성을 위해 aria-expanded를 true로 설정
            toggleButton.classList.remove('collapsed'); // 'collapsed' 클래스를 제거하여 삼각형이 회전된 상태로 표시
        }
    }

    // 수정된 기능: 여러 드롭다운 메뉴 동적 토글
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle'); // 모든 드롭다운 토글
    const dropdownBars = document.querySelectorAll('.dropdown-bar'); // 모든 드롭다운 바

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (event) => {
            event.preventDefault();

            // 연결된 드롭다운 가져오기
            const dropdownId = toggle.getAttribute('data-dropdown');
            const relatedDropdown = document.getElementById(`${dropdownId}-dropdown`);

            // 다른 드롭다운 닫기
            dropdownBars.forEach(bar => {
                if (bar !== relatedDropdown) {
                    bar.style.height = '0';
                    bar.classList.remove('open');
                }
            });
            
            // 현재 드롭다운 열기/닫기
            if (relatedDropdown.classList.contains('open')) {
                relatedDropdown.style.height = '0';
                relatedDropdown.classList.remove('open');
                toggle.classList.remove('dropdown-open'); // 삼각형 초기화
            } else {
                relatedDropdown.style.height = relatedDropdown.scrollHeight + 'px';
                relatedDropdown.classList.add('open');
                toggle.classList.add('dropdown-open'); // 삼각형 회전
            }
        });
    });

    // 외부 클릭 시 모든 드롭다운 닫기
    document.addEventListener('click', (event) => {
        // 드롭다운 토글과 드롭다운 바 외부 클릭 감지
        if (![...dropdownToggles].some(toggle => toggle.contains(event.target)) &&
            ![...dropdownBars].some(bar => bar.contains(event.target))) {
        
            // 모든 드롭다운 닫기
            dropdownBars.forEach(bar => {
                bar.style.height = '0'; // 높이 0으로 설정
                bar.classList.remove('open'); // 드롭다운 닫기 상태
            });

            // 모든 삼각형 초기화
            dropdownToggles.forEach(toggle => {
                toggle.classList.remove('dropdown-open'); // 삼각형 초기화
            });
        }
    });


    // 기존 기능: 검색창 토글
    const searchContainer = document.querySelector('.search-container');
    const searchIcon = document.querySelector('.search-icon');

    if (searchContainer && searchIcon) {
        searchIcon.addEventListener('click', (event) => {
            event.preventDefault();
            searchContainer.classList.toggle('active'); // 검색창 활성화
        });

        // 외부 클릭 시 검색창 닫기
        document.addEventListener('click', (event) => {
            if (!searchContainer.contains(event.target) && !searchIcon.contains(event.target)) {
                searchContainer.classList.remove('active');
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {

    // DataTable 초기화 함수
    function initializeDataTableFromFile(tableElementId, jsonFilePath) {
        const tableElement = document.getElementById(tableElementId);
        if (tableElement) {
            fetch(jsonFilePath)
                .then(response => {
                    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                    return response.json();
                })
                .then(data => {
                    if (Array.isArray(data) && data.length > 0) {
                        // // Country 컬럼을 첫 번째로 이동
                        // const reorderedData = data.map(row => {
                        //     const { Country, ...rest } = row;
                        //     return { Country, ...rest };
                        // });

                        // Country 컬럼을 기준으로 알파벳 순으로 정렬
                        const sortedData = reorderedData.sort((a, b) => {
                            const countryA = a.Country.toLowerCase();
                            const countryB = b.Country.toLowerCase();
                            if (countryA < countryB) return -1;
                            if (countryA > countryB) return 1;
                            return 0;
                        });

                        // DataTable 초기화 호출
                        initializeDataTable(sortedData, tableElement);
                    } else {
                        console.warn(`JSON 파일(${jsonFilePath})에 데이터가 없습니다.`);
                    }
                })
                .catch(error => console.error(`JSON 로드 오류(${jsonFilePath}):`, error));
        }
    }

    
    // api 참조 데이터테이블 출력 함수
    function initializeDataTableFromFile(tableElementId, jsonFilePath) {
        const tableElement = document.getElementById(tableElementId);
        if (tableElement) {
            fetch(jsonFilePath)
                .then(response => {
                    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                    return response.json();
                })
                .then(data => {
                    if (Array.isArray(data) && data.length > 0) {
                        // 데이터 재정렬
                        const headers = Object.keys(data[0]);
                        const reorderedHeaders = ["Country", ...headers.filter(h => h !== "Country")];
    
                        // 테이블 헤더
                        tableElement.querySelector('thead').innerHTML = `
                            <tr>${reorderedHeaders.map(h => `<th>${h}</th>`).join('')}</tr>
                        `;
    
                        // 테이블 데이터 제한 (최대 100개)
                        const limitedData = data.slice(0, 100);
    
                        // 테이블 본문
                        tableElement.querySelector('tbody').innerHTML = limitedData.map(row => `
                            <tr>${reorderedHeaders.map(h => `<td>${row[h] || '-'}</td>`).join('')}</tr>
                        `).join('');
    
                        // DataTable 초기화
                        new simpleDatatables.DataTable(tableElement, {
                            perPage: 10,
                            perPageSelect: [10, 50, 100],
                            searchable: true,
                        });
                    } else {
                        console.warn(`No data found in JSON: ${jsonFilePath}`);
                    }
                })
                .catch(error => console.error(`Error loading JSON: ${error.message}`));
        }
    }
    
    // 여러 테이블 및 JSON 파일 초기화
    initializeDataTableFromFile('customDataTable', '/WEB/web-layout/data/Economy_data.json');
    initializeDataTableFromFile('politicsDataTable', '/WEB/web-layout/data/governance_data.json');
    initializeDataTableFromFile('militaryDataTable', '/WEB/web-layout/data/military_expenses_data.json');
    initializeDataTableFromFile('ucdpDataTable', '/WEB/web-layout/data/UCDP_data.json');
    initializeDataTableFromFile('ucdpgedDataTable', '/WEB/web-layout/data/UCDP_GED_2023_data.json');
    initializeDataTableFromFile('armsexportDataTable', '/WEB/web-layout/data/arms_exports_data.json');
    initializeDataTableFromFile('armsimportDataTable', '/WEB/web-layout/data/arms_import_data.json');
    initializeDataTableFromFile('weaponsysDataTable', '/WEB/web-layout/data/weapon_system_Data.json');
    initializeDataTableFromFile('weaponimportDataTable', '/WEB/web-layout/data/weapon_import.json');

});


document.addEventListener('DOMContentLoaded', () => {
    
    // 드롭다운 요소 선택
    const dropdown = document.querySelector('.datatable-selector');
    const dropdownWrapper = dropdown?.parentElement; // 드롭다운과 라벨을 감싸는 상위 요소
    const dropdownText = dropdownWrapper?.querySelector('label'); // 드롭다운 옆의 텍스트 라벨
    
  
    // 드롭다운 스타일 강제 적용
    if (dropdown) {
      // CSS 강제 적용
        dropdown.style.height = '30px';
        dropdown.style.width = '60px';
        dropdown.style.padding = '0 8px';
        dropdown.style.lineHeight = '30px';
        dropdown.style.textAlign = 'center';
        dropdown.style.boxSizing = 'border-box';
        dropdown.style.appearance = 'none';
        dropdown.style.background = 'white url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2Ij48cGF0aCBkPSJNNC42IDEuN2wuMS4xLjkuOUwxMiA4bC0uOS45LTMuMyAzLjMtLjEuMWwtLjEtLjEtMy4zLTMuMy0uOS0uOUwwIDguNCA0LjYgMS43eiIgZmlsbD0iI2MzYzNjMyIvPjwvc3ZnPg==") no-repeat right 8px center';
        dropdown.style.backgroundSize = '12px 12px';
    }
  
    // 상위 wrapper 정렬
    if (dropdownWrapper) {
      dropdownWrapper.style.display = 'flex'; // 플렉스 박스 사용
      dropdownWrapper.style.alignItems = 'center'; // 세로 정렬
      dropdownWrapper.style.gap = '8px'; // 간격 조정
    }
  
    // 드롭다운 옆 텍스트 스타일
    if (dropdownText) {
      dropdownText.style.lineHeight = '30px'; // 라벨 수직 정렬
      dropdownText.style.fontSize = '0.9rem'; // 라벨 글꼴 크기
    }

    // 페이지네이션 버튼 처리
    const paginationButtons = document.querySelectorAll('.datatable-pagination .datatable-pagination-list button');
    paginationButtons.forEach((btn, index) => {
        if (index >= 6 && !btn.classList.contains('active')) {
        btn.style.display = 'none';
        }
    });

  });
  
    document.addEventListener('DOMContentLoaded', () => {
        const tableSelector = document.getElementById('tableSelector');

        // 테이블 요소 참조
        const gdpTable = document.getElementById('gdpTable');
        const politicsTable = document.getElementById('politicsTable');
        const ucdpTable = document.getElementById('ucdpTable');
        const ucdpgedTable = document.getElementById('ucdpgedTable');
        const militaryexTable = document.getElementById('militaryexTable');
        const armsimportTable = document.getElementById('armsimportTable');
        const armsexportTable = document.getElementById('armsexportTable');
        const weaponsysTable = document.getElementById('weaponsysTable');
        const weaponimportTable = document.getElementById('weaponimportTable');

        // 모든 테이블을 객체로 매핑
        const tables = {
            gdpTable: gdpTable,
            politicsTable: politicsTable,
            ucdpTable: ucdpTable,
            ucdpgedTable: ucdpgedTable,
            militaryexTable: militaryexTable,
            armsimportTable: armsimportTable,
            armsexportTable: armsexportTable,
            weaponsysTable: weaponsysTable,
            weaponimportTable: weaponimportTable,
        };

        // 드롭다운 변경 이벤트 리스너
        tableSelector.addEventListener('change', (event) => {
            const selectedTable = event.target.value;

            // 모든 테이블 숨기기
            Object.keys(tables).forEach((tableId) => {
                tables[tableId].style.display = 'none'; // 모든 테이블 숨기기
            });

            // 선택된 테이블만 표시
            if (tables[selectedTable]) {
                tables[selectedTable].style.display = 'block'; // 선택된 테이블 표시
            } else {
                console.warn(`테이블 "${selectedTable}"가 존재하지 않습니다.`);
            }
        });
    });


