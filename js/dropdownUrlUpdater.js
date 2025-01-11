document.addEventListener('DOMContentLoaded', () => {
    const countrySelector = document.getElementById('countrySelector');

    if (countrySelector) {
        countrySelector.addEventListener('change', () => {
            const selectedCountry = countrySelector.value;

            // URL 변경
            if (selectedCountry) {
                const currentUrl = new URL(window.location.href);
                currentUrl.searchParams.set('country', selectedCountry);
                window.history.pushState({}, '', currentUrl); // URL 업데이트 (페이지 리로드 없음)
            }
        });
    }
});
