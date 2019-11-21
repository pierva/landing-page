/**
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Model start
 * model holds all the data associated with the page 
*/
let model = {
    NAVBARHEIGHT: '55px'
}

/**
 * End model
*/


/**
 * Octopus start
 * Octopus is the link between the model and the view 
*/

const octopus = {
    init: () => {
        view.init();
    },

    getNavbarHeight: () => model.NAVBARHEIGHT,
}
/**
 * End octopus
*/


/**
 * View start
 * View is responsible of manipulating the DOM and will access the data
 * stored in the model through the octopus 
*/

const view = {
    // start main function
    init: function () {
        this.initNavBar('#navbar__list');
        this.mainContentScrollHandlers(100);
        this.scrollMeUp();
        this.toggleActiveState();
    },

    // Helper function to check if element is in the viewport
    isOnScreen: (element, buffer) => {
        buffer = typeof buffer === 'undefined' ? 0 : buffer;
        // Get element's position in the viewport
        const bounding = element.getBoundingClientRect();

        // Check if element is in the viewport 
        if (bounding.top >= buffer && bounding.left >= buffer &&
            bounding.right <=
            // fallback for browser compatibility 
            ((window.innerWidth || document.documentElement.clientWidth) - buffer) &&
            bounding.bottom <=
            ((window.innerHeight || document.documentElement.clientHeight) - buffer)) {
            return true
        } else {
            return false;
        }
    },

    // build the navbar
    initNavBar: (navElement) => {
        const nav = document.querySelector(navElement);
        const sections = document.querySelectorAll('section');
        let firstLink = true;
        for (let section of sections) {
            const navLink = document.createElement('li');
            navLink.innerHTML =
                `<a href="#${section.id}" class="menu__link ${firstLink ? "link__active" : ""}" data-link="${section.dataset.nav}">
                    ${section.dataset.nav}
                </a>`
            nav.appendChild(navLink);
            firstLink = false;
        }

    },

    mainContentScrollHandlers: (buffer) => {
        const nav = document.getElementsByClassName('page__header')[0];
        let prevPosition = window.scrollY;
        let firstScroll = true;
        const sections = document.getElementsByTagName('section');
        const activeEvent = new Event('active');
        window.onscroll = function () {
            const currPosition = window.scrollY;

            // Show button to scroll page to top
            const scroller = document.getElementById('scrollMeUp');
            if (currPosition > buffer || currPosition > 100) {
                scroller.classList.remove('display__none');
            }
            else {
                scroller.classList.add('display__none');
            }

            // Hide and show the navbar
            if (firstScroll) {
                if (currPosition - prevPosition > 50) {
                    nav.style.top = '-' + octopus.getNavbarHeight();
                    prevPosition = currPosition;
                    firstScroll = false;
                } else if (prevPosition - currPosition > 50) {
                    prevPosition = currPosition;
                }
            } else {
                if (prevPosition < currPosition) {
                    prevPosition = currPosition;
                } else {
                    if (prevPosition - currPosition > 50) {
                        nav.style.top = '0';
                        firstScroll = true;
                        prevPosition = currPosition;
                    }
                }
            }
            // Dispatch event to all the sections in order to 
            // show the active state
            setTimeout(function () {
                for (let section of sections) {
                    section.dispatchEvent(activeEvent);
                }
            });
        }
    },

    scrollMeUp: () => {
        const scroller = document.getElementById('scrollMeUp');
        scroller.addEventListener('click', (event) => {
            const animatedScrolling = () => {
                const c = window.scrollY;
                if (c > 0) {
                    window.requestAnimationFrame(animatedScrolling);
                    window.scrollTo(0, c - c / 8);
                }
            }
            window.requestAnimationFrame(animatedScrolling);
        });
    },

    // Add event listeners to the sections that listen for active 
    // event. This event is triggered during window scroll.
    toggleActiveState: () => {
        const sections = document.getElementsByTagName('section');
        for (let section of sections) {
            section.addEventListener('active', function () {
                const isOnScreen = view.isOnScreen(this, -300);
                const navLink = document.querySelectorAll(`[data-link="${this.dataset.nav}"]`)[0];
                if (isOnScreen) {
                    this.classList.add('active');
                    navLink.classList.add('link__active');
                } else {
                    this.classList.remove('active');
                    navLink.classList.remove('link__active');
                }
            })
        }
    }

}

/**
 * Init the application
*/
octopus.init();
