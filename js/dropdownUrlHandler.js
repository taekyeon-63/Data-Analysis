document.addEventListener('DOMContentLoaded', () => {
    const countrySelector = document.getElementById('countrySelector');

    // URL에서 국가 가져오기
    function getCountryFromUrl() {
        const params = new URLSearchParams(window.location.search);
        return params.get('country');
    }

    // 국가 변경 이벤트 트리거
    function triggerCountryEvent(country) {
        const event = new CustomEvent('countryChange', { detail: country });
        document.dispatchEvent(event);
    }

    // URL 초기화
    const countryFromUrl = getCountryFromUrl();
    if (countryFromUrl) {
        countrySelector.value = countryFromUrl;
        triggerCountryEvent(countryFromUrl);
    }

    // 드롭다운 변경 이벤트
    countrySelector.addEventListener('change', (event) => {
        const selectedCountry = event.target.value;
        history.pushState({}, '', `?country=${selectedCountry}`);
        triggerCountryEvent(selectedCountry);
    });

    // 뒤로/앞으로 이동 처리
    window.addEventListener('popstate', () => {
        const countryFromUrl = getCountryFromUrl();
        if (countryFromUrl) {
            countrySelector.value = countryFromUrl;
            triggerCountryEvent(countryFromUrl);
        }
    });
});
