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

    // 방위 관련 뉴스 데이터를 가져오고 표시
    fetchNews();

    // 슬라이더 기능
    let currentIndex = 0;
    const prevBtn = document.querySelector('.slider-button.left');
    const nextBtn = document.querySelector('.slider-button.right');
    const slider = document.querySelector('.news-slider');

    if (prevBtn && nextBtn && slider) {
        const slide = (direction) => {
            const totalItems = slider.children.length;
            const visibleItems = 3;

            if (direction === "left" && currentIndex > 0) {
                currentIndex--;
            } else if (direction === "right" && currentIndex < totalItems - visibleItems) {
                currentIndex++;
            }

            slider.style.transform = `translateX(-${currentIndex * (100 / visibleItems)}%)`;
        };

        prevBtn.addEventListener("click", () => slide("left"));
        nextBtn.addEventListener("click", () => slide("right"));
    }
});

// API를 통해 방위 관련 뉴스를 가져오는 함수
async function fetchNews() {
    const apiKey = "33c385af32f54e7ba2d1afd15baa2d45"; // 본인의 NewsAPI 키를 입력하세요
    const url = `https://newsapi.org/v2/everything?q=defense OR military OR war OR armed conflict&language=en&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.articles && data.articles.length > 0) {
            displayHighlightedNews(data.articles[0]); // 첫 번째 뉴스는 큰 뉴스로 표시
            displaySliderNews(data.articles.slice(1, 6)); // 나머지는 슬라이더로 표시
            displayAdditionalNews(data.articles.slice(6)); // 나머지 추가 뉴스 표시
        } else {
            document.getElementById("news-container").innerHTML = "<p>No news available at the moment.</p>";
        }
    } catch (error) {
        console.error("Error fetching news:", error);
        document.getElementById("news-container").innerHTML = "<p>Failed to load news.</p>";
    }
}

// 큰 뉴스 표시
function displayHighlightedNews(article) {
    document.querySelector(".highlighted-news-image").src = article.urlToImage || "placeholder.jpg";
    document.querySelector(".highlighted-news-content h2 a").innerText = article.title || "No Title";
    document.querySelector(".highlighted-news-content h2 a").href = article.url || "#";
    document.querySelector(".highlighted-news-content p").innerText = article.description || "No Description";
    document.querySelector(".highlighted-news-content .author").innerText = `By ${article.author || "Unknown"} - ${new Date(article.publishedAt).toLocaleDateString()}`;
}

// 슬라이더에 뉴스 표시
function displaySliderNews(articles) {
    const slider = document.querySelector(".news-slider");
    slider.innerHTML = ""; // 초기화

    articles.forEach(article => {
        const newsHTML = `
            <div class="news-item">
                <img src="${article.urlToImage || 'placeholder.jpg'}" alt="News Image" />
                <h3><a href="${article.url || '#'}" target="_blank">${article.title || "No Title"}</a></h3>
                <p class="author">By ${article.author || "Unknown"} - ${new Date(article.publishedAt).toLocaleDateString()}</p>
            </div>
        `;
        slider.innerHTML += newsHTML;
    });
}

// 추가 뉴스 표시
function displayAdditionalNews(articles) {
    const container = document.getElementById("news-container");
    container.innerHTML = ""; // 기존 콘텐츠 초기화

    // 최대 3개의 뉴스만 표시
    articles.slice(0, 3).forEach((article) => {
        const newsHTML = `
            <div class="news-item">
                <img src="${article.urlToImage || 'placeholder.jpg'}" alt="News Image">
                <div class="news-content">
                    <h3><a href="${article.url}" target="_blank">${article.title || 'No Title'}</a></h3>
                    <p>${article.description || 'No description available.'}</p>
                    <p class="news-date">${new Date(article.publishedAt).toLocaleDateString()}</p>
                </div>
            </div>
        `;
        container.innerHTML += newsHTML;
    });
}
