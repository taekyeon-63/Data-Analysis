window.addEventListener('DOMContentLoaded', event => {
    // 기존 기능: 사이드바 토글
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

    // 기존 기능: 드롭다운 메뉴 토글
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownBar = document.querySelector('.dropdown-bar');

    if (dropdownToggle && dropdownBar) {
        dropdownToggle.addEventListener('click', event => {
            event.preventDefault();

            // 드롭다운 바 열고 닫기
            if (dropdownBar.classList.contains('open')) {
                dropdownBar.style.height = '0';
                dropdownBar.classList.remove('open');
                dropdownToggle.classList.remove('dropdown-open'); // 삼각형 초기화
            } else {
                dropdownBar.style.height = '200px';
                dropdownBar.classList.add('open');
                dropdownToggle.classList.add('dropdown-open'); // 삼각형 회전
            }
        });
    }

    // 추가 기능: 검색창 토글
    const searchContainer = document.querySelector('.search-container');
    const searchIcon = document.querySelector('.search-icon');

    if (searchContainer && searchIcon) {
        searchIcon.addEventListener('click', event => {
            event.preventDefault();
            searchContainer.classList.toggle('active'); // 검색창 활성화
        });

        // 외부 클릭 시 검색창 닫기
        document.addEventListener('click', event => {
            if (!searchContainer.contains(event.target) && !searchIcon.contains(event.target)) {
                searchContainer.classList.remove('active');
            }
        });
    }

    // 추가: 드롭다운 메뉴와 검색창이 동시에 열리지 않도록 처리
    document.addEventListener('click', event => {
        if (!dropdownBar.contains(event.target) && !dropdownToggle.contains(event.target)) {
            dropdownBar.style.height = '0';
            dropdownBar.classList.remove('open');
            dropdownToggle.classList.remove('dropdown-open');
        }
    });
});
