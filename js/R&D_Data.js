// Define the path to the JSON file containing R&D data
const RND_DATA_PATH = '/WEB/web-layout/data/analysis_3/R&D_Data.json';

// Initialize an empty array to hold R&D data
let RND_Data = [];

/**
 * Function to load R&D data from the specified JSON file
 */
async function loadRNDData() {
    try {
        // Fetch the JSON data from the specified path
        const response = await fetch(RND_DATA_PATH);
        if (!response.ok) {
            throw new Error(`Failed to fetch R&D data. Status: ${response.status}`);
        }

        // Parse the JSON data and store it in the global RND_Data array
        RND_Data = await response.json();
        console.log("R&D Data loaded successfully:", RND_Data);
    } catch (error) {
        console.error("Error loading R&D Data:", error);
        alert("R&D 데이터를 로드하는 중 문제가 발생했습니다.");
    }
}

/**
 * Function to display R&D data for the selected country
 * @param {string} countryName - The name of the selected country
 * @param {HTMLElement} rndTableContainer - The container to display R&D data
 */
function displayRNDData(countryName, rndTableContainer) {
    if (!RND_Data || RND_Data.length === 0) {
        console.error("R&D 데이터가 로드되지 않았거나 비어 있습니다.");
        return;
    }

    // Find the R&D data for the selected country
    const countryRND = RND_Data.find(data => data.Country === countryName);

    // Render the R&D data if found
    if (countryRND) {
        rndTableContainer.innerHTML = `
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>항목</th>
                        <th>정보</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="font-weight: bold;">
                        <td>프로젝트 이름</td>
                        <td>${countryRND.Project_Name || "데이터 없음"}</td>
                    </tr>
                    <tr>
                        <td>프로그램 이름</td>
                        <td>${countryRND.Program_Name || "데이터 없음"}</td>
                    </tr>
                    <tr>
                        <td>목적</td>
                        <td>${countryRND.Objective || "데이터 없음"}</td>
                    </tr>
                    <tr>
                        <td>특징</td>
                        <td>${countryRND.Features || "데이터 없음"}</td>
                    </tr>
                </tbody>
            </table>
        `;
    } else {
        rndTableContainer.innerHTML = `
            <div class="alert alert-danger" role="alert">
                해당 국가의 R&D 데이터를 찾을 수 없습니다.
            </div>
        `;
    }
}

/**
 * Function to initialize the R&D Data functionality on page load
 */
function initializeRNDData() {
    const countrySelector = document.getElementById("countrySelector");
    const rndTableContainer = document.getElementById("rndDataTable");

    if (!countrySelector || !rndTableContainer) {
        console.error("countrySelector 또는 rndDataTable 요소를 찾을 수 없습니다.");
        return;
    }

    // Add an event listener to the country dropdown
    countrySelector.addEventListener("change", () => {
        const selectedCountry = countrySelector.value;
        displayRNDData(selectedCountry, rndTableContainer);
    });
}

// Load R&D data and initialize functionality when the DOM is ready
document.addEventListener("DOMContentLoaded", async () => {
    await loadRNDData(); // Load the JSON data
    initializeRNDData(); // Initialize the functionality
});
