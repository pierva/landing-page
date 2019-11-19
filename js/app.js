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
    init: function() {
        this.initNavBar('#navbar__list');
        this.mainContentScrollHandlers(100);
        this.scrollMeUp();
    },

    // build the navbar
    initNavBar: (navElement) => {
        const nav = document.querySelector(navElement);
        const sections = document.querySelectorAll('section');
        for (let section of sections) {
            const navLink = document.createElement('li');
            navLink.innerHTML = 
                `<a href="#${section.id}" class="menu__link">
                    ${section.dataset.nav}
                </a>`
            nav.appendChild(navLink);
            firstSection = false;
        }
        
    },

    mainContentScrollHandlers: function (buffer) {
        const nav = document.getElementsByClassName('page__header')[0];
        let prevPosition = window.scrollY;
        let firstScroll = true;
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
                    console.log('here')
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
        }
    },
    
    scrollMeUp: function () {
        const scroller = document.getElementById('scrollMeUp');
        scroller.addEventListener('click', function (event) {
            const animatedScrolling = function () {
                const c = window.scrollY;
                if (c > 0) {
                    window.requestAnimationFrame(animatedScrolling);
                    window.scrollTo(0, c - c / 8);
                }
            }
            window.requestAnimationFrame(animatedScrolling);
        });
    },
}


// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End view
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active


/**
 * Iinit the main function 
*/
octopus.init();