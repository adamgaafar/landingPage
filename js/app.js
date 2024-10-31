/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/

//Getting elements
const sections = Array.from(document.querySelectorAll("section"));
const navbar = document.querySelector('#navbar__list');
const fragment = document.createDocumentFragment();
let scrollTimeout;
//scroll to top btn
let scrollToTopBtn = document.querySelector('#scrollToTopBtn');
scrollToTopBtn.id = "scrollToTopBtn";
scrollToTopBtn.textContent = "Scroll to Top";
scrollToTopBtn.style.display = 'none';

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

//function for checking if section is being viewed or not
let isSectionViewed = (section) => {
    const rect = section.getBoundingClientRect();
    return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
};

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

function createNavItems() {
    sections.forEach(section => {
        const sectionName = section.getAttribute("data-nav");
        const sectionLink = section.getAttribute("id");
        //creating an element for each section
        const listItem = document.createElement("li");
        listItem.innerHTML = `<a class='menu__link' href='#${sectionLink}'>${sectionName}</a>`;
        // scroll smooth behavior
        listItem.querySelector('a').addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById(sectionLink).scrollIntoView({
                behavior: 'smooth'
            });
        })

        fragment.appendChild(listItem);
    })
    navbar.appendChild(fragment);
}
//function to toggle classes for active section
function toggleActive() {
    let foundActiveSection = false; // Track if we found an active section

    sections.forEach(section => {
        const sectionId = section.getAttribute("id");
        const navLink = document.querySelector(`a[href='#${sectionId}']`);

        // Check if the section is in the viewport
        if (isSectionViewed(section) && !foundActiveSection) {
            section.classList.add("your-active-class");
            navLink.classList.add("active-class"); // Add active class to nav link
            foundActiveSection = true; //active section
        } else {
            section.classList.remove("your-active-class");
            navLink.classList.remove("active-class"); // Remove active class
        }
    });
}


function hideNavBarOnScroll() {
    //show navbar
    navbar.style.display = "flex";
    if (scrollTimeout) clearTimeout(scrollTimeout)

    scrollTimeout = setTimeout(() => {
        navbar.style.display = 'none';
    },1000);
}

function toggleBtnVisbility() {
    if (window.scrollY > window.innerHeight)
        scrollToTopBtn.style.display = "block";
    else
        scrollToTopBtn.style.display = "none";
}

function toggleColapse(ev){
    if (ev.target.textContent === "Collapse")
        ev.target.textContent = "Expand";
    else
        ev.target.textContent = "Collapse";

    const sec = ev.target.parentElement;
    sec.classList.toggle("collapsed");

}
function secCollapseButtons(){
    sections.forEach(section => {
        const btn = document.createElement("button");
        btn.textContent = "Collapse";
        btn.classList.add("toggle-btn");
        btn.classList.add("btn");

        btn.addEventListener('click',toggleColapse);

        section.insertBefore(btn, section.firstChild);
    });
}
/**
 * End Main Functions
 * Begin Events
 *
 */

// build the nav
createNavItems();
//scroll to top btn is clicked
scrollToTopBtn.addEventListener('click', ()=>{
    window.scrollTo({
        behavior: 'smooth',
        top: 0
    });
})
// Add class 'active' to section when near top of viewport
document.addEventListener('scroll', toggleActive);
//hide navbar on inactive scroll
document.addEventListener('scroll', hideNavBarOnScroll);
//show scroll to top
document.addEventListener('scroll', toggleBtnVisbility);

secCollapseButtons();



