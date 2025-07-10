document.addEventListener('DOMContentLoaded', function () {

    // --- Mobile Menu Elements ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const body = document.body;
    const menuOpenIcon = document.getElementById('menu-open-icon');
    const menuCloseIcon = document.getElementById('menu-close-icon');

    /**
     * Toggles the mobile menu open or closed.
     * It handles the slide and fade animations, overlay visibility,
     * body scroll lock, and icon switching.
     */
    const toggleMenu = () => {
        if (!mobileMenu || !mobileMenuOverlay || !mobileMenuButton) return;

        const isMenuOpen = !mobileMenu.classList.contains('translate-x-full');

        if (isMenuOpen) {
            // --- CLOSE MENU ---
            // Add classes to animate menu out
            mobileMenu.classList.add('translate-x-full', 'opacity-0');
            // Animate overlay out
            mobileMenuOverlay.classList.add('opacity-0');
            // Re-enable body scrolling
            body.classList.remove('overflow-hidden');
            // Hide overlay after transition is complete
            setTimeout(() => {
                mobileMenuOverlay.classList.add('hidden');
            }, 300); // This duration should match the transition duration in the HTML
        } else {
            // --- OPEN MENU ---
            // Make overlay visible
            mobileMenuOverlay.classList.remove('hidden');
            // A tiny delay to allow the `display` property to change before starting the transition.
            // This prevents the animation from skipping.
            requestAnimationFrame(() => {
                // Add classes to animate menu in
                mobileMenu.classList.remove('translate-x-full', 'opacity-0');
                // Animate overlay in
                mobileMenuOverlay.classList.remove('opacity-0');
                // Disable body scrolling
                body.classList.add('overflow-hidden');
            });
        }

        // Toggle the hamburger/close icons
        if (menuOpenIcon && menuCloseIcon) {
            menuOpenIcon.classList.toggle('hidden');
            menuCloseIcon.classList.toggle('hidden');
        }
    };

    // --- Event Listeners ---
    // Toggle menu when the button is clicked
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', toggleMenu);
    }
    // Close menu when the overlay is clicked
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', toggleMenu);
    }
    // Close menu when a link inside it is clicked
    if (mobileMenu) {
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                // Ensure menu is open before trying to close
                if (!mobileMenu.classList.contains('translate-x-full')) {
                    toggleMenu();
                }
            });
        });
    }

    // --- Active Navigation Link ---
    // This script highlights the current page's link in both desktop and mobile navigation.
    const navLinks = document.querySelectorAll('a.nav-link');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (!linkHref) return;
        // Get the base path of the link, ignoring any hashes
        const linkPath = linkHref.split('/').pop().split('#')[0];
        
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
