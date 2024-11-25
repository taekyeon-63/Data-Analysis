/*!
 * Start Bootstrap - SB Admin v7.0.7 (https://startbootstrap.com/template/sb-admin)
 */

window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

    // Dropdown menu toggle for RESEARCH
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownBar = document.querySelector('.dropdown-bar');

    if (dropdownToggle && dropdownBar) {
        dropdownToggle.addEventListener('click', event => {
            event.preventDefault();

            // Toggle dropdown bar height for sliding effect
            if (dropdownBar.classList.contains('open')) {
                dropdownBar.style.height = '0'; // Close dropdown
                dropdownBar.classList.remove('open');
                dropdownToggle.classList.remove('dropdown-open'); // Reset triangle rotation
            } else {
                dropdownBar.style.height = '200px'; // Open dropdown (adjust height as needed)
                dropdownBar.classList.add('open');
                dropdownToggle.classList.add('dropdown-open'); // Rotate triangle
            }
        });
    }

    // Search bar toggle functionality
    const searchContainer = document.querySelector('.search-container');
    const searchIcon = document.querySelector('.search-icon');

    if (searchContainer && searchIcon) {
        searchIcon.addEventListener('click', event => {
            event.preventDefault();
            searchContainer.classList.toggle('active'); // Toggle active class
        });

        // Optional: Close search bar when clicking outside
        document.addEventListener('click', event => {
            if (!searchContainer.contains(event.target) && !searchIcon.contains(event.target)) {
                searchContainer.classList.remove('active');
            }
        });
    }
});
