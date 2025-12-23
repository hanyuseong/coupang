document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const gnb = document.querySelector('.gnb');
    const viewMoreButton = document.querySelector('.view-more-menu');
    const menuItems = document.querySelectorAll('.menu-items .menu-item');

    // Hamburger menu toggle
    if (hamburgerMenu && gnb) {
        hamburgerMenu.addEventListener('click', () => {
            gnb.classList.toggle('active');
            hamburgerMenu.classList.toggle('active');
        });
    }

    // View More Menu (example: show all items, in a real app this might load more dynamically)
    const initialVisibleItems = 6; // Adjust as needed
    if (menuItems.length > initialVisibleItems) {
        for (let i = initialVisibleItems; i < menuItems.length; i++) {
            menuItems[i].style.display = 'none';
        }
        if (viewMoreButton) {
            viewMoreButton.style.display = 'block'; // Show button if there are more items
            viewMoreButton.addEventListener('click', () => {
                for (let i = initialVisibleItems; i < menuItems.length; i++) {
                    menuItems[i].style.display = 'block';
                }
                viewMoreButton.style.display = 'none'; // Hide button after showing all
            });
        }
    } else {
        if (viewMoreButton) {
            viewMoreButton.style.display = 'none'; // Hide button if no more items
        }
    }

    // Scroll to Top Button (example implementation)
    const scrollToTopButton = document.createElement('button');
    scrollToTopButton.classList.add('scroll-to-top');
    scrollToTopButton.innerHTML = '&#x2191;'; // Up arrow
    document.body.appendChild(scrollToTopButton);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) { // Show button after scrolling down 200px
            scrollToTopButton.style.display = 'block';
        } else {
            scrollToTopButton.style.display = 'none';
        }
    });

    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

