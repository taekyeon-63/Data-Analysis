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

    // 기존 기능: 드롭다운 메뉴 토글
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownBar = document.querySelector('.dropdown-bar');

    if (dropdownToggle && dropdownBar) {
        dropdownToggle.addEventListener('click', (event) => {
            event.preventDefault();

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

    // 추가: 드롭다운 메뉴와 검색창이 동시에 열리지 않도록 처리
    document.addEventListener('click', (event) => {
        if (!dropdownBar.contains(event.target) && !dropdownToggle.contains(event.target)) {
            dropdownBar.style.height = '0';
            dropdownBar.classList.remove('open');
            dropdownToggle.classList.remove('dropdown-open');
        }
    });

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

    articles.forEach((article) => {
        const newsHTML = `
            <div class="article-box">
                <img src="${article.urlToImage || 'placeholder.jpg'}" alt="News Image" class="news-image">
                <div class="news-content">
                    <h2><a href="${article.url}" target="_blank">${article.title}</a></h2>
                    <p>${article.description || "No description available."}</p>
                    <p class="author">By ${article.author || "Unknown"} - ${new Date(article.publishedAt).toLocaleDateString()}</p>
                </div>
            </div>
        `;
        container.innerHTML += newsHTML;
    });
}
