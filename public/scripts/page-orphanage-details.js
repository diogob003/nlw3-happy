/***************************************
    leaflet MAP
****************************************/
// get data from document
const latitude = document.querySelector('#mapid ~ span').dataset.latitude
const longitude = document.querySelector('#mapid ~ span').dataset.longitude

// Map options
const options = {
    dragging: false,
    touchZoom: false,
    doubleClickZoom: false,
    scrollWheelZoom: false,
    zoomControl: false
}

// Create map
const map = L.map('mapid', options).setView([latitude,longitude], 17); //setView([latitude, longitude], zoom)

// Create and add OpenStreetMap tileLayer
L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
        attribution: '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap&nbsp;</a>'
    }
).addTo(map);

// Create icon for map marker
const icon = L.icon({
    iconUrl: "/img/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29, 68]
});

// Create and add map marker | [latitude longitude]
L.marker([latitude, longitude], {icon})
.addTo(map)

/* Image Gallery */

/* Método professor
function selectImage(event){
    // Escolhe o disparador do evento
    const button = event.currentTarget

    // Remover todas as class .active
    const buttons = document.querySelectorAll('.images button')
    buttons.forEach(removeActiveClass)

    function removeActiveClass(button){
        button.classList.remove("active")
    }

    // Selecionar a imagem clicada
    const image = button.children[0]
    const imageContainer = document.querySelector(".orphanage-details > img")

    // Atualizar o container de imagem
    imageContainer.src = image.src

    // Adicionar class .active para o botão
    button.classList.add("active")


}*/
/* Meu método */
function selectImage(event){
    buttonElement = event.currentTarget
    // Pega quantidede de filhos do elemento pai
    let numberOfButtons = buttonElement.parentElement.childElementCount

    // Remover todas as class .active
    for (let i = 0; i < numberOfButtons; i++) {
        document.querySelectorAll(".images button")[i].classList.remove("active")
    }

    // Selecionar a imagem clicada
    let imageTarget = buttonElement.firstElementChild

    // Atualizar o container de imagem
    document.querySelector(".orphanage-details").firstElementChild.src = imageTarget.src

    // Adicionar class .active para o botão
    buttonElement.className += "active"
}

// Happy logo action
window.document.querySelector('#logo-header').addEventListener('click', () => {
    window.document.location.href = '/orphanages-map'
})
