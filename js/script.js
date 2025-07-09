document.addEventListener('DOMContentLoaded', function () {

    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- Active Navigation Link ---
    // This script highlights the current page's link in the navigation bar.
    const navLinks = document.querySelectorAll('a.nav-link');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        
        // Remove active styles from all links first
        link.classList.remove('text-primary', 'font-semibold');
        link.classList.add('text-neutral-600');

        // Add active style to the current page link
        if (linkPath === currentPath) {
            link.classList.add('text-primary', 'font-semibold');
            link.classList.remove('text-neutral-600');
        }
    });

    // --- Cookie Banner ---
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookiesButton = document.getElementById('accept-cookies');

    // Check if the user has already accepted cookies
    if (!localStorage.getItem('cookiesAccepted')) {
        if (cookieBanner) {
            // Use setTimeout to delay the banner appearance slightly
            setTimeout(() => {
                cookieBanner.classList.remove('hidden');
                cookieBanner.classList.add('flex');
            }, 1500);
        }
    }

    if (acceptCookiesButton && cookieBanner) {
        acceptCookiesButton.addEventListener('click', () => {
            // Hide the banner and save the preference
            cookieBanner.style.display = 'none';
            localStorage.setItem('cookiesAccepted', 'true');
        });
    }

});
