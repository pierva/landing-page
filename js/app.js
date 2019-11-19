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
let model = {}

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
    }
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
    },

    // build the navbar
    initNavBar: (navElement) => {
        const nav = document.querySelector(navElement);
        const sections = document.querySelectorAll('section');
        for (let section of sections) {
            const navLink = document.createElement('li');
            navLink.innerHTML = 
                `<a href="#${section.id}" class="menu__link>
                    ${section.dataset.nav}
                </a>`
            nav.appendChild(navLink);
            firstSection = false;
        }
        
    }
}
// build the nav


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