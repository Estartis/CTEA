//load JSON
var file = "/public/json/data.json";
var galaxy;
const marketButton = document.getElementById('market_but')
const crossingButton = document.getElementById('crosing_but')
const ratingButton = document.getElementById('rating_but')
function onDrop(event) {
    const id = event
      .dataTransfer
      .getData('text');
    const draggableElement = document.getElementById(id);
    const dropzone = event.target;
    
    dropzone.appendChild(draggableElement);
   
    event
      .dataTransfer
      .clearData();
}
function onDragOver(event) {
    event.preventDefault();
}
function onDragStart(event) {
    event
      .dataTransfer
      .setData('text/plain', event.target.id);
}


function changeGalaxy() {
    //Получаем индекс выбранного элемента
    var valueGalaxy = document.getElementById("ListGalaxy").options.selectedIndex;
    var val = document.getElementById("ListGalaxy").options[valueGalaxy].value;
    var blockBackground = document.getElementById('GameBlock');

    if (val == "1") {
        blockBackground.style.backgroundImage = "url('/public/image/galaxy1.jpg')";
        //jQuery('.card_planet').remove()
        //card();
    } else if (val == "2") {
        blockBackground.style.backgroundImage = "url('/public/image/galaxy2.jpg')";
        //jQuery('.card_planet').remove()
        //n = 3
        //for (var i = 0; i < n; i++) {
          //  jQuery('#cardPlanet').append('<div class="card_planet"></div>');
        //}
    } else if (val == "3") {
        blockBackground.style.backgroundImage = "url('/public/image/galaxy3.jpg')";
    } else if (val == "4") {
        blockBackground.style.backgroundImage = "url('/public/image/galaxy4.jpg')";
    }
};

function card() {
    var n = 5;
    for (var i = 0; i < n; i++) {
        jQuery('#cardPlanet').append('<div class="card_planet"></div>');
    }
}
marketButton.addEventListener('click', () => {
    location.href = "/market"
})

crossingButton.addEventListener('click', () => {
    location.href = "/cross"
})

ratingButton.addEventListener('click', () => {
    location.href = "/rating"
})



