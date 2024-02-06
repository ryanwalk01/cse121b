/* W05: Programming Tasks */

/* Declare and initialize global variables */
const templesElement = document.querySelector('#temples');
let templeList = [];
/* async displayTemples Function */
const displayTemples = (temples) => {
    
    temples.forEach((temple) => {
        const article = document.createElement('article');
        const nameElement = document.createElement('h3');
        nameElement.textContent = temple.templeName;
        const imageElement = document.createElement('img');
        imageElement.setAttribute('src', temple.imageUrl);
        imageElement.setAttribute('alt', temple.location);
        article.appendChild(nameElement);
        article.appendChild(imageElement);
        templesElement.appendChild(article);
    });
};


/* async getTemples Function using fetch()*/
const getTemples = async () => {
    const response = await fetch('https://byui-cse.github.io/cse121b-ww-course/resources/temples.json');
    if (response.ok) {
    const data = await response.json();
    templeList = data;
    }
    displayTemples(templeList);
}

/* reset Function */
function reset() {
    document.querySelector('#temples').innerHTML = '';
} 

/* filterTemples Function */
function filterTemples(temples) {
    reset();
    let filter = document.querySelector('#filtered').value;
    switch(filter) {
        case 'utah':
            displayTemples(temples.filter(temple => temple.location.includes('Utah')));
            break;
        case 'notutah':
            displayTemples(temples.filter(temple => !temple.location.includes('Utah')));
            break;
        case 'older':
            displayTemples(temples.filter(temple => new Date(temple.dedicated) < new Date(1950, 0, 1)));
            break;
        case 'all':
            displayTemples(temples);
            break;
    }
}
getTemples();

/* Event Listener */
document.querySelector('#filtered').addEventListener('change', () => { filterTemples(templeList)});