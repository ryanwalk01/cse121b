/* LESSON 3 - Programming Tasks */

/* Profile Object  */
let myProfile = {
    name: "Ryan Walker",
    photo: '../images/ryan.jpg',
    favoriteFoods: ['Pizza', 'Shepherd\'s Pie', 'Popcorn'],
    hobbies: ['computers', 'walking', 'video games'],
    placesLived: []
};

/* Populate Profile Object with placesLive objects */
myProfile.placesLived.push(
    {place: 'Parkersburg, West Virginia', length: '18 years'},
    {place: 'Provo, Utah', length: '2 years'},
    {place: 'Portland, Oregon', length: '5 months'},
    {place: 'Rexburg, Idaho', length: '2 years'}
);


/* DOM Manipulation - Output */
/* Name */
document.querySelector('#name').textContent = myProfile.name;

/* Photo with attributes */
document.querySelector('#photo').src = myProfile.photo;

/* Favorite Foods List*/
myProfile.favoriteFoods.forEach(food => {
    let li = document.createElement('li');
    li.textContent = food;
    document.querySelector('#favorite-foods').appendChild(li);
})

/* Hobbies List */
myProfile.hobbies.forEach(hobby => {
    let li = document.createElement('li');
    li.textContent = hobby;
    document.querySelector('#hobbies').appendChild(li);
})

/* Places Lived DataList */
myProfile.placesLived.forEach(item => {
    let dt = document.createElement('dt');
    let dd = document.createElement('dd');
    dt.textContent = item.place;
    dd.textContent = item.length;
    document.querySelector('#places-lived').append(dt);
    document.querySelector('#places-lived').append(dd);
})

