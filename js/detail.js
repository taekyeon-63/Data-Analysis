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



