document.addEventListener("DOMContentLoaded", () => {
    // 새로운 필터로 뉴스 데이터 가져오기
    fetchCustomNews();

    // 슬라이더 기능
    let customIndex = 0;
    const customPrevBtn = document.querySelector('.custom-slider-button.left');
    const customNextBtn = document.querySelector('.custom-slider-button.right');
    const customSlider = document.querySelector('.custom-news-slider');

    if (customPrevBtn && customNextBtn && customSlider) {
        const customSlide = (direction) => {
            const totalItems = customSlider.children.length;
            const visibleItems = 3;

            if (direction === "left" && customIndex > 0) {
                customIndex--;
            } else if (direction === "right" && customIndex < totalItems - visibleItems) {
                customIndex++;
            }

            customSlider.style.transform = `translateX(-${customIndex * (100 / visibleItems)}%)`;
        };

        customPrevBtn.addEventListener("click", () => customSlide("left"));
        customNextBtn.addEventListener("click", () => customSlide("right"));
    }
});

// 새로운 API를 통해 뉴스 데이터 가져오기
async function fetchCustomNews() {
    const apiKey = "33c385af32f54e7ba2d1afd15baa2d45"; // 여기에 NewsAPI에서 발급받은 API Key 입력
    const url = `https://newsapi.org/v2/everything?q=(한화에어로스페이스 OR 한화디펜스 OR 한국항공우주산업 OR KAI OR 현대로템 OR LIG넥스원 OR 현대중공업 OR 한화오션 OR SNT모티브 OR 풍산 OR 대한항공 OR 휴니드테크 OR 한화시스템) AND (방위산업 OR 국방 OR 군사)&language=ko&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.articles && data.articles.length > 0) {
            displayCustomHighlightedNews(data.articles[0]); // 첫 번째 뉴스는 큰 뉴스로 표시
            displayCustomSliderNews(data.articles.slice(1, 6)); // 나머지는 슬라이더로 표시
            displayCustomAdditionalNews(data.articles.slice(6)); // 나머지 추가 뉴스 표시
        } else {
            document.getElementById("custom-news-container").innerHTML = "<p>No custom news available at the moment.</p>";
        }
    } catch (error) {
        console.error("Error fetching custom news:", error);
        document.getElementById("custom-news-container").innerHTML = "<p>Failed to load custom news.</p>";
    }
}

// 큰 뉴스 표시
function displayCustomHighlightedNews(article) {
    document.querySelector(".custom-highlighted-news-image").src = article.urlToImage || "placeholder.jpg";
    document.querySelector(".custom-highlighted-news-content h2 a").innerText = article.title || "No Title";
    document.querySelector(".custom-highlighted-news-content h2 a").href = article.url || "#";
    document.querySelector(".custom-highlighted-news-content p").innerText = article.description || "No Description";
    document.querySelector(".custom-highlighted-news-content .author").innerText = `By ${article.author || "Unknown"} - ${new Date(article.publishedAt).toLocaleDateString()}`;
}

// 슬라이더에 뉴스 표시
function displayCustomSliderNews(articles) {
    const slider = document.querySelector(".custom-news-slider");
    slider.innerHTML = ""; // 초기화

    articles.forEach(article => {
        const newsHTML = `
            <div class="custom-news-item">
                <img src="${article.urlToImage || 'placeholder.jpg'}" alt="News Image" />
                <h3><a href="${article.url || '#'}" target="_blank">${article.title || "No Title"}</a></h3>
                <p class="author">By ${article.author || "Unknown"} - ${new Date(article.publishedAt).toLocaleDateString()}</p>
            </div>
        `;
        slider.innerHTML += newsHTML;
    });
}

// 추가 뉴스 표시
function displayCustomAdditionalNews(articles) {
    const container = document.getElementById("custom-news-container");
    container.innerHTML = ""; // 기존 콘텐츠 초기화

    // 최대 3개의 뉴스만 표시
    articles.slice(0, 3).forEach((article) => {
        const newsHTML = `
            <div class="custom-news-item">
                <img src="${article.urlToImage || 'placeholder.jpg'}" alt="News Image">
                <div class="custom-news-content">
                    <h3><a href="${article.url}" target="_blank">${article.title || 'No Title'}</a></h3>
                    <p>${article.description || 'No description available.'}</p>
                    <p class="news-date">${new Date(article.publishedAt).toLocaleDateString()}</p>
                </div>
            </div>
        `;
        container.innerHTML += newsHTML;
    });
}
