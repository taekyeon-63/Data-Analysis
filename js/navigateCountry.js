import { createCountryPageUrl } from './common.js';

// 국가 시각화 페이지로 이동
export function navigateToAnalysis(countryName) {
    try {
        // 절대 경로로 URL 생성
        const countryPageUrl = `${window.location.origin}/WEB/web-layout/html/data/analysis_1.html?country=${encodeURIComponent(countryName)}`;
        window.location.href = countryPageUrl;
    } catch (error) {
        alert(`Error navigating to analysis page: ${error.message}`);
    }
}

// 전역 접근 가능하도록 설정
window.navigateToAnalysis = navigateToAnalysis;
