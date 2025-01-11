
// document.addEventListener('DOMContentLoaded', () => {
//     const countrySelector = document.getElementById('countrySelector'); // 국가 선택 드롭다운
//     const mapContainer = document.getElementById('mapContainer'); // 지도 컨테이너
//     const mapFrame = document.getElementById('mapFrame'); // iframe 요소

//     countrySelector.addEventListener('change', () => {
//         const selectedCountry = countrySelector.value;

//         // 국가별 HTML 지도 파일 매핑
        // const countryMaps = {
        //     'Afghanistan': '/WEB/web-layout/html/map/Afghanistan_map.html',
        //     'Algeria': '/WEB/web-layout/html/map/Algeria_map.html',
        //     'Angola': '/WEB/web-layout/html/map/Angola_map.html',
        //     'Armenia': '/WEB/web-layout/html/map/Armenia_map.html',
        //     'Azerbaijan': '/WEB/web-layout/html/map/Azerbaijan_map.html',
        //     'Bangladesh': '/WEB/web-layout/html/map/Bangladesh_map.html',
        //     'Belgium': '/WEB/web-layout/html/map/Belgium_map.html',
        //     'Benin': '/WEB/web-layout/html/map/Benin_map.html',
        //     'Bolivia': '/WEB/web-layout/html/map/Bolivia_map.html',
        //     'Brazil': '/WEB/web-layout/html/map/Brazil_map.html',
        //     'Burkina Faso': '/WEB/web-layout/html/map/Burkina Faso_map.html',
        //     'Burundi': '/WEB/web-layout/html/map/Burundi_map.html',
        //     'Cameroon': '/WEB/web-layout/html/map/Cameroon_map.html',
        //     'Central African Republic': '/WEB/web-layout/html/map/Central African Republic_map.html',
        //     'Chad': '/WEB/web-layout/html/map/Chad_map.html',
        //     'China': '/WEB/web-layout/html/map/China_map.html',
        //     'Colombia': '/WEB/web-layout/html/map/Colombia_map.html',
        //     'Ecuador': '/WEB/web-layout/html/map/Ecuador_map.html',
        //     'Egypt': '/WEB/web-layout/html/map/Egypt_map.html',
        //     'Ethiopia': '/WEB/web-layout/html/map/Ethiopia_map.html',
        //     'France': '/WEB/web-layout/html/map/France_map.html',
        //     'Georgia': '/WEB/web-layout/html/map/Georgia_map.html',
        //     'Ghana': '/WEB/web-layout/html/map/Ghana_map.html',
        //     'Haiti': '/WEB/web-layout/html/map/Haiti_map.html',
        //     'Honduras': '/WEB/web-layout/html/map/Honduras_map.html',
        //     'India': '/WEB/web-layout/html/map/India_map.html',
        //     'Indonesia': '/WEB/web-layout/html/map/Indonesia_map.html',
        //     'Iran, Islamic Rep.': '/WEB/web-layout/html/map/Iran_map.html',
        //     'Iraq': '/WEB/web-layout/html/map/Iraq_map.html',
        //     'Israel': '/WEB/web-layout/html/map/Israel_map.html',
        //     'Kenya': '/WEB/web-layout/html/map/Kenya_map.html',
        //     'Lebanon': '/WEB/web-layout/html/map/Lebanon_map.html',
        //     'Libya': '/WEB/web-layout/html/map/Libya_map.html',
        //     'Mali': '/WEB/web-layout/html/map/Mali_map.html',
        //     'Mauritania': '/WEB/web-layout/html/map/Mauritania_map.html',
        //     'Mexico': '/WEB/web-layout/html/map/Mexico_map.html',
        //     'Morocco': '/WEB/web-layout/html/map/Morocco_map.html',
        //     'Mozambique': '/WEB/web-layout/html/map/Mozambique_map.html',
        //     'Myanmar': '/WEB/web-layout/html/map/Myanmar (Burma)_map.html',
        //     'Niger': '/WEB/web-layout/html/map/Niger_map.html',
        //     'Nigeria': '/WEB/web-layout/html/map/Nigeria_map.html',
        //     'Pakistan': '/WEB/web-layout/html/map/Pakistan_map.html',
        //     'Papua New Guinea': '/WEB/web-layout/html/map/Papua New Guinea_map.html',
        //     'Peru': '/WEB/web-layout/html/map/Peru_map.html',
        //     'Philippines': '/WEB/web-layout/html/map/Philippines_map.html',
        //     'Russian Federation': '/WEB/web-layout/html/map/Russia (Soviet Union)_map.html',
        //     'Saudi Arabia': '/WEB/web-layout/html/map/Saudi Arabia_map.html',
        //     'Somalia': '/WEB/web-layout/html/map/Somalia_map.html',
        //     'South Africa': '/WEB/web-layout/html/map/South Africa_map.html',
        //     'South Sudan': '/WEB/web-layout/html/map/South Sudan_map.html',
        //     'Spain': '/WEB/web-layout/html/map/Spain_map.html',
        //     'Sudan': '/WEB/web-layout/html/map/Sudan_map.html',
        //     'Syrian Arab Republic': '/WEB/web-layout/html/map/Syria_map.html',
        //     'Thailand': '/WEB/web-layout/html/map/Thailand_map.html',
        //     'Togo': '/WEB/web-layout/html/map/Togo_map.html',
        //     'Tunisia': '/WEB/web-layout/html/map/Tunisia_map.html',
        //     'Uganda': '/WEB/web-layout/html/map/Uganda_map.html',
        //     'Ukraine': '/WEB/web-layout/html/map/Ukraine_map.html',
        //     'Venezuela, RB': '/WEB/web-layout/html/map/Venezuela_map.html',
        //     'Yemen, Rep.': '/WEB/web-layout/html/map/Yemen (North Yemen)_map.html',
                    
        //     'Albania': '/WEB/web-layout/html/map/Albania_map.html',
        //     'Andorra': '/WEB/web-layout/html/map/Andorra_map.html',
        //     'Antigua and Barbuda': '/WEB/web-layout/html/map/Antigua_and_Barbuda_map.html',
        //     'Argentina': '/WEB/web-layout/html/map/Argentina_map.html',
        //     'Australia': '/WEB/web-layout/html/map/Australia_map.html',
        //     'Austria': '/WEB/web-layout/html/map/Austria_map.html',
        //     'Bahamas': '/WEB/web-layout/html/map/Bahamas_map.html',
        //     'Bahrain': '/WEB/web-layout/html/map/Bahrain_map.html',
        //     'Barbados': '/WEB/web-layout/html/map/Barbados_map.html',
        //     'Belarus': '/WEB/web-layout/html/map/Belarus_map.html',
        //     'Belize': '/WEB/web-layout/html/map/Belize_map.html',
        //     'Bhutan': '/WEB/web-layout/html/map/Bhutan_map.html',
        //     'Bosnia and Herzegovina': '/WEB/web-layout/html/map/Bosnia_and_Herzegovina_map.html',
        //     'Botswana': '/WEB/web-layout/html/map/Botswana_map.html',
        //     'Brunei': '/WEB/web-layout/html/map/Brunei_map.html',
        //     'Bulgaria': '/WEB/web-layout/html/map/Bulgaria_map.html',
        //     'Cambodia': '/WEB/web-layout/html/map/Cambodia_map.html',
        //     'Canada': '/WEB/web-layout/html/map/Canada_map.html',
        //     'Chile': '/WEB/web-layout/html/map/Chile_map.html',
        //     'Comoros': '/WEB/web-layout/html/map/Comoros_map.html',
        //     'Congo, Dem. Rep.': '/WEB/web-layout/html/map/Congo,_Dem._Rep._map.html',
        //     'Costa Rica': '/WEB/web-layout/html/map/Costa_Rica_map.html',
        //     'Croatia': '/WEB/web-layout/html/map/Croatia_map.html',
        //     'Cuba': '/WEB/web-layout/html/map/Cuba_map.html',
        //     'Cyprus': '/WEB/web-layout/html/map/Cyprus_map.html',
        //     'Czech Republic': '/WEB/web-layout/html/map/Czech_Republic_map.html',
        //     "Côte d'Ivoire": "/WEB/web-layout/html/map/Côte_d'Ivoire_map.html",
        //     'Denmark': '/WEB/web-layout/html/map/Denmark_map.html',
        //     'Djibouti': '/WEB/web-layout/html/map/Djibouti_map.html',
        //     'Dominica': '/WEB/web-layout/html/map/Dominica_map.html',
        //     'Dominican Republic': '/WEB/web-layout/html/map/Dominican_Republic_map.html',
        //     'East Timor': '/WEB/web-layout/html/map/East_Timor_map.html',
        //     'El Salvador': '/WEB/web-layout/html/map/El_Salvador_map.html',
        //     'Equatorial Guinea': '/WEB/web-layout/html/map/Equatorial_Guinea_map.html',
        //     'Eritrea': '/WEB/web-layout/html/map/Eritrea_map.html',
        //     'Estonia': '/WEB/web-layout/html/map/Estonia_map.html',
        //     'Fiji': '/WEB/web-layout/html/map/Fiji_map.html',
        //     'Finland': '/WEB/web-layout/html/map/Finland_map.html',
        //     'Gabon': '/WEB/web-layout/html/map/Gabon_map.html',
        //     'Gambia': '/WEB/web-layout/html/map/Gambia_map.html',
        //     'Germany': '/WEB/web-layout/html/map/Germany_map.html',
        //     'Greece': '/WEB/web-layout/html/map/Greece_map.html',
        //     'Guatemala': '/WEB/web-layout/html/map/Guatemala_map.html',
        //     'Guinea': '/WEB/web-layout/html/map/Guinea_map.html',
        //     'Guinea-Bissau': '/WEB/web-layout/html/map/Guinea-Bissau_map.html',
        //     'Guyana': '/WEB/web-layout/html/map/Guyana_map.html',
        //     'Hong Kong SAR, China': '/WEB/web-layout/html/map/Hong_Kong_SAR,_China_map.html',
        //     'Hungary': '/WEB/web-layout/html/map/Hungary_map.html',
        //     'Iceland': '/WEB/web-layout/html/map/Iceland_map.html',
        //     'Ireland': '/WEB/web-layout/html/map/Ireland_map.html',
        //     'Italy': '/WEB/web-layout/html/map/Italy_map.html',
        //     'Jamaica': '/WEB/web-layout/html/map/Jamaica_map.html',
        //     'Japan': '/WEB/web-layout/html/map/Japan_map.html',
        //     'Jordan': '/WEB/web-layout/html/map/Jordan_map.html',
        //     'Kazakhstan': '/WEB/web-layout/html/map/Kazakhstan_map.html',
        //     'Kiribati': '/WEB/web-layout/html/map/Kiribati_map.html',
        //     'Kuwait': '/WEB/web-layout/html/map/Kuwait_map.html',
        //     'Kyrgyzstan': '/WEB/web-layout/html/map/Kyrgyzstan_map.html',
        //     'Laos': '/WEB/web-layout/html/map/Laos_map.html',
        //     'Latvia': '/WEB/web-layout/html/map/Latvia_map.html',
        //     'Lesotho': '/WEB/web-layout/html/map/Lesotho_map.html',
        //     'Liberia': '/WEB/web-layout/html/map/Liberia_map.html',
        //     'Liechtenstein': '/WEB/web-layout/html/map/Liechtenstein_map.html',
        //     'Lithuania': '/WEB/web-layout/html/map/Lithuania_map.html',
        //     'Luxembourg': '/WEB/web-layout/html/map/Luxembourg_map.html',
        //     'Macao SAR, China': '/WEB/web-layout/html/map/Macao_SAR,_China_map.html',
        //     'Madagascar': '/WEB/web-layout/html/map/Madagascar_map.html',
        //     'Malawi': '/WEB/web-layout/html/map/Malawi_map.html',
        //     'Malaysia': '/WEB/web-layout/html/map/Malaysia_map.html',
        //     'Maldives': '/WEB/web-layout/html/map/Maldives_map.html',
        //     'Malta': '/WEB/web-layout/html/map/Malta_map.html',
        //     'Marshall Islands': '/WEB/web-layout/html/map/Marshall_Islands_map.html',
        //     'Mauritius': '/WEB/web-layout/html/map/Mauritius_map.html',
        //     'Micronesia': '/WEB/web-layout/html/map/Micronesia_map.html',
        //     'Moldova': '/WEB/web-layout/html/map/Moldova_map.html',
        //     'Monaco': '/WEB/web-layout/html/map/Monaco_map.html',
        //     'Mongolia': '/WEB/web-layout/html/map/Mongolia_map.html',
        //     'Montenegro': '/WEB/web-layout/html/map/Montenegro_map.html',
        //     'Myanmar': '/WEB/web-layout/html/map/Myanmar_map.html',
        //     'Namibia': '/WEB/web-layout/html/map/Namibia_map.html',
        //     'Nauru': '/WEB/web-layout/html/map/Nauru_map.html',
        //     'Nepal': '/WEB/web-layout/html/map/Nepal_map.html',
        //     'Netherlands': '/WEB/web-layout/html/map/Netherlands_map.html',
        //     'New Zealand': '/WEB/web-layout/html/map/New Zealand_map.html',
        //     'Nicaragua': '/WEB/web-layout/html/map/Nicaragua_map.html',
        //     'North Macedonia': '/WEB/web-layout/html/map/North_Macedonia_map.html',
        //     'Norway': '/WEB/web-layout/html/map/Norway_map.html',
        //     'Oman': '/WEB/web-layout/html/map/Oman_map.html',
        //     'Palau': '/WEB/web-layout/html/map/Palau_map.html',
        //     'Panama': '/WEB/web-layout/html/map/Panama_map.html',
        //     'Paraguay': '/WEB/web-layout/html/map/Paraguay_map.html',
        //     'Poland': '/WEB/web-layout/html/map/Poland_map.html',
        //     'Portugal': '/WEB/web-layout/html/map/Portugal_map.html',
        //     'Qatar': '/WEB/web-layout/html/map/Qatar_map.html',
        //     'Republic of the Congo': '/WEB/web-layout/html/map/Republic_of_the_Congo_map.html',
        //     'Romania': '/WEB/web-layout/html/map/Romania_map.html',
        //     'Russian Federation': '/WEB/web-layout/html/map/Russian_Federation_map.html',
        //     'Rwanda': '/WEB/web-layout/html/map/Rwanda_map.html',
        //     'Samoa': '/WEB/web-layout/html/map/Samoa_map.html',
        //     'San Marino': '/WEB/web-layout/html/map/San_Marino_map.html',
        //     'Senegal': '/WEB/web-layout/html/map/Senegal_map.html',
        //     'Serbia': '/WEB/web-layout/html/map/Serbia_map.html',
        //     'Seychelles': '/WEB/web-layout/html/map/Seychelles_map.html',
        //     'Sierra Leone': '/WEB/web-layout/html/map/Sierra_Leone_map.html',
        //     'Singapore': '/WEB/web-layout/html/map/Singapore_map.html',
        //     'Slovakia': '/WEB/web-layout/html/map/Slovakia_map.html',
        //     'Slovenia': '/WEB/web-layout/html/map/Slovenia_map.html',
        //     'Solomon Islands': '/WEB/web-layout/html/map/Solomon_Islands_map.html',
        //     'South Korea': '/WEB/web-layout/html/map/South_Korea_map.html',
        //     'Sri Lanka': '/WEB/web-layout/html/map/Sri_Lanka_map.html',
        //     'St. Kitts and Nevis': '/WEB/web-layout/html/map/St._Kitts_and_Nevis_map.html',
        //     'St. Lucia': '/WEB/web-layout/html/map/St._Lucia_map.html',
        //     'St. Vincent and the Grenadines': '/WEB/web-layout/html/map/St._Vincent_and_the_Grenadines_map.html',
        //     'Suriname': '/WEB/web-layout/html/map/Suriname_map.html',
        //     'Sweden': '/WEB/web-layout/html/map/Sweden_map.html',
        //     'Switzerland': '/WEB/web-layout/html/map/Switzerland_map.html',
        //     'Tajikistan': '/WEB/web-layout/html/map/Tajikistan_map.html',
        //     'Tanzania': '/WEB/web-layout/html/map/Tanzania_map.html',
        //     'Tonga': '/WEB/web-layout/html/map/Tonga_map.html',
        //     'Trinidad and Tobago': '/WEB/web-layout/html/map/Trinidad_and_Tobago_map.html',
        //     'Turkey': '/WEB/web-layout/html/map/Turkey_map.html',
        //     'Turkmenistan': '/WEB/web-layout/html/map/Turkmenistan_map.html',
        //     'Tuvalu': '/WEB/web-layout/html/map/Tuvalu_map.html',
        //     'United Arab Emirates': '/WEB/web-layout/html/map/United_Arab_Emirates_map.html',
        //     'United Kingdom': '/WEB/web-layout/html/map/United_Kingdom_map.html',
        //     'United States': '/WEB/web-layout/html/map/United_States_map.html',
        //     'Uruguay': '/WEB/web-layout/html/map/Uruguay_map.html',
        //     'Uzbekistan': '/WEB/web-layout/html/map/Uzbekistan_map.html',
        //     'Vanuatu': '/WEB/web-layout/html/map/Vanuatu_map.html',
        //     'Vietnam': '/WEB/web-layout/html/map/Vietnam_map.html',
        //     'Yemen, Rep.': '/WEB/web-layout/html/map/Yemen,_Rep._map.html',
        //     'Zambia': '/WEB/web-layout/html/map/Zambia_map.html',
        //     'Zimbabwe': '/WEB/web-layout/html/map/Zimbabwe_map.html'
        // };
        
//         if (countryMaps[selectedCountry]) {
//             mapFrame.src = countryMaps[selectedCountry]; // 선택된 국가의 지도 파일을 iframe에 로드
//             mapContainer.style.display = 'block'; // 컨테이너를 표시
//         } else {
//             mapContainer.style.display = 'none'; // 지도 파일이 없는 경우 숨기기
//         }
//     });

//     // 금수조치 국가 리스트
//     const flaggedCountries = ['Afghanistan', 'Azerbaijan', 'Belarus', 'Central African Republic', 'Congo, Dem. Rep.', 'Eritrea', 
//         'Ethiopia', 'Haiti', 'Iran, Islamic Rep.', 'Iraq', 'Lebanon', 'Libya', 'Myanmar', 'Nigeria', 'Russian Federation', 'Serbia', 
//         'Somalia', 'South Sudan', 'Sudan', 'Syrian Arab Republic', 'Ukraine', 'Venezuela, RB', 'Yemen, Rep.', 'Zimbabwe','North Korea'
//     ];

//     // 드롭다운과 경고 박스 참조
//     const alertBox = document.getElementById('alertBox');

//     if (countrySelector && alertBox) {
//         // 경고 박스 스타일 업데이트
//         alertBox.style.backgroundColor = '#FFD1D1'; // 연한 빨강 배경색
//         alertBox.style.color = '#D9534F'; // 글씨 색상
//         alertBox.style.padding = '10px'; // 안쪽 여백
//         alertBox.style.textAlign = 'center'; // 텍스트 가운데 정렬
//         alertBox.style.fontWeight = 'bold'; // 텍스트 굵게
//         alertBox.style.border = '2px solid #D9534F'; // 테두리 추가 (글씨 색상과 동일)
//         alertBox.style.borderRadius = '5px'; // 둥근 모서리 추가

//         // 국가 선택 이벤트 리스너
//         countrySelector.addEventListener('change', () => {
//             const selectedCountry = countrySelector.value;

//             // 선택된 국가가 금수조치 국가 목록에 있는 경우 경고 표시
//             if (flaggedCountries.includes(selectedCountry)) {
//                 alertBox.style.display = 'block';

//                 // 여유 공간을 위한 요소 추가
//                 const space = document.createElement('div');
//                 space.style.height = '20px'; // 원하는 높이
//                 alertBox.parentNode.insertBefore(space, alertBox.nextSibling);
//             } else {
//                 alertBox.style.display = 'none';

//                 // 이미 추가된 여유 공간 제거
//                 const nextElement = alertBox.nextSibling;
//                 if (nextElement && nextElement.tagName === 'DIV' && nextElement.style.height === '20px') {
//                     nextElement.remove();
//                 }
//             }
//         });
//     } else {
//         console.error('국가 선택 드롭다운 또는 경고 박스를 찾을 수 없습니다.');
//     }


// });

document.addEventListener('DOMContentLoaded', () => {
    const countrySelector = document.getElementById('countrySelector'); // 국가 선택 드롭다운
    const mapContainer = document.getElementById('mapContainer'); // 지도 컨테이너
    const mapFrame = document.getElementById('mapFrame'); // iframe 요소
    const alertBox = document.getElementById('alertBox'); // 경고 박스

    // 국가별 HTML 지도 파일 매핑
    const countryMaps = {
        'Afghanistan': '/WEB/web-layout/html/map/Afghanistan_map.html',
        'Algeria': '/WEB/web-layout/html/map/Algeria_map.html',
        'Angola': '/WEB/web-layout/html/map/Angola_map.html',
        'Armenia': '/WEB/web-layout/html/map/Armenia_map.html',
        'Azerbaijan': '/WEB/web-layout/html/map/Azerbaijan_map.html',
        'Bangladesh': '/WEB/web-layout/html/map/Bangladesh_map.html',
        'Belgium': '/WEB/web-layout/html/map/Belgium_map.html',
        'Benin': '/WEB/web-layout/html/map/Benin_map.html',
        'Bolivia': '/WEB/web-layout/html/map/Bolivia_map.html',
        'Brazil': '/WEB/web-layout/html/map/Brazil_map.html',
        'Burkina Faso': '/WEB/web-layout/html/map/Burkina Faso_map.html',
        'Burundi': '/WEB/web-layout/html/map/Burundi_map.html',
        'Cameroon': '/WEB/web-layout/html/map/Cameroon_map.html',
        'Central African Republic': '/WEB/web-layout/html/map/Central African Republic_map.html',
        'Chad': '/WEB/web-layout/html/map/Chad_map.html',
        'China': '/WEB/web-layout/html/map/China_map.html',
        'Colombia': '/WEB/web-layout/html/map/Colombia_map.html',
        'Ecuador': '/WEB/web-layout/html/map/Ecuador_map.html',
        'Egypt': '/WEB/web-layout/html/map/Egypt_map.html',
        'Ethiopia': '/WEB/web-layout/html/map/Ethiopia_map.html',
        'France': '/WEB/web-layout/html/map/France_map.html',
        'Georgia': '/WEB/web-layout/html/map/Georgia_map.html',
        'Ghana': '/WEB/web-layout/html/map/Ghana_map.html',
        'Haiti': '/WEB/web-layout/html/map/Haiti_map.html',
        'Honduras': '/WEB/web-layout/html/map/Honduras_map.html',
        'India': '/WEB/web-layout/html/map/India_map.html',
        'Indonesia': '/WEB/web-layout/html/map/Indonesia_map.html',
        'Iran, Islamic Rep.': '/WEB/web-layout/html/map/Iran_map.html',
        'Iraq': '/WEB/web-layout/html/map/Iraq_map.html',
        'Israel': '/WEB/web-layout/html/map/Israel_map.html',
        'Kenya': '/WEB/web-layout/html/map/Kenya_map.html',
        'Lebanon': '/WEB/web-layout/html/map/Lebanon_map.html',
        'Libya': '/WEB/web-layout/html/map/Libya_map.html',
        'Mali': '/WEB/web-layout/html/map/Mali_map.html',
        'Mauritania': '/WEB/web-layout/html/map/Mauritania_map.html',
        'Mexico': '/WEB/web-layout/html/map/Mexico_map.html',
        'Morocco': '/WEB/web-layout/html/map/Morocco_map.html',
        'Mozambique': '/WEB/web-layout/html/map/Mozambique_map.html',
        'Myanmar': '/WEB/web-layout/html/map/Myanmar (Burma)_map.html',
        'Niger': '/WEB/web-layout/html/map/Niger_map.html',
        'Nigeria': '/WEB/web-layout/html/map/Nigeria_map.html',
        'Pakistan': '/WEB/web-layout/html/map/Pakistan_map.html',
        'Papua New Guinea': '/WEB/web-layout/html/map/Papua New Guinea_map.html',
        'Peru': '/WEB/web-layout/html/map/Peru_map.html',
        'Philippines': '/WEB/web-layout/html/map/Philippines_map.html',
        'Russian Federation': '/WEB/web-layout/html/map/Russia (Soviet Union)_map.html',
        'Saudi Arabia': '/WEB/web-layout/html/map/Saudi Arabia_map.html',
        'Somalia': '/WEB/web-layout/html/map/Somalia_map.html',
        'South Africa': '/WEB/web-layout/html/map/South Africa_map.html',
        'South Sudan': '/WEB/web-layout/html/map/South Sudan_map.html',
        'Spain': '/WEB/web-layout/html/map/Spain_map.html',
        'Sudan': '/WEB/web-layout/html/map/Sudan_map.html',
        'Syrian Arab Republic': '/WEB/web-layout/html/map/Syria_map.html',
        'Thailand': '/WEB/web-layout/html/map/Thailand_map.html',
        'Togo': '/WEB/web-layout/html/map/Togo_map.html',
        'Tunisia': '/WEB/web-layout/html/map/Tunisia_map.html',
        'Uganda': '/WEB/web-layout/html/map/Uganda_map.html',
        'Ukraine': '/WEB/web-layout/html/map/Ukraine_map.html',
        'Venezuela, RB': '/WEB/web-layout/html/map/Venezuela_map.html',
        'Yemen, Rep.': '/WEB/web-layout/html/map/Yemen (North Yemen)_map.html',
                
        'Albania': '/WEB/web-layout/html/map/Albania_map.html',
        'Andorra': '/WEB/web-layout/html/map/Andorra_map.html',
        'Antigua and Barbuda': '/WEB/web-layout/html/map/Antigua_and_Barbuda_map.html',
        'Argentina': '/WEB/web-layout/html/map/Argentina_map.html',
        'Australia': '/WEB/web-layout/html/map/Australia_map.html',
        'Austria': '/WEB/web-layout/html/map/Austria_map.html',
        'Bahamas': '/WEB/web-layout/html/map/Bahamas_map.html',
        'Bahrain': '/WEB/web-layout/html/map/Bahrain_map.html',
        'Barbados': '/WEB/web-layout/html/map/Barbados_map.html',
        'Belarus': '/WEB/web-layout/html/map/Belarus_map.html',
        'Belize': '/WEB/web-layout/html/map/Belize_map.html',
        'Bhutan': '/WEB/web-layout/html/map/Bhutan_map.html',
        'Bosnia and Herzegovina': '/WEB/web-layout/html/map/Bosnia_and_Herzegovina_map.html',
        'Botswana': '/WEB/web-layout/html/map/Botswana_map.html',
        'Brunei': '/WEB/web-layout/html/map/Brunei_map.html',
        'Bulgaria': '/WEB/web-layout/html/map/Bulgaria_map.html',
        'Cambodia': '/WEB/web-layout/html/map/Cambodia_map.html',
        'Canada': '/WEB/web-layout/html/map/Canada_map.html',
        'Chile': '/WEB/web-layout/html/map/Chile_map.html',
        'Comoros': '/WEB/web-layout/html/map/Comoros_map.html',
        'Congo, Dem. Rep.': '/WEB/web-layout/html/map/Congo,_Dem._Rep._map.html',
        'Costa Rica': '/WEB/web-layout/html/map/Costa_Rica_map.html',
        'Croatia': '/WEB/web-layout/html/map/Croatia_map.html',
        'Cuba': '/WEB/web-layout/html/map/Cuba_map.html',
        'Cyprus': '/WEB/web-layout/html/map/Cyprus_map.html',
        'Czech Republic': '/WEB/web-layout/html/map/Czech_Republic_map.html',
        "Côte d'Ivoire": "/WEB/web-layout/html/map/Côte_d'Ivoire_map.html",
        'Denmark': '/WEB/web-layout/html/map/Denmark_map.html',
        'Djibouti': '/WEB/web-layout/html/map/Djibouti_map.html',
        'Dominica': '/WEB/web-layout/html/map/Dominica_map.html',
        'Dominican Republic': '/WEB/web-layout/html/map/Dominican_Republic_map.html',
        'East Timor': '/WEB/web-layout/html/map/East_Timor_map.html',
        'El Salvador': '/WEB/web-layout/html/map/El_Salvador_map.html',
        'Equatorial Guinea': '/WEB/web-layout/html/map/Equatorial_Guinea_map.html',
        'Eritrea': '/WEB/web-layout/html/map/Eritrea_map.html',
        'Estonia': '/WEB/web-layout/html/map/Estonia_map.html',
        'Fiji': '/WEB/web-layout/html/map/Fiji_map.html',
        'Finland': '/WEB/web-layout/html/map/Finland_map.html',
        'Gabon': '/WEB/web-layout/html/map/Gabon_map.html',
        'Gambia': '/WEB/web-layout/html/map/Gambia_map.html',
        'Germany': '/WEB/web-layout/html/map/Germany_map.html',
        'Greece': '/WEB/web-layout/html/map/Greece_map.html',
        'Guatemala': '/WEB/web-layout/html/map/Guatemala_map.html',
        'Guinea': '/WEB/web-layout/html/map/Guinea_map.html',
        'Guinea-Bissau': '/WEB/web-layout/html/map/Guinea-Bissau_map.html',
        'Guyana': '/WEB/web-layout/html/map/Guyana_map.html',
        'Hong Kong SAR, China': '/WEB/web-layout/html/map/Hong_Kong_SAR,_China_map.html',
        'Hungary': '/WEB/web-layout/html/map/Hungary_map.html',
        'Iceland': '/WEB/web-layout/html/map/Iceland_map.html',
        'Ireland': '/WEB/web-layout/html/map/Ireland_map.html',
        'Italy': '/WEB/web-layout/html/map/Italy_map.html',
        'Jamaica': '/WEB/web-layout/html/map/Jamaica_map.html',
        'Japan': '/WEB/web-layout/html/map/Japan_map.html',
        'Jordan': '/WEB/web-layout/html/map/Jordan_map.html',
        'Kazakhstan': '/WEB/web-layout/html/map/Kazakhstan_map.html',
        'Kiribati': '/WEB/web-layout/html/map/Kiribati_map.html',
        'Kuwait': '/WEB/web-layout/html/map/Kuwait_map.html',
        'Kyrgyzstan': '/WEB/web-layout/html/map/Kyrgyzstan_map.html',
        'Laos': '/WEB/web-layout/html/map/Laos_map.html',
        'Latvia': '/WEB/web-layout/html/map/Latvia_map.html',
        'Lesotho': '/WEB/web-layout/html/map/Lesotho_map.html',
        'Liberia': '/WEB/web-layout/html/map/Liberia_map.html',
        'Liechtenstein': '/WEB/web-layout/html/map/Liechtenstein_map.html',
        'Lithuania': '/WEB/web-layout/html/map/Lithuania_map.html',
        'Luxembourg': '/WEB/web-layout/html/map/Luxembourg_map.html',
        'Macao SAR, China': '/WEB/web-layout/html/map/Macao_SAR,_China_map.html',
        'Madagascar': '/WEB/web-layout/html/map/Madagascar_map.html',
        'Malawi': '/WEB/web-layout/html/map/Malawi_map.html',
        'Malaysia': '/WEB/web-layout/html/map/Malaysia_map.html',
        'Maldives': '/WEB/web-layout/html/map/Maldives_map.html',
        'Malta': '/WEB/web-layout/html/map/Malta_map.html',
        'Marshall Islands': '/WEB/web-layout/html/map/Marshall_Islands_map.html',
        'Mauritius': '/WEB/web-layout/html/map/Mauritius_map.html',
        'Micronesia': '/WEB/web-layout/html/map/Micronesia_map.html',
        'Moldova': '/WEB/web-layout/html/map/Moldova_map.html',
        'Monaco': '/WEB/web-layout/html/map/Monaco_map.html',
        'Mongolia': '/WEB/web-layout/html/map/Mongolia_map.html',
        'Montenegro': '/WEB/web-layout/html/map/Montenegro_map.html',
        'Myanmar': '/WEB/web-layout/html/map/Myanmar_map.html',
        'Namibia': '/WEB/web-layout/html/map/Namibia_map.html',
        'Nauru': '/WEB/web-layout/html/map/Nauru_map.html',
        'Nepal': '/WEB/web-layout/html/map/Nepal_map.html',
        'Netherlands': '/WEB/web-layout/html/map/Netherlands_map.html',
        'New Zealand': '/WEB/web-layout/html/map/New Zealand_map.html',
        'Nicaragua': '/WEB/web-layout/html/map/Nicaragua_map.html',
        'North Macedonia': '/WEB/web-layout/html/map/North_Macedonia_map.html',
        'Norway': '/WEB/web-layout/html/map/Norway_map.html',
        'Oman': '/WEB/web-layout/html/map/Oman_map.html',
        'Palau': '/WEB/web-layout/html/map/Palau_map.html',
        'Panama': '/WEB/web-layout/html/map/Panama_map.html',
        'Paraguay': '/WEB/web-layout/html/map/Paraguay_map.html',
        'Poland': '/WEB/web-layout/html/map/Poland_map.html',
        'Portugal': '/WEB/web-layout/html/map/Portugal_map.html',
        'Qatar': '/WEB/web-layout/html/map/Qatar_map.html',
        'Republic of the Congo': '/WEB/web-layout/html/map/Republic_of_the_Congo_map.html',
        'Romania': '/WEB/web-layout/html/map/Romania_map.html',
        'Russian Federation': '/WEB/web-layout/html/map/Russian_Federation_map.html',
        'Rwanda': '/WEB/web-layout/html/map/Rwanda_map.html',
        'Samoa': '/WEB/web-layout/html/map/Samoa_map.html',
        'San Marino': '/WEB/web-layout/html/map/San_Marino_map.html',
        'Senegal': '/WEB/web-layout/html/map/Senegal_map.html',
        'Serbia': '/WEB/web-layout/html/map/Serbia_map.html',
        'Seychelles': '/WEB/web-layout/html/map/Seychelles_map.html',
        'Sierra Leone': '/WEB/web-layout/html/map/Sierra_Leone_map.html',
        'Singapore': '/WEB/web-layout/html/map/Singapore_map.html',
        'Slovakia': '/WEB/web-layout/html/map/Slovakia_map.html',
        'Slovenia': '/WEB/web-layout/html/map/Slovenia_map.html',
        'Solomon Islands': '/WEB/web-layout/html/map/Solomon_Islands_map.html',
        'South Korea': '/WEB/web-layout/html/map/South_Korea_map.html',
        'Sri Lanka': '/WEB/web-layout/html/map/Sri_Lanka_map.html',
        'St. Kitts and Nevis': '/WEB/web-layout/html/map/St._Kitts_and_Nevis_map.html',
        'St. Lucia': '/WEB/web-layout/html/map/St._Lucia_map.html',
        'St. Vincent and the Grenadines': '/WEB/web-layout/html/map/St._Vincent_and_the_Grenadines_map.html',
        'Suriname': '/WEB/web-layout/html/map/Suriname_map.html',
        'Sweden': '/WEB/web-layout/html/map/Sweden_map.html',
        'Switzerland': '/WEB/web-layout/html/map/Switzerland_map.html',
        'Tajikistan': '/WEB/web-layout/html/map/Tajikistan_map.html',
        'Tanzania': '/WEB/web-layout/html/map/Tanzania_map.html',
        'Tonga': '/WEB/web-layout/html/map/Tonga_map.html',
        'Trinidad and Tobago': '/WEB/web-layout/html/map/Trinidad_and_Tobago_map.html',
        'Turkey': '/WEB/web-layout/html/map/Turkey_map.html',
        'Turkmenistan': '/WEB/web-layout/html/map/Turkmenistan_map.html',
        'Tuvalu': '/WEB/web-layout/html/map/Tuvalu_map.html',
        'United Arab Emirates': '/WEB/web-layout/html/map/United_Arab_Emirates_map.html',
        'United Kingdom': '/WEB/web-layout/html/map/United_Kingdom_map.html',
        'United States': '/WEB/web-layout/html/map/United_States_map.html',
        'Uruguay': '/WEB/web-layout/html/map/Uruguay_map.html',
        'Uzbekistan': '/WEB/web-layout/html/map/Uzbekistan_map.html',
        'Vanuatu': '/WEB/web-layout/html/map/Vanuatu_map.html',
        'Vietnam': '/WEB/web-layout/html/map/Vietnam_map.html',
        'Yemen, Rep.': '/WEB/web-layout/html/map/Yemen,_Rep._map.html',
        'Zambia': '/WEB/web-layout/html/map/Zambia_map.html',
        'Zimbabwe': '/WEB/web-layout/html/map/Zimbabwe_map.html'
    };

    // 금수조치 국가 리스트
    const flaggedCountries = [
        'Afghanistan', 'Azerbaijan', 'Belarus', 'Central African Republic', 'Congo, Dem. Rep.',
        'Eritrea', 'Ethiopia', 'Haiti', 'Iran, Islamic Rep.', 'Iraq', 'Lebanon', 'Libya',
        'Myanmar', 'Nigeria', 'Russian Federation', 'Serbia', 'Somalia', 'South Sudan', 'Sudan',
        'Syrian Arab Republic', 'Ukraine', 'Venezuela, RB', 'Yemen, Rep.', 'Zimbabwe', 'North Korea'
    ];

    // 지도 및 경고 박스 업데이트 함수
    function updateMap(selectedCountry) {
        if (countryMaps[selectedCountry]) {
            mapFrame.src = countryMaps[selectedCountry]; // 지도 업데이트
            mapContainer.style.display = 'block';
        } else {
            mapContainer.style.display = 'none';
        }

        // 경고 박스 스타일 업데이트 및 표시 처리
        if (alertBox) {
            // 경고 박스 디자인 설정
            alertBox.style.backgroundColor = '#FFD1D1'; // 연한 빨강 배경색
            alertBox.style.color = '#D9534F'; // 글씨 색상
            alertBox.style.padding = '10px'; // 안쪽 여백
            alertBox.style.textAlign = 'center'; // 텍스트 가운데 정렬
            alertBox.style.fontWeight = 'bold'; // 텍스트 굵게
            alertBox.style.border = '2px solid #D9534F'; // 테두리 추가
            alertBox.style.borderRadius = '5px'; // 둥근 모서리

            // 금수조치 국가 표시 로직
            if (flaggedCountries.includes(selectedCountry)) {
                alertBox.style.display = 'block';

                // 여유 공간 추가
                const space = document.createElement('div');
                space.style.height = '20px'; // 여유 공간 높이
                alertBox.parentNode.insertBefore(space, alertBox.nextSibling);
            } else {
                alertBox.style.display = 'none';

                // 여유 공간 제거
                const nextElement = alertBox.nextSibling;
                if (nextElement && nextElement.tagName === 'DIV' && nextElement.style.height === '20px') {
                    nextElement.remove();
                }
            }
        }
    }

    // countryChange 이벤트 리스너 추가
    document.addEventListener('countryChange', (event) => {
        const selectedCountry = event.detail;
        if (selectedCountry) {
            updateMap(selectedCountry);
        }
    });

    // 드롭다운 변경 이벤트 리스너
    countrySelector.addEventListener('change', () => {
        const selectedCountry = countrySelector.value;
        history.pushState({}, '', `?country=${selectedCountry}`); // URL 갱신
        updateMap(selectedCountry);
    });

    // 초기 URL 파라미터 처리
    const params = new URLSearchParams(window.location.search);
    const countryFromUrl = params.get('country');
    if (countryFromUrl) {
        updateMap(countryFromUrl);
        countrySelector.value = countryFromUrl;
    }
});

